import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { IRequest, RequestStatus } from 'ngxs-requests-plugin';
import { LocalStorageService } from './local-storage.service';
import { GetUserByTokenRequestState, LogInUserRequestState, LogOutUserRequestState, SignUpUserRequestState } from '../ngxs/auth/auth.state';
import { AuthGetterState } from '../ngxs/auth/auth-getter.state';
import { GetUserByToken, LogInUser, LogOutUser, ResetAuthState, SignUpUser } from '../ngxs/auth/auth.actions';
import { ResetNotesState } from '../ngxs/notes/notes.actions';
import { ResetTopicsState } from '../ngxs/topics/topics.actions';
import { ResetUsersState } from '../ngxs/users/users.actions';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized$: Subject<void> = new Subject<void>();
  isAuthorized!: boolean;
  navigateAfterSuccess$: Subject<[request: Observable<IRequest>, navigateTo: string]> = new Subject<[request: Observable<IRequest>, navigateTo: string]>();

  @Select(SignUpUserRequestState)
  signUpUserRequestState$!: Observable<IRequest<User>>;

  @Select(AuthGetterState.authUser)
  currentUser$!: Observable<User>;

  @Select(LogInUserRequestState)
  logInUserRequestState$!: Observable<IRequest<User>>;

  @Select(GetUserByTokenRequestState)
  getUserByTokenRequestState$!: Observable<IRequest<User>>;

  @Select(LogOutUserRequestState)
  logOutUserRequestState$!: Observable<IRequest>;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.getUserByToken();

    this.isAuthorized$.pipe(
      withLatestFrom(this.currentUser$),
    ).subscribe(([_, user]) => {
      this.isAuthorized = !!user.token;
    });

    this.navigateAfterSuccess$.subscribe(([request, navigateTo]) => {
      console.log(111);
      request.pipe(
        filter(res => {
          console.log(res);
          return res.loaded;
        }),
      ).subscribe(res => {
        console.log(222);
        if (res.status === RequestStatus.Success) {
          console.log(333);
          this.router.navigate([navigateTo]);
        }
      })
    })
  }

  navigateAfterSuccess(request: Observable<IRequest>, navigateTo: string) {
    console.log(111);
    request.pipe(
      filter(res => {
        console.log(res);
        return res.loaded;
      }),
      map(res => {
        console.log(222);
        if (res.status === RequestStatus.Success) {
          console.log(333);
          this.router.navigate([navigateTo]);
        }
      })
    ).subscribe();
  }

  signUpUser(user: User) {
    this.store.dispatch(new SignUpUser(user));
    this.navigateAfterSuccess(this.signUpUserRequestState$, 'notes');
  }

  logInUser(user: Partial<User>) {
    this.store.dispatch(new LogInUser(user));
    this.navigateAfterSuccess$.next([this.logInUserRequestState$, 'notes']);

  }

  logOutUser() {
    this.store.dispatch(new LogOutUser());
    this.navigateAfterSuccess$.next([this.logOutUserRequestState$, 'login']);
    this.store.dispatch(new ResetNotesState());
    this.store.dispatch(new ResetTopicsState());
    this.store.dispatch(new ResetUsersState());
    this.store.dispatch(new ResetAuthState());
  }

  getUserByToken() {
    const token = localStorage.getItem('notesy_authToken');
    if (token) {
      console.log('local token');
      this.store.dispatch(new GetUserByToken(token));
    }
  }
}
