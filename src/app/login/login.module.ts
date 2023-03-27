import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent
  ],
})

export class LoginModule {}
