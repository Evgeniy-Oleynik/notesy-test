import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../interfaces/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  currentUser$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;
  }

  logOut() {
    this.authService.logOutUser();
  }

  logIn() {
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
