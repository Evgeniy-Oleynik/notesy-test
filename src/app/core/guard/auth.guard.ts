import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

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
    if (!this.authService.isAuthorized()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }


}
