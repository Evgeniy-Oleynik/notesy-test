import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { RequestsState } from 'ngxs-requests-plugin/lib/requests.state';
import { LocalStorageService } from '../../services/localstorage.service';
import { GetAllUsers, GetAllUsersFailed, GetAllUsersSuccess, GetUserById, GetUserByIdFailed, GetUserByIdSuccess } from './users.actions';
import { UsersService } from '../../services/users.service';
import { createEntitiesIds } from '../../utility/create-entities-ids';

@RequestState('getAllUsers')
@Injectable()
export class GetAllUsersRequestState {
}

@RequestState('getUserById')
@Injectable()
export class GetUserByIdRequestState {
}

export interface UsersStateModel {
  entities: {[id: number]: User}[];
  ids: number[];

}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    entities: [],
    ids: [],
  }
})

@Injectable()
export class UsersState {
  constructor(
    private httpClient: HttpClient,
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
  getAllUsersSuccess(ctx:StateContext<UsersState>, {payload}: GetAllUsersSuccess) {
    console.log('getAllUsers success');
    const state = ctx.getState();
    ctx.patchState(createEntitiesIds(state, payload, 'id'));
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
  getUserByIdSuccess(ctx: StateContext<UsersStateModel>, {payload}: GetUserByIdSuccess) {
    console.log('getUserById success');
    console.log(payload);
    const state = ctx.getState();
    ctx.patchState(createEntitiesIds(state, [payload], 'id'));
  }

  @Action(GetUserByIdFailed)
  getUserByIdFailed() {
    console.log('getUserById failed');
  }
}
