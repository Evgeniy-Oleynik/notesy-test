import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '../../shared.module';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    RouterLink,
    MatMenuModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
