import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { Note } from '../../shared/interfaces/note';
import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import {
  DeleteNoteByIdRequestState,
  GetNoteByIdRequestState,
  GetNotesRequestState,
  PatchNoteRequestState,
  PostNoteRequestState
} from '../ngxs/notes/notes.state';
import { DeleteNoteById, GetNoteById, GetNotes, PatchNote, PostNote } from '../ngxs/notes/notes.actions';

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

  @Select(PatchNoteRequestState)
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
