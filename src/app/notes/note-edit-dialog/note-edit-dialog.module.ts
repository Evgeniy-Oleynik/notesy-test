import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { NoteEditDialogComponent } from './note-edit-dialog.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NoteEditDialogComponent,
  ],
})

export class NoteEditDialogModule {}
