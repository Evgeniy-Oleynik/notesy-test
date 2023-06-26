import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';

import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { User } from '../../interfaces/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  currentUser$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;
  }

  logOut() {
    this.authService.logOutUser().pipe(
      filter(res => res.status === RequestStatus.Success),
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.localStorageService.removeItem('authToken');
      this.router.navigate(['/login']);
      this.authService.resetState();
      this.unsubscribe();
    });
  }

  logIn() {
    this.router.navigate(['login']);
  }

  unsubscribe() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
