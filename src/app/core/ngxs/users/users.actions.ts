import { User } from '../../../shared/interfaces/user';

const ActionTypes = {
  GET_ALL_USERS: '[Users] Get All Users',
  GET_ALL_USERS_SUCCESS: '[Users] Get All Users Success',
  GET_ALL_USERS_FAILED: '[Users] Get All Users Failed',
  GET_USER_BY_ID: '[Users] Get User By Id',
  GET_USER_BY_ID_SUCCESS: '[Users] Get User By Id Success',
  GET_USER_BY_ID_FAILED: '[Users] Get User By Id Failed',
}

export class GetAllUsers {
  static type = ActionTypes.GET_ALL_USERS
}

export class GetAllUsersSuccess {
  static type = ActionTypes.GET_ALL_USERS_SUCCESS
  constructor(public payload: User[]) {}
}

export class GetAllUsersFailed {
  static type = ActionTypes.GET_ALL_USERS_FAILED
  constructor() {}
}

export class GetUserById {
  static type = ActionTypes.GET_USER_BY_ID
  constructor(public payload: number) {}
}

export class GetUserByIdSuccess {
  static type = ActionTypes.GET_USER_BY_ID_SUCCESS
  constructor(public payload: User) {}
}

export class GetUserByIdFailed {
  static type = ActionTypes.GET_USER_BY_ID_FAILED
}
