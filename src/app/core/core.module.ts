import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RawHttpClientModule } from '../shared/utility/raw-http-client.module';

import { INTERCEPTORS } from './interceptors/interceptors';
import { NgxsStateModule } from './ngxs/ngxs.module';

@NgModule({
  imports: [
    NgxsStateModule,
    HttpClientModule,
    RawHttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    INTERCEPTORS
  ]
})

export class CoreModule {
}
