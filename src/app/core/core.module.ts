import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RawHttpClientModule } from '../shared/utility/raw-http-client.module';

import { INTERCEPTORS } from './interceptors/interceptors';
import { NgxsStateModule } from './ngxs/ngxs.module';

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

export class CoreModule {
}
