import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LogInUserRequestState, SignUpUserRequestState, AuthState } from '../ngxs/auth/auth.state';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { IRequest } from 'ngxs-requests-plugin';
import { LogInUser, LogOutUser, SetToken, SignUpUser } from '../ngxs/auth/auth.actions';
import { LocalStorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.setTokenFromLS();
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
    console.log(111);
    this.store.dispatch(new LogOutUser());
    this.localStorageService.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  setTokenFromLS() {
    const token = this.localStorageService.getItem('authToken');
    if (token) this.store.dispatch(new SetToken(token));
  }

  isAuthorized(): boolean {
    return !!this.localStorageService.getItem('authToken');
  }
}
