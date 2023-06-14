import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token!: string;
    const currentUserSubscription$ = this.authService.currentUser$.pipe(
      filter(user => !!user?.token),
    ).subscribe(user => {
      token = user.token;
    });
    currentUserSubscription$.unsubscribe();
    req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    return next.handle(req);
  }
}
