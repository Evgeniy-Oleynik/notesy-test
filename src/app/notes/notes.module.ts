import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../shared/shared.module';
import { NoteEditDialogModule } from './note-edit-dialog/note-edit-dialog.module';

import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';

@NgModule({
  imports: [
    NotesRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    NoteEditDialogModule,
  ],
  declarations: [
    NotesComponent
  ],
})

export class NotesModule {}
