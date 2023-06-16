import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SharedModule } from '../shared/shared.module';

import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteEditDialogModule } from './note-edit-dialog/note-edit-dialog.module';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatCheckboxModule,
    NotesRoutingModule,
    NoteEditDialogModule,
  ],
  declarations: [
    NotesComponent
  ],
})

export class NotesModule {}
