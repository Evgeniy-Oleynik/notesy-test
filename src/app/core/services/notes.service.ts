import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { Note } from '../../shared/interfaces/note';
import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import {
  DeleteNoteByIdRequestState,
  GetNoteByIdRequestState,
  GetAllNotesRequestState,
  PatchNoteRequestState,
  PostNoteRequestState
} from '../ngxs/notes/notes.state';
import { DeleteNoteById, GetNoteById, GetAllNotes, PatchNote, PostNote, SetCurrentNoteId, GetUserNotes } from '../ngxs/notes/notes.actions';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  @Select(NotesGetterState.getNotes)
  notes$!: Observable<Note[]>;

  @Select(NotesGetterState.getUserNotes)
  userNotes$!: Observable<Note[]>;

  @Select(NotesGetterState.getCurrentNote)
  currentNote$!: Observable<Note>;

  @Select(GetAllNotesRequestState)
  getNotesRequestState$!: Observable<IRequest<Note[]>>;

  @Select(GetNoteByIdRequestState)
  getNoteByIdRequestState$!: Observable<IRequest<Note[]>>;

  @Select(PostNoteRequestState)
  postNoteRequestState$!: Observable<IRequest>;

  @Select(PatchNoteRequestState)
  patchNoteByIdRequestState$!: Observable<IRequest>;

  @Select(DeleteNoteByIdRequestState)
  deleteNoteByIdRequestState$!: Observable<IRequest>;

  constructor(
    private store: Store,
  ) {}

  getAllNotes() {
    this.store.dispatch(new GetAllNotes());
  }

  getUserNotes(userId: number) {
    this.store.dispatch(new GetUserNotes(userId));
  }

  getNoteById(id: number) {
    this.store.dispatch(new GetNoteById(id));
    return this.getNoteByIdRequestState$;
  }

  setCurrentNoteId(id: number | null) {
    this.store.dispatch(new SetCurrentNoteId(id));
  }

  postNote(note: Partial<Note>) {
    this.store.dispatch(new PostNote(note));
    return this.postNoteRequestState$.pipe(
      filter(req => req.loaded),
    );
  }

  patchNote(note: Partial<Note>) {
    this.store.dispatch(new PatchNote(note));
    return this.patchNoteByIdRequestState$.pipe(
      filter(req => req.loaded)
    );
  }

  deleteNote(id: number) {
    this.store.dispatch(new DeleteNoteById(id));
    return this.getNoteByIdRequestState$.pipe(
      filter(req => req.loaded)
    );
  }
}
