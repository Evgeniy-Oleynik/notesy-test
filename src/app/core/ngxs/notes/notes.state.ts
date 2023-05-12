import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
import { Note } from '../../../shared/interfaces/note';
import {
  DeleteNoteById, DeleteNoteByIdFailed, DeleteNoteByIdSuccess,
  GetNoteById, GetNoteByIdFailed,
  GetNoteByIdSuccess,
  GetNotes,
  GetNotesFailed,
  GetNotesSuccess, PatchNoteById, PatchNoteByIdFailed, PatchNoteByIdSuccess,
  PostNote,
  PostNoteFailed,
  PostNoteSuccess
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
  getNotesSuccess(ctx: StateContext<NotesStateModel>, {payload}: GetNotesSuccess) {
    console.log('getNotes success');
    const state = ctx.getState();
    payload.sort((a, b) => {
      if (a.id && b.id) {
        return a.id - b.id;
      } else { // @ts-ignore
        return a - b;
      }
    })
    const {ids, entities} = createEntitiesIds(state, payload, 'id');

    ctx.patchState({ids, entities});
  }

  @Action(GetNotesFailed)
  getNotesFailed() {
    console.log('getNotes failed');
  }

  @Action(PostNote)
  postNote({dispatch}: StateContext<NotesStateModel>, {payload}: PostNote) {
    const request = this.httpClient.post('api/notes', {'title': payload.title, 'text': payload.text, 'topicId': payload.topicId });

    return dispatch(createRequestAction({
      state: PostNoteRequestState,
      request,
      successAction: PostNoteSuccess,
      failAction: PostNoteFailed
    }))
  }

  @Action(PostNoteSuccess)
  postNoteSuccess(ctx: StateContext<NotesStateModel>, {payload}: PostNoteSuccess) {
    console.log('postNote success');
    const state = ctx.getState();
    const {ids, entities} = createEntitiesIds(state, [payload], 'id');

    ctx.patchState({ids, entities});
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
  getNoteByIdSuccess(ctx: StateContext<NotesStateModel>, {payload}: GetNoteByIdSuccess) {
    console.log('getNoteById success');
    const state = ctx.getState();
    const {ids, entities} = createEntitiesIds(state, [payload], 'id');

    ctx.patchState({ids, entities});
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
  patchNoteByIdSuccess(ctx: StateContext<NotesStateModel>, {payload}: PatchNoteByIdSuccess) {
    console.log('patchNoteById success');
    console.log(payload);

    const state = ctx.getState();
    const {ids, entities} = createEntitiesIds(state, [payload], 'id');

    ctx.patchState({ids, entities});
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
  deleteNoteByIdSuccess(ctx: StateContext<NotesStateModel>, {metadata}: DeleteNoteByIdSuccess) {
    console.log(metadata, 'deleteNoteById success');
    const state = ctx.getState();
    const ids = state.ids.filter(id => id !== +metadata);

    ctx.patchState({ids})
  }

  @Action(DeleteNoteByIdFailed)
  deleteNoteByIdFailed() {
    console.log('deleteNoteById failed');
  }
}
