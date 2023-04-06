import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    RouterLinkWithHref,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {}
