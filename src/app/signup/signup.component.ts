import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  hidePass1 = true;
  hidePass2 = true;

  signUpSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  signUpForm = new FormGroup<any>({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm: new FormControl('', [Validators.required])
  }, {validators: [this.passwordsAreNotEqual('password', 'confirm')]});

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  get nameFormControl() {
    return this.signUpForm.get('name') as FormControl;
  }
  get emailFormControl() {
    return this.signUpForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.signUpForm.get('password') as FormControl;
  }
  get confirmFormControl() {
    return this.signUpForm.get('confirm') as FormControl;
  }

  ngOnInit(): void {
    this.signUpSubject$.pipe(
      filter(() => this.signUpForm.valid),
      switchMap(() => {
        const formValue = this.signUpForm.value;
        return this.authService.signUpUser(formValue);
      }),
      takeUntil(this.componentDestroyed$)
    ).subscribe(res => {
      if (res.status === RequestStatus.Success) {
        this.router.navigate(['notes'])
      }
    });
  }

  signUp() {
    this.signUpSubject$.next();
  }

  passwordsAreNotEqual(password, confirm) {
    return (control: AbstractControl) => {
      const firstControl = control.get(password);
      const secondControl = control.get(confirm);
      if (secondControl.value && (firstControl.value !== secondControl.value)) {
        return this.confirmFormControl.setErrors({notequal: true})
      }
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
