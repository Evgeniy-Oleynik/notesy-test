import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { FormErrorsModule } from '../shared/components/form-errors/form-errors.module';
import { SharedModule } from '../shared/shared.module';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    SharedModule,
    SignupRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormErrorsModule,
    MatInputModule,
    MatIconModule,
  ],
  declarations: [
    SignupComponent
  ],
})

export class SignupModule {
}
