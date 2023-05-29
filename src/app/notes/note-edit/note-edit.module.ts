import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoteEditComponent } from './note-edit.component';
import { NoteEditRoutingModule } from './note-edit-routing.module';
import { NoteFormModule } from '../components/note-form/note-form.module';

@NgModule({
  imports: [
    CommonModule,
    NoteEditRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NoteFormModule
  ],
  exports: [NoteEditComponent],
  declarations: [
    NoteEditComponent,
  ],
})

export class NoteEditModule {}
