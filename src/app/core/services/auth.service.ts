import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { IRequest, RequestStatus } from 'ngxs-requests-plugin';

import { User } from '../../shared/interfaces/models/user.interface';
import { GetUserByTokenRequestState, LogInUserRequestState, LogOutUserRequestState, SignUpUserRequestState } from '../ngxs/auth/auth.state';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { GetUserByToken, LogInUser, LogOutUser, ResetAuthState, SignUpUser } from '../ngxs/auth/auth.actions';
import { ResetNotesState } from '../ngxs/notes/notes.actions';
import { ResetTopicsState } from '../ngxs/topics/topics.actions';
import { ResetUsersState } from '../ngxs/users/users.actions';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Select(SignUpUserRequestState)
  signUpUserRequestState$: Observable<IRequest<User>>;

  @Select(AuthGetterState.currentUser)
  currentUser$: Observable<User>;

  @Select(LogInUserRequestState)
  logInUserRequestState$: Observable<IRequest<User>>;

  @Select(GetUserByTokenRequestState)
  getUserByTokenRequestState$: Observable<IRequest<User>>;

  @Select(LogOutUserRequestState)
  logOutUserRequestState$: Observable<IRequest>;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.getUserByToken();
  }

  signUpUser(user: Partial<User>) {
    this.store.dispatch(new SignUpUser(user));
    return this.signUpUserRequestState$.pipe(
      filter(res => res.loaded && !res.loading)
    );
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
    return this.logInUserRequestState$.pipe(
      filter(res => res.loaded && !res.loading)
    );
  }

  logOutUser() {
    this.store.dispatch(new LogOutUser()).pipe(
      filter(res => {
        const request = res?.requests.logOutUser;
        return request.loaded && !request.loading && (request.status === RequestStatus.Success);
      })
    ).subscribe(() => {
      this.localStorageService.removeItem('authToken');
      this.router.navigate(['/login']);
      this.store.dispatch([
        new ResetNotesState(),
        new ResetTopicsState(),
        new ResetUsersState(),
        new ResetAuthState()
      ]);
    });
  }

  getUserByToken() {
    const token = this.localStorageService.getItem('authToken');
    this.store.dispatch(new GetUserByToken(token));
    return this.getUserByTokenRequestState$;
  }
}
