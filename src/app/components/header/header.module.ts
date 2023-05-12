import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    RouterLinkWithHref,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
