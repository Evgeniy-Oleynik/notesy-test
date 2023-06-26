import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    NotFoundRoutingModule,
    SharedModule
  ],
  declarations: [
    NotFoundComponent
  ],
})

export class NotFoundModule {}
