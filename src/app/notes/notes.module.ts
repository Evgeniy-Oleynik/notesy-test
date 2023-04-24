import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { NoteCardModule } from '../components/note-card/note-card.module';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    NoteCardModule,
  ],
  declarations: [
    NotesComponent
  ],
})

export class NotesModule {}
