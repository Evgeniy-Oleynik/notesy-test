import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormErrorsModule } from '../shared/components/form-errors/form-errors.module';
import { SharedModule } from '../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule,
    FormErrorsModule,
    MatFormFieldModule,
  ],
  declarations: [
    LoginComponent
  ],
})

export class LoginModule {
}
