import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
import { User } from '../../../shared/interfaces/models/user.interface';

import {
  GetAllUsers,
  GetAllUsersFailed,
  GetAllUsersSuccess,
  GetUserById,
  GetUserByIdFailed,
  GetUserByIdSuccess,
  ResetUsersState
} from './users.actions';

@RequestState('getAllUsers')
@Injectable()
export class GetAllUsersRequestState {
}

@RequestState('getUserById')
@Injectable()
export class GetUserByIdRequestState {
}

export interface UsersStateModel {
  entities: { [key: number]: User };
  ids: number[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    entities: {},
    ids: [],
  }
})

@Injectable()
export class UsersState {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {
  }

  @Action(GetAllUsers)
  getAllUsers({dispatch}: StateContext<UsersStateModel>) {
    const request = this.httpClient.get('users');

    dispatch(createRequestAction({
      state: GetAllUsersRequestState,
      request,
      successAction: GetAllUsersSuccess,
      failAction: GetAllUsersFailed
    }));
  }

  @Action(GetAllUsersSuccess)
  getAllUsersSuccess({getState, patchState}: StateContext<UsersStateModel>, {payload: users}: GetAllUsersSuccess) {
    const {ids, entities} = createEntitiesIds(users);

    patchState({ids, entities});
  }

  @Action(GetAllUsersFailed)
  getAllUsersFailed() {
    console.log('Get Users Failed');
  }

  @Action(GetUserById)
  getUserById({dispatch}: StateContext<UsersStateModel>, {payload: userId}: GetUserById) {
    const request = this.httpClient.get(`users/${userId}`);

    dispatch(createRequestAction({
      state: GetUserByIdRequestState,
      request,
      successAction: GetUserByIdSuccess,
      failAction: GetUserByIdFailed
    }));
  }

  @Action(GetUserByIdSuccess)
  getUserByIdSuccess({getState, patchState}: StateContext<UsersStateModel>, {payload: user}: GetUserByIdSuccess) {
    const state = getState();
    const {ids, entities} = createEntitiesIds([user], state);

    patchState({ids, entities});
  }

  @Action(GetUserByIdFailed)
  getUserByIdFailed() {
    console.log('Get User By ID Failed');
  }

  @Action(ResetUsersState)
  resetUsersState() {
    this.store.reset(UsersState);
  }
}
