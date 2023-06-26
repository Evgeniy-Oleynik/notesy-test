import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormErrorsModule } from '../shared/components/form-errors/form-errors.module';
import { SharedModule } from '../shared/shared.module';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    SignupRoutingModule,
    SharedModule,
    FormErrorsModule,
    MatFormFieldModule,
  ],
  declarations: [
    SignupComponent
  ],
})

export class SignupModule {
}
