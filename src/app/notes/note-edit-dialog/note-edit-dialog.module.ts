import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { NoteEditDialogComponent } from './note-edit-dialog.component';
import { NoteFormModule } from '../components/note-form/note-form.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NoteFormModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
  ],
  declarations: [
    NoteEditDialogComponent,
  ],
})

export class NoteEditDialogModule {}
