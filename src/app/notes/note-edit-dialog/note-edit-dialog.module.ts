import { NgModule } from '@angular/core';

import { NoteFormModule } from '../components/note-form/note-form.module';
import { SharedModule } from '../../shared/shared.module';

import { NoteEditDialogComponent } from './note-edit-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    NoteFormModule,
  ],
  declarations: [
    NoteEditDialogComponent,
  ],
})

export class NoteEditDialogModule {}
