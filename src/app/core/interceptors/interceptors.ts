import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api.interceptor';
import { AuthorizationInterceptor } from './auth.interceptor';
import { UnauthorizedErrorInterceptor } from './unauth-error.interceptor';
import { GlobalErrorHandlerInterceptor } from './global-error-handler.interceptor';

export const INTERCEPTORS = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: GlobalErrorHandlerInterceptor, multi: true},
];
