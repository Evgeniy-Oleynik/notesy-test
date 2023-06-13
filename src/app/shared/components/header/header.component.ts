import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { User } from '../../interfaces/user';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(user => this.currentUser = user);
  }

  logOut() {
    this.authService.logOutUser();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
