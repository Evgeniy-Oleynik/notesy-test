import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { User } from '../../../shared/interfaces/user';
import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
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
  entities: {[key: number]: User};
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
  ) {}

  @Action(GetAllUsers)
  getAllUsers({dispatch}: StateContext<UsersStateModel>) {
    const request = this.httpClient.get('api/users');

    dispatch(createRequestAction({
      state: GetAllUsersRequestState,
      request,
      successAction: GetAllUsersSuccess,
      failAction: GetAllUsersFailed
    }))
  }

  @Action(GetAllUsersSuccess)
  getAllUsersSuccess({getState, patchState}:StateContext<UsersStateModel>, {payload}: GetAllUsersSuccess) {
    console.log('getAllUsers success');
    const {ids, entities} = createEntitiesIds(getState(), payload, 'id');

    patchState({ids, entities});
  }

  @Action(GetAllUsersFailed)
  getAllUsersFailed() {
    console.log('getAllUsers failed');
  }

  @Action(GetUserById)
  getUserById({dispatch}: StateContext<UsersStateModel>, {payload}: GetUserById) {
    const request = this.httpClient.get(`api/users/${payload}`);

    dispatch(createRequestAction({
      state: GetUserByIdRequestState,
      request,
      successAction: GetUserByIdSuccess,
      failAction: GetUserByIdFailed
    }))
  }

  @Action(GetUserByIdSuccess)
  getUserByIdSuccess({getState, patchState}: StateContext<UsersStateModel>, {payload}: GetUserByIdSuccess) {
    console.log('getUserById success');
    console.log(payload);
    const {ids, entities} = createEntitiesIds(getState(), [payload], 'id')

    patchState({ids, entities});
  }

  @Action(GetUserByIdFailed)
  getUserByIdFailed() {
    console.log('getUserById failed');
  }

  @Action(ResetUsersState)
  resetUsersState() {
    this.store.reset(UsersState);
  }
}
