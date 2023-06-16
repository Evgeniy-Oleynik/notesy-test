import { NgModule } from '@angular/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';

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
