import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { RawHttpClient } from '../../../shared/utility/raw-http-client.module';
import { User } from '../../../shared/interfaces/models/user.interface';
import { LocalStorageService } from '../../services/local-storage.service';

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

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null
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
  signUpUserSuccess({patchState}: StateContext<AuthStateModel>, {payload: user}: SignUpUserSuccess) {
    patchState({user});
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
    this.store.reset(AuthState);
  }
}
