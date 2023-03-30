import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<IRequest> {
  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    this.authService.getUserByToken();
    return this.authService.getUserByTokenRequestState$.pipe(
      filter(res => res.loaded),
      take(1)
    );
  }
}
