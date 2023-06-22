import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UserInterface } from '../../interfaces/models/user.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: UserInterface;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(user => user?.id ? this.currentUser = user : this.currentUser = null);
  }

  logOut() {
    this.authService.logOutUser();
  }

  logIn() {
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
