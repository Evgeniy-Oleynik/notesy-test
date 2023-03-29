import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.localStorageService.getItem('authToken');
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }
    return next.handle(req);
  }
}
