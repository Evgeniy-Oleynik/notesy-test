import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IRequest, RequestStatus } from 'ngxs-requests-plugin';
import { LocalStorageService } from './local-storage.service';
import { GetUserByTokenRequestState, LogInUserRequestState, LogOutUserRequestState, SignUpUserRequestState } from '../ngxs/auth/auth.state';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { GetUserByToken, LogInUser, LogOutUser, SignUpUser } from '../ngxs/auth/auth.actions';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
  }

  navigateAfterSuccess(request: Observable<IRequest>, navigateTo: string) {
    request.pipe(
      filter(res => res.loaded),
      take(1),
      map(res => {
        if (res.status === RequestStatus.Success) {
          this.router.navigate([navigateTo]);
        }
      })
    ).subscribe();
  }

  signUpUser(user: User) {
    this.store.dispatch(new SignUpUser(user));
    this.navigateAfterSuccess(this.signUpUserRequestState$, 'notes');
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
    this.navigateAfterSuccess(this.logInUserRequestState$, 'notes');
  }

  logOutUser() {
    this.store.dispatch(new LogOutUser());
    this.navigateAfterSuccess(this.logOutUserRequestState$, 'login');
  }

  getUserByToken() {
    const token = localStorage.getItem('notesy_authToken');
    if (token) {
      console.log('local token');
      this.store.dispatch(new GetUserByToken(token));
    }
  }

  isAuthorized(): boolean {
    let token: string | undefined;
    this.currentUser$.pipe(
      filter(user => !!user.token),
      take(1),
      map(user => token = user.token)
    ).subscribe();
    console.log('isAuthorized:', !!token);
    return !!token;
  }
}
