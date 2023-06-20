import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
  }

  signUp() {
    this.authService.signUpUser(this.signUpForm.value);
  }

  passwordsAreNotEqual(password, confirm) {
    return (control: AbstractControl) => {
      const firstControl = control.get(password);
      const secondControl = control.get(confirm);
      if (secondControl.value && (firstControl.value !== secondControl.value)) {
        return this.confirmFormControl.setErrors({notEqual: true})
      }
    }
  }
}
