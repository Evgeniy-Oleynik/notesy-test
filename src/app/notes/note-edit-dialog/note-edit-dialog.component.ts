import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../../shared/interfaces/note';

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.scss']
})
export class NoteEditDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partial<Note>,
  ) {}
}
