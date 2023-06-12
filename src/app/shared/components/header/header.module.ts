import { NgModule } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { SharedModule } from '../../shared.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    RouterLinkWithHref,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
