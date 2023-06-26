import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, tap } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { User } from '../../shared/interfaces/models/user.interface';
import { GetUserByTokenRequestState, LogInUserRequestState, LogOutUserRequestState, SignUpUserRequestState } from '../ngxs/auth/auth.state';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { GetUserByToken, LogInUser, LogOutUser, SignUpUser } from '../ngxs/auth/auth.actions';

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
    this.store.dispatch(new LogOutUser());
    return this.logOutUserRequestState$.pipe(
      tap(res => console.log(res)),
      filter(res => res.loaded && !res.loading)
    );
  }

  getUserByToken() {
    const token = this.localStorageService.getItem('authToken');
    if (token) {
      this.store.dispatch(new GetUserByToken(token));
    }
    return this.getUserByTokenRequestState$;
  }
}
