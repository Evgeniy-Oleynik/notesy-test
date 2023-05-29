import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NoteFormComponent } from './note-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink,
  ],
  exports: [
    NoteFormComponent
  ],
  declarations: [
    NoteFormComponent
  ],
})
export class NoteFormModule {
}
