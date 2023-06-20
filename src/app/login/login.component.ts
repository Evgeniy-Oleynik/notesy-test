import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm = new FormGroup<any>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  get emailFormControl() {
    return this.logInForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.logInForm.get('password') as FormControl;
  }

  ngOnInit(): void {
  }

  logIn() {
    this.authService.logInUser(this.logInForm.value);
  }
}
