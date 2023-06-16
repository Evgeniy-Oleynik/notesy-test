import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SharedModule } from '../../shared.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    RouterLink,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
