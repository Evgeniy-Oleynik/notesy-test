import { User } from '../../interfaces/user';

const ActionTypes = {
  SIGNUP_USER: '[Auth] Sign Up User',
  SIGNUP_USER_SUCCESS: '[Auth] Sign Up User Success',
  SIGNUP_USER_FAILED: '[Auth] Sign Up User Failed',
  LOGIN_USER: '[Auth] Log In User',
  LOGIN_USER_SUCCESS: '[Auth] Log In User Success',
  LOGIN_USER_FAILED: '[Auth] Log In User Failed',
  LOG_OUT_USER: '[Auth] Log Out',
  LOG_OUT_USER_SUCCESS: '[Auth] Log Out Success',
  LOG_OUT_USER_FAILED: '[Auth] Log Out Failed',
  SET_TOKEN: '[Auth] Set Token To Local Storage',
  GET_USER_BY_TOKEN: '[Auth] Get User By Token',
  GET_USER_BY_TOKEN_SUCCESS: '[Auth] Get User By Token Success',
  GET_USER_BY_TOKEN_FAILED: '[Auth] Get User By Token Failed'
}

export class SignUpUser {
  static type = ActionTypes.SIGNUP_USER;
  constructor(public payload: Partial<User>) {}
}

export class SignUpUserSuccess {
  static type = ActionTypes.SIGNUP_USER_SUCCESS
  constructor(public payload: User) {}
}

export class SignUpUserFailed {
  static type = ActionTypes.SIGNUP_USER_FAILED
}

export class LogInUser {
  static type = ActionTypes.LOGIN_USER
  constructor(public payload: Partial<User>) {}
}

export class LogInUserSuccess {
  static type = ActionTypes.LOGIN_USER_SUCCESS
  constructor(public payload: Partial<User>) {}
}

export class LogInUserFailed {
  static type = ActionTypes.LOGIN_USER_FAILED
}
export class LogOutUser {
  static type = ActionTypes.LOG_OUT_USER
}

export class LogOutUserSuccess {
  static type = ActionTypes.LOG_OUT_USER_SUCCESS
}

export class LogOutUserFailed {
  static type = ActionTypes.LOG_OUT_USER_FAILED
}

export class SetToken {
  static type = ActionTypes.SET_TOKEN
  constructor(public payload: string) {}
}

export class GetUserByToken {
  static type = ActionTypes.GET_USER_BY_TOKEN
  constructor(public payload: string) {}
}

export class GetUserByTokenSuccess {
  static type = ActionTypes.GET_USER_BY_TOKEN_SUCCESS
  constructor(public payload: User) {}
}

export class GetUserByTokenFailed {
  static type = ActionTypes.GET_USER_BY_TOKEN_FAILED
}
