import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api.interceptor';
import { AuthorizationInterceptor } from './auth.interceptor';

export const INTERCEPTORS = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
];
