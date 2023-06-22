import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { FormErrorsModule } from '../shared/components/form-errors/form-errors.module';
import { SharedModule } from '../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule,
    MatFormFieldModule,
    FormErrorsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent
  ],
})

export class LoginModule {
}
