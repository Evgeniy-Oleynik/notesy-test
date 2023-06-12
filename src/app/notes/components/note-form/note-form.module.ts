import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SharedModule } from '../../../shared/shared.module';

import { NoteFormComponent } from './note-form.component';

@NgModule({
  imports: [
    SharedModule,
    RouterLink,
  ],
  exports: [
    NoteFormComponent
  ],
  declarations: [
    NoteFormComponent
  ],
})
export class NoteFormModule {
}
