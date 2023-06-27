import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { IRequest, RequestStatus } from 'ngxs-requests-plugin';

import { User } from '../../shared/interfaces/models/user.interface';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export function authGuard(): Observable<boolean> {
  const authService: AuthService = inject(AuthService);
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);

  return authService.currentUser$.pipe(
    map((user: User) => !!user?.token),
    switchMap((isToken) => {
      const tokenFromLS = localStorageService.getItem('authToken');

      switch (true) {
        case (isToken): {
          return of(true);
        }

        case (!!tokenFromLS): {
          return authService.getUserByToken().pipe(
            map((res: IRequest) => res.status === RequestStatus.Success),
            switchMap(isSuccess => {
              return isSuccess ? of(true)
                : router.navigateByUrl('/login');
            })
          );
        }

        default: {
          router.parseUrl('/login');
          return of(false);
        }
      }
    })
  );
}
