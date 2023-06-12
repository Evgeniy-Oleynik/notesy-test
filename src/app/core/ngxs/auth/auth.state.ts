import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { LocalStorageService } from '../../services/local-storage.service';
import { RawHttpClient } from '../../../shared/utility/raw-http-client.module';
import { User } from '../../../shared/interfaces/user';

import {
  GetUserByToken,
  GetUserByTokenFailed,
  GetUserByTokenSuccess,
  LogInUser,
  LogInUserFailed,
  LogInUserSuccess,
  LogOutUser,
  LogOutUserFailed,
  LogOutUserSuccess,
  ResetAuthState,
  SetToken,
  SignUpUser,
  SignUpUserFailed,
  SignUpUserSuccess
} from './auth.actions';

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

@RequestState('getUserByToken')
@Injectable()
export class GetUserByTokenRequestState {
}

export interface AuthStateModel {
  user: User;
}

const emptyUser: User = {
  id: undefined,
  name: '',
  email: '',
  token: ''
};

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
    private rawHttpClient: RawHttpClient,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) {
  }

  @Action(SignUpUser)
  signUpUser({dispatch}: StateContext<AuthStateModel>, {payload: userData}: SignUpUser) {
    const request = this.httpClient.post('api/signup', userData);

    return dispatch(createRequestAction({
      state: SignUpUserRequestState,
      request,
      failAction: SignUpUserFailed,
      successAction: SignUpUserSuccess
    }));
  }

  @Action(SignUpUserFailed)
  signUpUserFailed() {
    console.log('signup failed');
  }

  @Action(SignUpUserSuccess)
  signUpUserSuccess({patchState}: StateContext<AuthStateModel>, {payload: userData}: SignUpUserSuccess) {
    console.log('signup success');
    patchState({user: userData});
    if (userData.token) {
      this.localStorageService.setItem('authToken', userData.token);
    }
  }

  @Action(LogInUser)
  logInUser({dispatch}: StateContext<AuthStateModel>, {payload: userData}: LogInUser) {
    const request = this.httpClient.post('api/login', userData);

    return dispatch(createRequestAction({
      state: LogInUserRequestState,
      request,
      failAction: LogInUserFailed,
      successAction: LogInUserSuccess
    }));
  }

  @Action(LogInUserFailed)
  logInUserFailed() {
    console.log('login failed');
  }

  @Action(LogInUserSuccess)
  logInUserSuccess({patchState}: StateContext<AuthStateModel>, {payload: userData}: LogInUserSuccess) {
    console.log('login success');
    patchState({user: userData});
    if (userData.token) {
      this.localStorageService.setItem('authToken', userData.token);
    }
  }

  @Action(LogOutUser)
  logOutUser({dispatch}: StateContext<AuthStateModel>) {
    const request = this.httpClient.post('api/logout', '');

    return dispatch(createRequestAction({
      state: LogOutUserRequestState,
      request,
      failAction: LogOutUserFailed,
      successAction: LogOutUserSuccess
    }));
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
  setToken({patchState}: StateContext<AuthStateModel>, {payload: authToken}: SetToken) {
    console.log('set token', authToken);
    patchState({user: {token: authToken}});
  }

  @Action(GetUserByToken)
  getUserByToken({patchState, dispatch}: StateContext<AuthStateModel>, {payload: localAuthToken}: GetUserByToken) {
    console.log('getUserByToken:', localAuthToken);
    patchState({user: {token: localAuthToken}});
    const request = this.rawHttpClient.get('http://localhost:3000/users/,', {headers: {'Authorization': `Bearer ${localAuthToken}`}});

    return dispatch(createRequestAction({
      state: GetUserByTokenRequestState,
      request,
      failAction: GetUserByTokenFailed,
      successAction: GetUserByTokenSuccess
    }));
  }

  @Action(GetUserByTokenSuccess)
  getUserByTokenSuccess({patchState}: StateContext<AuthStateModel>, {payload: userData}: GetUserByTokenSuccess) {
    console.log('getUserByToken success');
    patchState({user: userData});
  }

  @Action(GetUserByTokenFailed)
  getUserByTokenFailed() {
    console.log('getUserByToken failed');
  }

  @Action(ResetAuthState)
  resetAuthState() {
    this.localStorageService.removeItem('authToken');
    this.store.reset(AuthState);
  }
}
