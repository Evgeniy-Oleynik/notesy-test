import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IRequest } from 'ngxs-requests-plugin';
import { UsersService } from '../services/users.service';

@Injectable({providedIn: 'root'})
export class UsersResolver implements Resolve<IRequest> {
  constructor(private usersService: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    this.usersService.getAllUsers();
    return this.usersService.getAllUsersRequestState$.pipe(
      filter(res => res.loaded),
      take(1)
    );
  }
}
