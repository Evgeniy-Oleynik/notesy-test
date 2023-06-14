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
import { User } from '../../shared/interfaces/user';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorizedSubject$: Subject<void> = new Subject<void>();
  isAuthorized!: boolean;

  @Select(SignUpUserRequestState)
  signUpUserRequestState$!: Observable<IRequest<User>>;

  @Select(AuthGetterState.authUser)
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
    this.signUpUserRequestState$.pipe(
      filter(res => {
        return res?.loaded && !res?.loading && res?.status === RequestStatus.Success
      }),
    ).subscribe(() => {
      this.router.navigate(['notes'])
    });
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
    this.logInUserRequestState$.pipe(
      filter(res => {
        return res?.loaded && !res?.loading && res?.status === RequestStatus.Success
      }),
    ).subscribe(() => {
      this.router.navigate(['notes'])
    });
  }

  logOutUser() {
    this.store.dispatch(new LogOutUser()).pipe(
      filter(res => res?.requests.logOutUser.loaded && !res?.requests.logOutUser.loading && res?.requests.logOutUser.status === RequestStatus.Success)
    ).subscribe(() => {
      this.router.navigate(['/login']);
      this.store.dispatch(new ResetNotesState());
      this.store.dispatch(new ResetTopicsState());
      this.store.dispatch(new ResetUsersState());
      this.store.dispatch(new ResetAuthState());
    });
  }

  getUserByToken() {
    const token = localStorage.getItem('notesy_authToken');
    if (token) {
      console.log('local token found');
      this.store.dispatch(new GetUserByToken(token));
    }
    return this.getUserByTokenRequestState$;
  }
}
