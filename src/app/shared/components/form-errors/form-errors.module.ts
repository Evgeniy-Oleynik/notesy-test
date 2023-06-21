import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlErrorPipeModule } from '../../pipes/form-control-error/form-error.pipe.module';

import { FormErrorsComponent } from './form-errors.component';

@NgModule({
  imports: [
    CommonModule,
    FormControlErrorPipeModule,
  ],
  exports: [FormErrorsComponent],
  declarations: [FormErrorsComponent]
})
export class FormErrorsModule {
}
