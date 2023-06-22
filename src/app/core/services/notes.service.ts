import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { NotesGetterState } from '../ngxs/notes/notes-getter.state';
import { DeleteNoteById, GetNotes, PatchNote, PostNote } from '../ngxs/notes/notes.actions';
import {
  DeleteNoteByIdRequestState,
  GetNoteByIdRequestState,
  GetNotesRequestState,
  PatchNoteRequestState,
  PostNoteRequestState
} from '../ngxs/notes/notes.state';
import { NoteInterface } from '../../shared/interfaces/models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  @Select(NotesGetterState.getNotes)
  notes$!: Observable<NoteInterface[]>;

  @Select(GetNotesRequestState)
  getNotesRequestState$!: Observable<IRequest<NoteInterface[]>>;

  @Select(GetNoteByIdRequestState)
  getNoteByIdRequestState$!: Observable<IRequest<NoteInterface[]>>;

  @Select(PostNoteRequestState)
  postNoteRequestState$!: Observable<IRequest>;

  @Select(PatchNoteRequestState)
  patchNoteByIdRequestState$!: Observable<IRequest>;

  @Select(DeleteNoteByIdRequestState)
  deleteNoteByIdRequestState$!: Observable<IRequest>;

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

  postNote(note: Partial<NoteInterface>) {
    this.store.dispatch(new PostNote(note));
    return this.postNoteRequestState$.pipe(
      filter(req => req.loaded && !req.loading),
    );
  }

  patchNote(note: Partial<NoteInterface>) {
    this.store.dispatch(new PatchNote(note));
    return this.patchNoteByIdRequestState$.pipe(
      filter(req => req.loaded && !req.loading)
    );
  }

  deleteNote(id: number) {
    this.store.dispatch(new DeleteNoteById(id));
    return this.deleteNoteByIdRequestState$.pipe(
      filter(req => req.loaded && !req.loading)
    );
  }
}
