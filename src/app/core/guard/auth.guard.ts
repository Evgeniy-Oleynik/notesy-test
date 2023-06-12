import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.authService.isAuthorized$.next();
    console.log('Authorized:', this.authService.isAuthorized);
    if (!this.authService.isAuthorized) {
      this.router.navigate(['/login']);
    }
    return this.authService.isAuthorized;
  }


}
