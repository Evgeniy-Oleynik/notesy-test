import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { User } from '../../shared/interfaces/models/user.interface';
import { GetUserByTokenRequestState, LogInUserRequestState, LogOutUserRequestState, SignUpUserRequestState } from '../ngxs/auth/auth.state';
import { GetUserByToken, LogInUser, LogOutUser, ResetAuthState, SignUpUser } from '../ngxs/auth/auth.actions';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
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
  ) {
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
    this.store.dispatch(new LogOutUser());
    return this.logOutUserRequestState$.pipe(
      filter(res => res.loaded && !res.loading)
    );
  }

  getUserByToken() {
    const token = this.localStorageService.getItem('authToken');
    if (token) {
      this.store.dispatch(new GetUserByToken(token));
    }
    return this.getUserByTokenRequestState$.pipe(
      filter(res => res.loaded && !res.loading)
    );
  }

  resetState() {
    this.store.dispatch([
      new ResetNotesState(),
      new ResetTopicsState(),
      new ResetUsersState(),
      new ResetAuthState()
    ]);
  }
}
