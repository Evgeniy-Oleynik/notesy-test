import { Selector } from '@ngxs/store';

import { AuthState, AuthStateModel } from './auth.state';

export class AuthGetterState {
  @Selector([AuthState])
  static currentUser(state: AuthStateModel) {
    return state.user;
  }
}
