import { UserInterface } from '../../../shared/interfaces/models/user.interface';

const ActionTypes = {
  SIGNUP_USER: '[Auth] Sign Up UserInterface',
  SIGNUP_USER_SUCCESS: '[Auth] Sign Up UserInterface Success',
  SIGNUP_USER_FAILED: '[Auth] Sign Up UserInterface Failed',

  LOGIN_USER: '[Auth] Log In UserInterface',
  LOGIN_USER_SUCCESS: '[Auth] Log In UserInterface Success',
  LOGIN_USER_FAILED: '[Auth] Log In UserInterface Failed',

  LOG_OUT_USER: '[Auth] Log Out',
  LOG_OUT_USER_SUCCESS: '[Auth] Log Out Success',
  LOG_OUT_USER_FAILED: '[Auth] Log Out Failed',

  GET_USER_BY_TOKEN: '[Auth] Get UserInterface By Token',
  GET_USER_BY_TOKEN_SUCCESS: '[Auth] Get UserInterface By Token Success',
  GET_USER_BY_TOKEN_FAILED: '[Auth] Get UserInterface By Token Failed',

  RESET_AUTH_STATE: '[Auth] Reset Auth State',
};

export class SignUpUser {
  static type = ActionTypes.SIGNUP_USER;

  constructor(public payload: Partial<UserInterface>) {
  }
}

export class SignUpUserSuccess {
  static type = ActionTypes.SIGNUP_USER_SUCCESS;

  constructor(public payload: UserInterface) {
  }
}

export class SignUpUserFailed {
  static type = ActionTypes.SIGNUP_USER_FAILED;
}

export class LogInUser {
  static type = ActionTypes.LOGIN_USER;

  constructor(public payload: Partial<UserInterface>) {
  }
}

export class LogInUserSuccess {
  static type = ActionTypes.LOGIN_USER_SUCCESS;

  constructor(public payload: UserInterface) {
  }
}

export class LogInUserFailed {
  static type = ActionTypes.LOGIN_USER_FAILED;
}

export class LogOutUser {
  static type = ActionTypes.LOG_OUT_USER;
}

export class LogOutUserSuccess {
  static type = ActionTypes.LOG_OUT_USER_SUCCESS;
}

export class LogOutUserFailed {
  static type = ActionTypes.LOG_OUT_USER_FAILED;
}

export class GetUserByToken {
  static type = ActionTypes.GET_USER_BY_TOKEN;

  constructor(public payload: string) {
  }
}

export class GetUserByTokenSuccess {
  static type = ActionTypes.GET_USER_BY_TOKEN_SUCCESS;

  constructor(public payload: UserInterface) {
  }
}

export class GetUserByTokenFailed {
  static type = ActionTypes.GET_USER_BY_TOKEN_FAILED;
}

export class ResetAuthState {
  static type = ActionTypes.RESET_AUTH_STATE;
}
