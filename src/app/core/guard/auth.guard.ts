import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { RequestStatus } from 'ngxs-requests-plugin';
import { map, of, switchMap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.guard();
  }

  canLoad(
    route: Route, segments: UrlSegment[]
  ) {
    return this.guard();
  }

  private guard() {
    return this.authService.currentUser$.pipe(
      map(user => !!user?.token),
      switchMap((isToken) => {
        const tokenFromLS = this.localStorageService.getItem('authToken');

        switch (true) {
          case (isToken): {
            return of(true);
          }

          case (!!tokenFromLS): {
            return this.authService.getUserByToken().pipe(
              map(res => res.status === RequestStatus.Success),
              switchMap(isSuccess => {
                return isSuccess ? of(true)
                  : this.router.navigate(['login']);
              })
            );
          }

          default: {
            this.router.navigate(['login']);
            return of(false);
          }
        }
      })
    );
  }
}
