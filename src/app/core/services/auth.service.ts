import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LogInUserRequestState, SignUpUserRequestState, AuthState, LogOutUserRequestState } from '../ngxs/auth/auth.state';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { IRequest } from 'ngxs-requests-plugin';
import { GetUserByToken, LogInUser, LogOutUser, SetToken, SignUpUser } from '../ngxs/auth/auth.actions';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
  ) {
    this.getUserByToken();
  }

  @Select(SignUpUserRequestState)
  signUpUserRequestState$!: Observable<IRequest<User>>;

  @Select(AuthGetterState.authUser)
  currentUser$!: Observable<User>;

  @Select(LogInUserRequestState)
  logInUserRequestState$!: Observable<IRequest<User>>

  signUpUser(user: User) {
    this.store.dispatch(new SignUpUser(user));
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
  }

  logOutUser() {
    this.store.dispatch(new LogOutUser());
  }

  getUserByToken() {
    const token = this.localStorageService.getItem('authToken');
    if (token) {
      this.store.dispatch(new GetUserByToken(token));
    }
  }

  isAuthorized(): boolean {
    return !!this.localStorageService.getItem('authToken');
  }
}
