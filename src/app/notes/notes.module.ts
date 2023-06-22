import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { NoteEditDialogModule } from './note-edit-dialog/note-edit-dialog.module';

import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    NotesRoutingModule,
    NoteEditDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  declarations: [
    NotesComponent
  ],
})

export class NotesModule {}
