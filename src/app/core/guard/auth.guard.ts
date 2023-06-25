import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';

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
  ) {
    return this.authService.currentUser$.pipe(
      map(user => user?.token ? true : this.router.navigate(['login'])),
    );
  }
}
