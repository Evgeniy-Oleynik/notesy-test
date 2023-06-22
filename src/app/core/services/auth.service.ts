import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, Subject, withLatestFrom } from 'rxjs';
import { IRequest, RequestStatus } from 'ngxs-requests-plugin';

import { GetUserByTokenRequestState, LogInUserRequestState, LogOutUserRequestState, SignUpUserRequestState } from '../ngxs/auth/auth.state';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { GetUserByToken, LogInUser, LogOutUser, ResetAuthState, SignUpUser } from '../ngxs/auth/auth.actions';
import { ResetNotesState } from '../ngxs/notes/notes.actions';
import { ResetTopicsState } from '../ngxs/topics/topics.actions';
import { ResetUsersState } from '../ngxs/users/users.actions';
import { User } from '../../shared/interfaces/models/user.interface';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorizedSubject$: Subject<void> = new Subject<void>();
  isAuthorized!: boolean;

  @Select(SignUpUserRequestState)
  signUpUserRequestState$!: Observable<IRequest<User>>;

  @Select(AuthGetterState.currentUser)
  currentUser$!: Observable<User>;

  @Select(LogInUserRequestState)
  logInUserRequestState$!: Observable<IRequest<User>>;

  @Select(GetUserByTokenRequestState)
  getUserByTokenRequestState$!: Observable<IRequest<User>>;

  @Select(LogOutUserRequestState)
  logOutUserRequestState$!: Observable<IRequest>;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.getUserByToken();

    this.isAuthorizedSubject$.pipe(
      withLatestFrom(this.currentUser$),
    ).subscribe(([_, user]) => {
      this.isAuthorized = !!user.token;
    });
  }

  signUpUser(user: User) {
    this.store.dispatch(new SignUpUser(user));
    return this.signUpUserRequestState$.pipe(
      filter(req => req.loaded && !req.loading)
    );
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
    return this.logInUserRequestState$.pipe(
      filter(req => req.loaded && !req.loading)
    );
  }

  logOutUser() {
    this.store.dispatch(new LogOutUser()).pipe(
      filter(res => {
        const request = res?.requests.logOutUser;
        return request.loaded && !request.loading && (request.status === RequestStatus.Success)
      })
    ).subscribe(() => {
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
    const token = localStorage.getItem('notesy_authToken');
    if (token) {
      this.store.dispatch(new GetUserByToken(token));
    }
    return this.getUserByTokenRequestState$;
  }
}
