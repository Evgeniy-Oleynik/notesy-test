import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../interfaces/models/user.interface';
import { ResetNotesState } from '../../../core/ngxs/notes/notes.actions';
import { ResetTopicsState } from '../../../core/ngxs/topics/topics.actions';
import { ResetUsersState } from '../../../core/ngxs/users/users.actions';
import { ResetAuthState } from '../../../core/ngxs/auth/auth.actions';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Store } from '@ngxs/store';
import { RequestStatus } from 'ngxs-requests-plugin';

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
    private store: Store,
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
      this.store.dispatch([
        new ResetNotesState(),
        new ResetTopicsState(),
        new ResetUsersState(),
        new ResetAuthState()
      ]);
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
