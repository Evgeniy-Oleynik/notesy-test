import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token!: string;
    this.authService.currentUser$.pipe(
      filter(user => !!user.token),
      take(1),
      map(user => {
        if (user.token) token = user.token
      }),
    ).subscribe();
    req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    return next.handle(req);
  }
}
