import { NoteInterface } from '../../../shared/interfaces/models/note.interface';

const ActionTypes = {
  GET_NOTES: '[Notes] Get All Notes',
  GET_NOTES_SUCCESS: '[Notes] Get All Notes Success',
  GET_NOTES_FAILED: '[Notes] Get All Notes Failed',

  GET_NOTE_BY_ID: '[Notes] Get NoteInterface By ID',
  GET_NOTE_BY_ID_SUCCESS: '[Notes] Get NoteInterface By ID Success',
  GET_NOTE_BY_ID_FAILED: '[Notes] Get NoteInterface By ID Failed',

  POST_NOTE: '[Notes] Post NoteInterface',
  POST_NOTE_SUCCESS: '[Notes] Post NoteInterface Success',
  POST_NOTE_FAILED: '[Notes] Post NoteInterface Failed',

  PATCH_NOTE: '[Notes] Patch NoteInterface By ID',
  PATCH_NOTE_SUCCESS: '[Notes] Patch NoteInterface By ID Success',
  PATCH_NOTE_FAILED: '[Notes] Patch NoteInterface By ID Failed',

  DELETE_NOTE_BY_ID: '[Notes] Delete NoteInterface By ID',
  DELETE_NOTE_BY_ID_SUCCESS: '[Notes] Delete NoteInterface By ID Success',
  DELETE_NOTE_BY_ID_FAILED: '[Notes] Delete NoteInterface By ID Failed',

  RESET_NOTES_STATE: '[Notes] Reset Notes State'
};

export class GetNotes {
  static type = ActionTypes.GET_NOTES;

  constructor(public payload: { userId?: number, topicId?: number }) {
  }
}

export class GetNotesSuccess {
  static type = ActionTypes.GET_NOTES_SUCCESS;

  constructor(public payload: NoteInterface[]) {
  }
}

export class GetNotesFailed {
  static type = ActionTypes.GET_NOTES_FAILED;
}

export class GetNoteById {
  static type = ActionTypes.GET_NOTE_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetNoteByIdSuccess {
  static type = ActionTypes.GET_NOTE_BY_ID_SUCCESS;

  constructor(public payload: NoteInterface) {
  }
}

export class GetNoteByIdFailed {
  static type = ActionTypes.GET_NOTE_BY_ID_FAILED;
}

export class PostNote {
  static type = ActionTypes.POST_NOTE;

  constructor(public payload: Partial<NoteInterface>) {
  }
}

export class PostNoteSuccess {
  static type = ActionTypes.POST_NOTE_SUCCESS;

  constructor(public payload: NoteInterface) {
  }
}

export class PostNoteFailed {
  static type = ActionTypes.POST_NOTE_FAILED;
}

export class PatchNote {
  static type = ActionTypes.PATCH_NOTE;

  constructor(public payload: Partial<NoteInterface>) {
  }
}

export class PatchNoteSuccess {
  static type = ActionTypes.PATCH_NOTE_SUCCESS;

  constructor(public payload: NoteInterface) {
  }
}

export class PatchNoteFailed {
  static type = ActionTypes.PATCH_NOTE_FAILED;
}

export class DeleteNoteById {
  static type = ActionTypes.DELETE_NOTE_BY_ID;

  constructor(public payload: number) {
  }
}

export class DeleteNoteByIdSuccess {
  static type = ActionTypes.DELETE_NOTE_BY_ID_SUCCESS;

  constructor(public payload: number, public noteId: number) {
  }
}

export class DeleteNoteByIdFailed {
  static type = ActionTypes.DELETE_NOTE_BY_ID_FAILED;
}

export class ResetNotesState {
  static type = ActionTypes.RESET_NOTES_STATE;
}
