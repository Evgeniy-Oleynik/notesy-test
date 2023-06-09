import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';

import { AuthService } from '../core/services/auth.service';
import { inputsNotEqual } from '../shared/validators/inputs-not-equal/inputs-not-equal.validator';
import { LocalStorageService } from '../core/services/local-storage.service';

interface SignUpForm {
  name: FormControl<string>,
  email: FormControl<string>,
  password: FormControl<string>,
  confirm: FormControl<string>,
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  hidePass1 = true;
  hidePass2 = true;

  signUpForm = new FormGroup<SignUpForm>({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm: new FormControl('', [Validators.required])
  }, {validators: [inputsNotEqual('password', 'confirm')]});

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  get nameFormControl() {
    return this.signUpForm.controls.name;
  }

  get emailFormControl() {
    return this.signUpForm.controls.email;
  }

  get passwordFormControl() {
    return this.signUpForm.controls.password;
  }

  get confirmFormControl() {
    return this.signUpForm.controls.confirm;
  }

  ngOnInit(): void {
    this.signUpSubject$.pipe(
      filter(() => this.signUpForm.valid),
      switchMap(() => {
        const formValue = this.signUpForm.value;
        return this.authService.signUpUser(formValue);
      }),
      filter(res => res.status === RequestStatus.Success),
      takeUntil(this.componentDestroyed$)
    ).subscribe(res => {
      this.localStorageService.setItem('authToken', res.data.token);
      this.router.navigate(['notes']);
    });

    this.authService.getUserByToken().pipe(
      filter(res => res.status === RequestStatus.Success),
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => this.router.navigate(['notes']));
  }

  signUp() {
    this.signUpSubject$.next();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
