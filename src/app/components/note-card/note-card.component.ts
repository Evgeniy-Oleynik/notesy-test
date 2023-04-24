import { Component, Input } from '@angular/core';
import { Note } from '../../shared/interfaces/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  @Input() noteCard?: Partial<Note>;

  constructor() { }

}
