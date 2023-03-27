import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { User } from '../../interfaces/user';
import {
  LogInUser,
  LogInUserFailed,
  LogInUserSuccess,
  LogOutUser, LogOutUserFailed, LogOutUserSuccess,
  SetToken,
  SignUpUser,
  SignUpUserFailed,
  SignUpUserSuccess
} from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { RequestsState } from 'ngxs-requests-plugin/lib/requests.state';
import { LocalStorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

@RequestState('signUpUser')
@Injectable()
export class SignUpUserRequestState {
}

@RequestState('logInUser')
@Injectable()
export class LogInUserRequestState {
}

@RequestState('logOutUser')
@Injectable()
export class LogOutUserRequestState {
}

export interface AuthStateModel {
  user: User;
}

const emptyUser: User = {
  id: undefined,
  name: '',
  email: '',
  token: ''
}

@State<AuthStateModel>({
  name: 'currentUser',
  defaults: {
    user: emptyUser
  }
})

@Injectable()
export class AuthState {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  @Action(SignUpUser)
  signUpUser({dispatch}: StateContext<AuthStateModel>, {payload}: SignUpUser) {
    const request = this.httpClient.post('api/signup', payload);

    return dispatch(createRequestAction({
      state: SignUpUserRequestState,
      request,
      failAction: SignUpUserFailed,
      successAction: SignUpUserSuccess
    }))
  }

  @Action(SignUpUserFailed)
  signUpUserFailed() {
    console.log('signup failed');
  }

  @Action(SignUpUserSuccess)
  signUpUserSuccess({patchState}: StateContext<AuthStateModel>, {payload}: SignUpUserSuccess) {
    console.log('signup success');
    patchState({user: payload});
    if (payload.token) this.localStorageService.setItem('authToken', payload.token);
    this.router.navigate(['/main']);
  }

  @Action(LogInUser)
  logInUser({dispatch}: StateContext<AuthStateModel>, {payload}: LogInUser) {
    const request = this.httpClient.post('api/login', payload);

    return dispatch(createRequestAction({
      state: LogInUserRequestState,
      request,
      failAction: LogInUserFailed,
      successAction: LogInUserSuccess
    }))
  }

  @Action(LogInUserFailed)
  logInUserFailed() {
    console.log('login failed');
  }

  @Action(LogInUserSuccess)
  logInUserSuccess({patchState}: StateContext<AuthStateModel>, {payload}: LogInUserSuccess) {
    console.log('login success');
    patchState({user: payload});
    if (payload.token) this.localStorageService.setItem('authToken', payload.token);
    this.router.navigate(['/main']);
  }

  @Action(LogOutUser)
  logOutUser({dispatch}: StateContext<AuthStateModel>) {
    console.log(222);
    const request = this.httpClient.post('api/logout', '');

    return dispatch(createRequestAction({
      state: LogOutUserRequestState,
      request,
      failAction: LogOutUserSuccess,
      successAction: LogOutUserFailed
    }))
  }

  @Action(LogOutUserSuccess)
  logOutUserSuccess({patchState}: StateContext<AuthStateModel>) {
    console.log('logout success');
    patchState({user: emptyUser});
  }

  @Action(LogOutUserFailed)
  logOutUserFailed() {
    console.log('logout failed');
  }

  @Action(SetToken)
  setToken({patchState}: StateContext<AuthStateModel>, {payload}: SetToken) {
    this.localStorageService.setItem('authToken', payload);
    console.log('set token', payload);
    patchState({user: {token: payload}});
  }
}
