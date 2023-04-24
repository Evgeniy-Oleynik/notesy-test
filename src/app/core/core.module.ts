import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxsStateModule } from './ngxs/ngxs.module';
import { INTERCEPTORS } from './interceptors/interceptors';
import { RawHttpClientModule } from '../shared/utility/raw-http-client.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsStateModule,
    HttpClientModule,
    RawHttpClientModule,
  ],
  providers: [
    INTERCEPTORS
  ]
})
export class CoreModule { }
