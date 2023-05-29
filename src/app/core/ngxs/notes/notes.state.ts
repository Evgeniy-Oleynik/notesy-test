import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import {
  DeleteNoteById, DeleteNoteByIdFailed, DeleteNoteByIdSuccess,
  GetNoteById, GetNoteByIdFailed,
  GetNoteByIdSuccess,
  GetNotes,
  GetNotesFailed,
  GetNotesSuccess, PatchNoteById, PatchNoteByIdFailed, PatchNoteByIdSuccess,
  PostNote,
  PostNoteFailed,
  PostNoteSuccess, ResetNotesState
} from './notes.actions';
import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
import { Note } from '../../../shared/interfaces/note';

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
export class PatchNoteByIdRequestState {
}

@RequestState('deleteNoteById')
@Injectable()
export class DeleteNoteByIdRequestState {
}

export interface NotesStateModel {
  entities: {[key: number]: Note};
  ids: number[];
}

@State<NotesStateModel>({
  name: 'notes',
  defaults: {
    entities: {},
    ids: []
  }
})

@Injectable()
export class NotesState {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {}

  @Action(GetNotes)
  getAllNotes({dispatch}: StateContext<NotesStateModel>, {payload}: GetNotes) {
    const request = this.httpClient.get(`api/notes?userId=${payload.userId}`);

    return dispatch(createRequestAction({
      state: GetNotesRequestState,
      request,
      successAction: GetNotesSuccess,
      failAction: GetNotesFailed
    }))
  }

  @Action(GetNotesSuccess)
  getNotesSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload}: GetNotesSuccess) {
    console.log('getNotes success');
    const {ids, entities} = createEntitiesIds(getState(), payload);

    patchState({ids, entities});
  }

  @Action(GetNotesFailed)
  getNotesFailed() {
    console.log('getNotes failed');
  }

  @Action(PostNote)
  postNote({dispatch}: StateContext<NotesStateModel>, {payload}: PostNote) {
    const request = this.httpClient.post('api/notes', payload);

    return dispatch(createRequestAction({
      state: PostNoteRequestState,
      request,
      successAction: PostNoteSuccess,
      failAction: PostNoteFailed
    }))
  }

  @Action(PostNoteSuccess)
  postNoteSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload}: PostNoteSuccess) {
    console.log('postNote success');
    const {ids, entities} = createEntitiesIds(getState(), [payload]);

    patchState({ids, entities});
  }

  @Action(PostNoteFailed)
  postNoteFailed() {
    console.log('postNote failed');
  }

  @Action(GetNoteById)
  getNoteById({dispatch}: StateContext<NotesStateModel>, {payload}: GetNoteById) {
    const request = this.httpClient.get(`api/notes/${payload}`);

    return dispatch(createRequestAction({
      state: GetNoteByIdRequestState,
      request,
      successAction: GetNoteByIdSuccess,
      failAction: GetNoteByIdFailed
    }))
  }

  @Action(GetNoteByIdSuccess)
  getNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload}: GetNoteByIdSuccess) {
    console.log('getNoteById success');
    const {ids, entities} = createEntitiesIds(getState(), [payload]);

    patchState({ids, entities});
  }

  @Action(GetNoteByIdFailed)
  getNoteByIdFailed() {
    console.log('getNoteById failed');
  }

  @Action(PatchNoteById)
  patchNoteById({dispatch}: StateContext<NotesStateModel>, {payload}: PatchNoteById) {
    const request = this.httpClient.patch(`api/notes/${payload.id}`, payload);
    console.log(payload);

    return dispatch(createRequestAction({
      state: PatchNoteByIdRequestState,
      request,
      successAction: PatchNoteByIdSuccess,
      failAction: PatchNoteByIdFailed
    }))
  }

  @Action(PatchNoteByIdSuccess)
  patchNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload}: PatchNoteByIdSuccess) {
    console.log('patchNoteById success');
    console.log(payload);

    const {ids, entities} = createEntitiesIds(getState(), [payload]);

    patchState({ids, entities});
  }

  @Action(PatchNoteByIdFailed)
  patchNoteByIdFailed() {
    console.log('patchNoteById failed');
  }

  @Action(DeleteNoteById)
  deleteNoteById({dispatch}: StateContext<NotesStateModel>, {payload}: DeleteNoteById) {
    const request = this.httpClient.delete(`api/notes/${payload}`);

    return dispatch(createRequestAction({
      state: DeleteNoteByIdRequestState,
      request,
      successAction: DeleteNoteByIdSuccess,
      failAction: DeleteNoteByIdFailed,
      metadata: payload
    }))
  }

  @Action(DeleteNoteByIdSuccess)
  deleteNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {noteId}: DeleteNoteByIdSuccess) {
    console.log(noteId, 'deleteNoteById success');
    const ids = getState().ids.filter(id => id !== +noteId);

    patchState({ids})
  }

  @Action(DeleteNoteByIdFailed)
  deleteNoteByIdFailed() {
    console.log('deleteNoteById failed');
  }

  @Action(ResetNotesState)
  resetNotesState() {
    this.store.reset(NotesState);
  }
}
