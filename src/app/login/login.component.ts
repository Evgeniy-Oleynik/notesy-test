import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';

import { AuthService } from '../core/services/auth.service';

interface LogInForm {
  email: FormControl<string>,
  password: FormControl<string>
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  logInSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  hidePass = true;

  logInForm = new FormGroup<LogInForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  get emailFormControl() {
    return this.logInForm.controls.email;
  }

  get passwordFormControl() {
    return this.logInForm.controls.password;
  }

  ngOnInit(): void {
    this.logInSubject$.pipe(
      filter(() => this.logInForm.valid),
      switchMap(() => {
        const formValue = this.logInForm.value;
        return this.authService.logInUser(formValue);
      }),
      filter(res => res.status === RequestStatus.Success),
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => {
      this.router.navigate(['notes']);
    });
  }

  logIn() {
    this.logInSubject$.next();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
