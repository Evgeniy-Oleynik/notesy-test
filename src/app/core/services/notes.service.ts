import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import { GetNoteByIdRequestState, GetNotesRequestState } from '../ngxs/notes/notes.state';
import { Note } from '../interfaces/note';
import { GetNoteById, GetNotes, PatchNoteById, PostNote } from '../ngxs/notes/notes.actions';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private store: Store
  ) { }

  @Select(NotesGetterState.getNotes)
  notes$!: Observable<Note[]>;

  @Select(GetNotesRequestState)
  getNotesRequestState$!: Observable<IRequest<Note[]>>;

  @Select(GetNoteByIdRequestState)
  getNoteByIdRequestState$!: Observable<IRequest<Note[]>>;

  getAllNotes(userId: number, topicId: number) {
    this.store.dispatch(new GetNotes({userId, topicId}));
  }

  getNoteById(id: number) {
    this.store.dispatch(new GetNoteById(id));
  }

  getNoteById$(id: number) {
    return this.store.select(NotesGetterState.getNote(id));
  }

  createNewNote(note: Partial<Note>) {
    this.store.dispatch(new PostNote(note))
  }

  patchNote(note: Partial<Note>) {
    this.store.dispatch(new PatchNoteById(note))
  }
}
