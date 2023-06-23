import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (/^https?:\/\//i.test(req.url)) {
      return next.handle(req);
    }

    const baseUrl = /\/$/.test(environment.api) ?
      environment.api.substring(0, environment.api.length - 1) :
      environment.api;

    const requestUrl = /^\//.test(req.url) ? req.url.substring(1, req.url.length) : req.url;

    const requestWithBaseUrl = req.clone({
      url: baseUrl ? `${baseUrl}/${requestUrl}` : req.url,
    });

    return next.handle(requestWithBaseUrl);
  }
}
