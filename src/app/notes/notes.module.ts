import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NoteEditDialogModule } from './note-edit-dialog/note-edit-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    NoteEditDialogModule,
  ],
  declarations: [
    NotesComponent
  ],
})

export class NotesModule {}
