import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
