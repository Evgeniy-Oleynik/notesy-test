import { createSelector, Selector } from '@ngxs/store';
import { UsersState, UsersStateModel } from './users.state';

export class UsersGetterState {
  @Selector([UsersState])
  static getAllUsers(state: UsersStateModel) {
    return state.entities;
  }

  static getUser(id: number) {
    return createSelector([UsersState], (state: UsersStateModel) => {
      console.log(id);
      return state.entities[id];
    })
  }
}
