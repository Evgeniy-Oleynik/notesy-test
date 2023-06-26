import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        this.snackBar.open(`${err.error.message}`, '', {panelClass: 'error', duration: 5000})
        return throwError(err);
      })
    );
  }
}
