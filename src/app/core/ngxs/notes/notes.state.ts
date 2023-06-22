import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
import { updateEntitiesIds } from '../../../shared/utility/update-entities-ids';
import { Note } from '../../../shared/interfaces/note';

import {
  DeleteNoteById,
  DeleteNoteByIdFailed,
  DeleteNoteByIdSuccess,
  GetNoteById,
  GetNoteByIdFailed,
  GetNoteByIdSuccess,
  GetNotes,
  GetNotesFailed,
  GetNotesSuccess,
  PatchNote,
  PatchNoteFailed,
  PatchNoteSuccess,
  PostNote,
  PostNoteFailed,
  PostNoteSuccess,
  ResetNotesState,
} from './notes.actions';

@RequestState('getNotes')
@Injectable()
export class GetNotesRequestState {
}

@RequestState('postNote')
@Injectable()
export class PostNoteRequestState {
}

@RequestState('getNoteById')
@Injectable()
export class GetNoteByIdRequestState {
}

@RequestState('patchNoteById')
@Injectable()
export class PatchNoteRequestState {
}

@RequestState('deleteNoteById')
@Injectable()
export class DeleteNoteByIdRequestState {
}

export interface NotesStateModel {
  entities: { [key: number]: Note };
  ids: number[];
}

@State<NotesStateModel>({
  name: 'notes',
  defaults: {
    entities: {},
    ids: [],
  }
})

@Injectable()
export class NotesState {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {
  }

  @Action(GetNotes)
  getNotes({dispatch}: StateContext<NotesStateModel>, {payload: params}: GetNotes) {
    const request = this.httpClient.get(`notes`, {params});

    return dispatch(createRequestAction({
      state: GetNotesRequestState,
      request,
      successAction: GetNotesSuccess,
      failAction: GetNotesFailed
    }));
  }

  @Action(GetNotesSuccess)
  getNotesSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload: notes}: GetNotesSuccess) {
    const state = getState();
    const {ids, entities} = createEntitiesIds(state, notes);

    patchState({ids, entities});
  }

  @Action(GetNotesFailed)
  getNotesFailed() {
    console.log('Get Notes Failed');
  }

  @Action(GetNoteById)
  getNoteById({dispatch}: StateContext<NotesStateModel>, {payload: noteId}: GetNoteById) {
    const request = this.httpClient.get(`notes/${noteId}`);

    return dispatch(createRequestAction({
      state: GetNoteByIdRequestState,
      request,
      successAction: GetNoteByIdSuccess,
      failAction: GetNoteByIdFailed
    }));
  }

  @Action(GetNoteByIdSuccess)
  getNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload: note}: GetNoteByIdSuccess) {
    const state = getState();
    const {ids, entities} = createEntitiesIds(state, [note]);

    patchState({ids, entities});
  }

  @Action(GetNoteByIdFailed)
  getNoteByIdFailed() {
    console.log('Get Note By ID Failed');
  }

  @Action(PostNote)
  postNote({dispatch}: StateContext<NotesStateModel>, {payload: note}: PostNote) {
    const request = this.httpClient.post('notes', note);

    return dispatch(createRequestAction({
      state: PostNoteRequestState,
      request,
      successAction: PostNoteSuccess,
      failAction: PostNoteFailed
    }));
  }

  @Action(PostNoteSuccess)
  postNoteSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload: note}: PostNoteSuccess) {
    const state = getState();
    const {ids, entities} = updateEntitiesIds(state, [note]);

    patchState({ids, entities});
  }

  @Action(PostNoteFailed)
  postNoteFailed() {
    console.log('Post Note Failed');
  }

  @Action(PatchNote)
  patchNoteById({dispatch}: StateContext<NotesStateModel>, {payload: note}: PatchNote) {
    const request = this.httpClient.patch(`notes/${note.id}`, note);

    return dispatch(createRequestAction({
      state: PatchNoteRequestState,
      request,
      successAction: PatchNoteSuccess,
      failAction: PatchNoteFailed
    }));
  }

  @Action(PatchNoteSuccess)
  patchNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload: note}: PatchNoteSuccess) {
    const state = getState();
    const {ids, entities} = updateEntitiesIds(state, [note]);

    patchState({ids, entities});
  }

  @Action(PatchNoteFailed)
  patchNoteByIdFailed() {
    console.log('Patch Note Failed');
  }

  @Action(DeleteNoteById)
  deleteNoteById({dispatch}: StateContext<NotesStateModel>, {payload: noteId}: DeleteNoteById) {
    const request = this.httpClient.delete(`notes/${noteId}`);

    return dispatch(createRequestAction({
      state: DeleteNoteByIdRequestState,
      request,
      successAction: DeleteNoteByIdSuccess,
      failAction: DeleteNoteByIdFailed,
      metadata: noteId
    }));
  }

  @Action(DeleteNoteByIdSuccess)
  deleteNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {noteId}: DeleteNoteByIdSuccess) {
    const {ids} = getState();
    const updatedIds = ids.filter(id => id !== noteId);

    patchState({ids: updatedIds});
  }

  @Action(DeleteNoteByIdFailed)
  deleteNoteByIdFailed() {
    console.log('Delete Note Failed');
  }

  @Action(ResetNotesState)
  resetNotesState() {
    this.store.reset(NotesState);
  }
}
