import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { Note } from '../interfaces/note';
import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import { GetNoteByIdRequestState, GetNotesRequestState } from '../ngxs/notes/notes.state';
import { GetNoteById, GetNotes, PatchNoteById, PostNote } from '../ngxs/notes/notes.actions';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  @Select(NotesGetterState.getNotes)
  notes$!: Observable<Note[]>;
  @Select(GetNotesRequestState)
  getNotesRequestState$!: Observable<IRequest<Note[]>>;
  @Select(GetNoteByIdRequestState)
  getNoteByIdRequestState$!: Observable<IRequest<Note[]>>;

  constructor(
    private store: Store,
  ) {}

  getUserNotes(userId: number) {
    this.store.dispatch(new GetNotes({userId}));
  }

  getNoteById(id: number) {
    this.store.dispatch(new GetNoteById(id));
  }

  getNoteById$(id: number) {
    return this.store.select(NotesGetterState.getNote(id));
  }

  postNote(note: Partial<Note>) {
    this.store.dispatch(new PostNote(note));
  }

  patchNote(note: Partial<Note>) {
    this.store.dispatch(new PatchNoteById(note));
  }
}
