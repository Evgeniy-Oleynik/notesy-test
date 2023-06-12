import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestUrl = req.url;
    if (requestUrl.indexOf('api') !== -1) {
      requestUrl = requestUrl.replace('api', 'http://localhost:3000');
    }

    // TODO 'http://localhost:3000' move to environments
    req = req.clone({
      url: requestUrl,
    });
    return next.handle(req);
  }
}
