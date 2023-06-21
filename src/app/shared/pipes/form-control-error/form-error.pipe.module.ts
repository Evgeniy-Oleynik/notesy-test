import { NgModule } from '@angular/core';

import { FormControlErrorPipe } from './form-error.pipe';

@NgModule({
  declarations: [FormControlErrorPipe],
  exports: [FormControlErrorPipe]
})

export class FormControlErrorPipeModule {}
