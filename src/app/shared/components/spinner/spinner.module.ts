import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SharedModule } from '../../shared.module';

import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SpinnerComponent,
  ]
})
export class SpinnerModule {}
