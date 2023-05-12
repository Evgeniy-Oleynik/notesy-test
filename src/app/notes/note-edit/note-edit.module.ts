import { NgModule } from '@angular/core';
import { NoteEditRoutingModule } from './note-edit-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NoteEditComponent, NoteEditDialog } from './note-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    NoteEditRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  declarations: [
    NoteEditComponent,
    NoteEditDialog,
  ],
})

export class NoteEditModule {}
