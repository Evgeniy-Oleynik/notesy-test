import { Selector } from '@ngxs/store';

import { AuthState, AuthStateModel } from './auth.state';

export class AuthGetterState {
  @Selector([AuthState])
  static authUser(state: AuthStateModel) {
    return state.user;
  }
}
