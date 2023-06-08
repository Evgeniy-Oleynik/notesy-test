import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import {
  DeleteNoteById, DeleteNoteByIdFailed, DeleteNoteByIdSuccess,
  GetNoteById, GetNoteByIdFailed, GetNoteByIdSuccess,
  GetNotes, GetNotesFailed, GetNotesSuccess,
  PatchNote, PatchNoteFailed, PatchNoteSuccess,
  PostNote, PostNoteFailed, PostNoteSuccess,
  ResetNotesState,
  SetCurrentNoteId,
  GetUserNotes, GetUserNotesSuccess, GetUserNotesFailed
} from './notes.actions';
import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
import { Note } from '../../../shared/interfaces/note';

@RequestState('getNotes')
@Injectable()
export class GetNotesRequestState {
}

@RequestState('getUserNotes')
@Injectable()
export class GetUserNotesRequestState{
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
  entities: {[key: number]: Note};
  ids: number[];
  currentNoteId: number | null;
}

@State<NotesStateModel>({
  name: 'notes',
  defaults: {
    entities: {},
    ids: [],
    currentNoteId: null,
  }
})

@Injectable()
export class NotesState {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {}

  @Action(GetNotes)
  getNotes({dispatch}: StateContext<NotesStateModel>, {payload: params}: GetNotes) {
    const request = this.httpClient.get(`api/notes`, {params});

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
    const state = getState();
    const {ids, entities} = createEntitiesIds(state, payload);

    patchState({ids, entities});
  }

  @Action(GetNotesFailed)
  getNotesFailed() {
    console.log('getNotes failed');
  }

  @Action(GetUserNotes)
  getUserNotes({dispatch}: StateContext<NotesStateModel>, {payload}: GetUserNotes) {
    let queryParams = new HttpParams().append('userId', payload);
    const request = this.httpClient.get(`api/notes`, {params: queryParams});

    return dispatch(createRequestAction({
      state: GetUserNotesRequestState,
      request,
      successAction: GetUserNotesSuccess,
      failAction: GetUserNotesFailed
    }))
  }

  @Action(GetUserNotesSuccess)
  getUserNotesSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload}: GetUserNotesSuccess) {
    console.log('getUserNotes success');
    const {ids, entities} = createEntitiesIds(getState(), payload);

    patchState({ids, entities});
  }

  @Action(GetUserNotesFailed)
  getUserNotesFailed() {
    console.log('getUserNotes failed');
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

  @Action(SetCurrentNoteId)
  setCurrentNoteId({patchState}: StateContext<NotesStateModel>, {payload}: SetCurrentNoteId) {
    console.log('currentNoteId:', payload);
    const currentNoteId = payload;

    patchState({currentNoteId});
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

  @Action(PatchNote)
  patchNoteById({dispatch}: StateContext<NotesStateModel>, {payload}: PatchNote) {
    const request = this.httpClient.patch(`api/notes/${payload.id}`, payload);
    console.log(payload);

    return dispatch(createRequestAction({
      state: PatchNoteRequestState,
      request,
      successAction: PatchNoteSuccess,
      failAction: PatchNoteFailed
    }))
  }

  @Action(PatchNoteSuccess)
  patchNoteByIdSuccess({getState, patchState}: StateContext<NotesStateModel>, {payload}: PatchNoteSuccess) {
    console.log('patchNoteById success');
    console.log(payload);

    const {ids, entities} = createEntitiesIds(getState(), [payload]);

    patchState({ids, entities});
  }

  @Action(PatchNoteFailed)
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
