import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';


@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.localStorageService.removeItem('authToken');
          this.authService.resetState();
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }
}
