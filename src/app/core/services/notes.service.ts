import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { Note } from '../../shared/interfaces/models/note.interface';
import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import { DeleteNoteById, GetNotes, PatchNote, PostNote } from '../ngxs/notes/notes.actions';
import {
  DeleteNoteByIdRequestState,
  GetNoteByIdRequestState,
  GetNotesRequestState,
  PatchNoteRequestState,
  PostNoteRequestState
} from '../ngxs/notes/notes.state';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  @Select(NotesGetterState.getNotes)
  notes$: Observable<Note[]>;

  @Select(GetNotesRequestState)
  getNotesRequestState$: Observable<IRequest<Note[]>>;

  @Select(GetNoteByIdRequestState)
  getNoteByIdRequestState$: Observable<IRequest<Note[]>>;

  @Select(PostNoteRequestState)
  postNoteRequestState$: Observable<IRequest>;

  @Select(PatchNoteRequestState)
  patchNoteByIdRequestState$: Observable<IRequest>;

  @Select(DeleteNoteByIdRequestState)
  deleteNoteByIdRequestState$: Observable<IRequest>;

  constructor(
    private store: Store,
  ) {
  }

  getNotes(params: { userId?: number, topicId?: number }) {
    this.store.dispatch(new GetNotes(params));
    return this.getNotesRequestState$;
  }

  getNoteById(id: number) {
    return this.store.select(NotesGetterState.getNoteById(id))
  }

  postNote(note: Partial<Note>) {
    this.store.dispatch(new PostNote(note));
    return this.postNoteRequestState$.pipe(
      filter(res => res.loaded && !res.loading),
    );
  }

  patchNote(note: Partial<Note>) {
    this.store.dispatch(new PatchNote(note));
    return this.patchNoteByIdRequestState$.pipe(
      filter(res => res.loaded && !res.loading)
    );
  }

  deleteNote(id: number) {
    this.store.dispatch(new DeleteNoteById(id));
    return this.deleteNoteByIdRequestState$.pipe(
      filter(res => res.loaded && !res.loading)
    );
  }
}
