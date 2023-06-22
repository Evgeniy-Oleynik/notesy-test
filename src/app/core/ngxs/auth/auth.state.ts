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
  SignUpUser,
  SignUpUserFailed,
  SignUpUserSuccess
} from './auth.actions';
import { environment } from '../../../../environments/environment';

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
  id: null,
  name: null,
  email: null,
  token: null
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
    const request = this.httpClient.post('signup', userData);

    return dispatch(createRequestAction({
      state: SignUpUserRequestState,
      request,
      failAction: SignUpUserFailed,
      successAction: SignUpUserSuccess
    }));
  }

  @Action(SignUpUserFailed)
  signUpUserFailed() {
    console.log('Sign Up Failed');
  }

  @Action(SignUpUserSuccess)
  signUpUserSuccess({patchState}: StateContext<AuthStateModel>, {payload: userData}: SignUpUserSuccess) {
    patchState({user: userData});
    if (userData.token) {
      this.localStorageService.setItem('authToken', userData.token);
    }
  }

  @Action(LogInUser)
  logInUser({dispatch}: StateContext<AuthStateModel>, {payload: userData}: LogInUser) {
    const request = this.httpClient.post('login', userData);

    return dispatch(createRequestAction({
      state: LogInUserRequestState,
      request,
      failAction: LogInUserFailed,
      successAction: LogInUserSuccess
    }));
  }

  @Action(LogInUserFailed)
  logInUserFailed() {
    console.log('Log In Failed');
  }

  @Action(LogInUserSuccess)
  logInUserSuccess({patchState}: StateContext<AuthStateModel>, {payload: userData}: LogInUserSuccess) {
    patchState({user: userData});
    this.localStorageService.setItem('authToken', userData.token);
  }

  @Action(LogOutUser)
  logOutUser({dispatch}: StateContext<AuthStateModel>) {
    const request = this.httpClient.post('logout', '');

    return dispatch(createRequestAction({
      state: LogOutUserRequestState,
      request,
      failAction: LogOutUserFailed,
      successAction: LogOutUserSuccess
    }));
  }

  @Action(LogOutUserSuccess)
  logOutUserSuccess() {
    console.log('Log Out Complete');
  }

  @Action(LogOutUserFailed)
  logOutUserFailed() {
    console.log('Log Out Failed');
  }

  @Action(GetUserByToken)
  getUserByToken({patchState, dispatch}: StateContext<AuthStateModel>, {payload: localAuthToken}: GetUserByToken) {
    const request = this.rawHttpClient.get(`${environment.api}/users/,`, {headers: {'Authorization': `Bearer ${localAuthToken}`}});

    return dispatch(createRequestAction({
      state: GetUserByTokenRequestState,
      request,
      failAction: GetUserByTokenFailed,
      successAction: GetUserByTokenSuccess
    }));
  }

  @Action(GetUserByTokenSuccess)
  getUserByTokenSuccess({patchState}: StateContext<AuthStateModel>, {payload: userData}: GetUserByTokenSuccess) {
    patchState({user: userData});
  }

  @Action(GetUserByTokenFailed)
  getUserByTokenFailed() {
    console.log('Get User By Token Failed');
  }

  @Action(ResetAuthState)
  resetAuthState() {
    this.localStorageService.removeItem('authToken');
    this.store.reset(AuthState);
  }
}
