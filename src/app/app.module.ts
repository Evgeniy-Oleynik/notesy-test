import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { HeaderModule } from './shared/components/header/header.module';
import { SpinnerModule } from './shared/components/spinner/spinner.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HeaderModule,
    SpinnerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
