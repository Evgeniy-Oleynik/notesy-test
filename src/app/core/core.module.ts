import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsStateModule } from './ngxs/ngxs.module';
import { INTERCEPTORS } from './interceptors/interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsStateModule,
    HttpClientModule,
  ],
  providers: [
    INTERCEPTORS
  ]
})
export class CoreModule { }
