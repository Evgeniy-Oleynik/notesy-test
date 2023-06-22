import { UserInterface } from '../../../shared/interfaces/models/user.interface';

const ActionTypes = {
  GET_ALL_USERS: '[Users] Get All Users',
  GET_ALL_USERS_SUCCESS: '[Users] Get All Users Success',
  GET_ALL_USERS_FAILED: '[Users] Get All Users Failed',

  GET_USER_BY_ID: '[Users] Get UserInterface By Id',
  GET_USER_BY_ID_SUCCESS: '[Users] Get UserInterface By Id Success',
  GET_USER_BY_ID_FAILED: '[Users] Get UserInterface By Id Failed',

  RESET_USERS_STATE: '[Users] Reset Users State',
};

export class GetAllUsers {
  static type = ActionTypes.GET_ALL_USERS;
}

export class GetAllUsersSuccess {
  static type = ActionTypes.GET_ALL_USERS_SUCCESS;

  constructor(public payload: UserInterface[]) {
  }
}

export class GetAllUsersFailed {
  static type = ActionTypes.GET_ALL_USERS_FAILED;
}

export class GetUserById {
  static type = ActionTypes.GET_USER_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetUserByIdSuccess {
  static type = ActionTypes.GET_USER_BY_ID_SUCCESS;

  constructor(public payload: UserInterface) {
  }
}

export class GetUserByIdFailed {
  static type = ActionTypes.GET_USER_BY_ID_FAILED;
}

export class ResetUsersState {
  static type = ActionTypes.RESET_USERS_STATE;
}
