import { Note } from '../../../shared/interfaces/note';

const ActionTypes = {
  GET_NOTES: '[Notes] Get Notes',
  GET_NOTES_SUCCESS: '[Notes] Get Notes Success',
  GET_NOTES_FAILED: '[Notes] Get Notes Failed',
  POST_NOTE: '[Notes] Post Note',
  POST_NOTE_SUCCESS: '[Notes] Post Note Success',
  POST_NOTE_FAILED: '[Notes] Post Note Failed',
  GET_NOTE_BY_ID: '[Notes] Get Note By ID',
  GET_NOTE_BY_ID_SUCCESS: '[Notes] Get Note By ID Success',
  GET_NOTE_BY_ID_FAILED: '[Notes] Get Note By ID Failed',
  PATCH_NOTE_BY_ID: '[Notes] Patch Note By ID',
  PATCH_NOTE_BY_ID_SUCCESS: '[Notes] Patch Note By ID Success',
  PATCH_NOTE_BY_ID_FAILED: '[Notes] Patch Note By ID Failed',
  DELETE_NOTE_BY_ID: '[Notes] Delete Note By ID',
  DELETE_NOTE_BY_ID_SUCCESS: '[Notes] Delete Note By ID Success',
  DELETE_NOTE_BY_ID_FAILED: '[Notes] Delete Note By ID Failed',
  RESET_NOTES_STATE: '[Notes] Reset Notes State'
}

export class GetNotes {
  static type = ActionTypes.GET_NOTES;

  constructor(public payload: {userId: number}) {}
}

export class GetNotesSuccess {
  static type = ActionTypes.GET_NOTES_SUCCESS;

  constructor(public payload: Note[]) {}
}

export class GetNotesFailed {
  static type = ActionTypes.GET_NOTES_FAILED;
}

export class PostNote {
  static type = ActionTypes.POST_NOTE;

  constructor(public payload: Partial<Note>) {}
}

export class PostNoteSuccess {
  static type = ActionTypes.POST_NOTE_SUCCESS;

  constructor(public payload: Note) {}
}

export class PostNoteFailed {
  static type = ActionTypes.POST_NOTE_FAILED;
}

export class GetNoteById {
  static type = ActionTypes.GET_NOTE_BY_ID;

  constructor(public payload: number) {}
}

export class GetNoteByIdSuccess {
  static type = ActionTypes.GET_NOTE_BY_ID_SUCCESS;

  constructor(public payload: Note) {}
}

export class GetNoteByIdFailed {
  static type = ActionTypes.GET_NOTE_BY_ID_FAILED;
}

export class PatchNoteById {
  static type = ActionTypes.PATCH_NOTE_BY_ID;

  constructor(public payload: Partial<Note>) {}
}

export class PatchNoteByIdSuccess {
  static type = ActionTypes.PATCH_NOTE_BY_ID_SUCCESS;

  constructor(public payload: Note) {}
}

export class PatchNoteByIdFailed {
  static type = ActionTypes.PATCH_NOTE_BY_ID_FAILED;
}

export class DeleteNoteById {
  static type = ActionTypes.DELETE_NOTE_BY_ID;

  constructor(public payload: number) {}
}

export class DeleteNoteByIdSuccess {
  static type = ActionTypes.DELETE_NOTE_BY_ID_SUCCESS;

  constructor(public payload: number, public noteId: number) {}
}

export class DeleteNoteByIdFailed {
  static type = ActionTypes.DELETE_NOTE_BY_ID_FAILED;
}

export class ResetNotesState {
  static type = ActionTypes.RESET_NOTES_STATE;
}
