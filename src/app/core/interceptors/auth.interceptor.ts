import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { logMessages } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authService.currentUser$.pipe(
      take(1),
      switchMap((user: User) => {
        if (user) {
          console.log(user.token);
          req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${user.token}`) });
        }
        return next.handle(req);
      })
    );
  }
}
