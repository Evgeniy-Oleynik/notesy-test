import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { Note } from '../../shared/interfaces/note';
import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import {
  DeleteNoteByIdRequestState,
  GetNoteByIdRequestState,
  GetNotesRequestState,
  PatchNoteByIdRequestState,
  PostNoteRequestState
} from '../ngxs/notes/notes.state';
import { DeleteNoteById, GetNoteById, GetNotes, PatchNoteById, PostNote } from '../ngxs/notes/notes.actions';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  currentNote$: BehaviorSubject<Note> = new BehaviorSubject<Note>({});

  @Select(NotesGetterState.getNotes)
  notes$!: Observable<Note[]>;

  @Select(GetNotesRequestState)
  getNotesRequestState$!: Observable<IRequest<Note[]>>;

  @Select(GetNoteByIdRequestState)
  getNoteByIdRequestState$!: Observable<IRequest<Note[]>>;

  @Select(PostNoteRequestState)
  postNoteRequestState$!: Observable<IRequest>;

  @Select(PatchNoteByIdRequestState)
  patchNoteByIdRequestState$!: Observable<IRequest>;

  @Select(DeleteNoteByIdRequestState)
  deleteNoteByIdRequestState$!: Observable<IRequest>;

  constructor(
    private store: Store,
  ) {}

  getUserNotes(userId: number) {
    this.store.dispatch(new GetNotes({userId}));
  }

  getNoteById(id: number) {
    this.store.dispatch(new GetNoteById(id));
    return this.getNoteByIdRequestState$;
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

  deleteNote(id: number) {
    this.store.dispatch(new DeleteNoteById(id));
  }
}
