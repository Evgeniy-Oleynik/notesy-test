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
  navigateAfterSuccess$: Subject<[request: Observable<IRequest>, navigateTo: string]> = new Subject<[request: Observable<IRequest>, navigateTo: string]>();

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

    this.isAuthorized$.pipe(
      withLatestFrom(this.currentUser$),
    ).subscribe(([_, user]) => {
      this.isAuthorized = !!user.token;
    });

    this.navigateAfterSuccess$.subscribe(([request, navigateTo]) => {
      request.pipe(
        filter(res => {
          console.log(res);
          return res.loaded;
        }),
      ).subscribe(res => {
        if (res.status === RequestStatus.Success) {
          this.router.navigate([navigateTo]);
        }
      });
    });
  }

  signUpUser(user: User) {
    this.store.dispatch(new SignUpUser(user));
    this.navigateAfterSuccess$.next([this.signUpUserRequestState$, 'notes']);
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
    this.navigateAfterSuccess$.next([this.logInUserRequestState$, 'notes']);

  }

  logOutUser() {
    this.store.dispatch(new LogOutUser());
    this.navigateAfterSuccess$.next([this.logOutUserRequestState$, 'login']);
    this.store.dispatch(new ResetNotesState());
    this.store.dispatch(new ResetTopicsState());
    this.store.dispatch(new ResetUsersState());
    this.store.dispatch(new ResetAuthState());
  }

  getUserByToken() {
    const token = localStorage.getItem('notesy_authToken');
    if (token) {
      console.log('local token found');
      this.store.dispatch(new GetUserByToken(token));
    }
  }
}
