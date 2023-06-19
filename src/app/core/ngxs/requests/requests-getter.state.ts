import { Selector } from '@ngxs/store';
import { IRequest } from 'ngxs-requests-plugin';

import { GetUserByTokenRequestState, LogOutUserRequestState } from '../auth/auth.state';
import { DeleteNoteByIdRequestState, GetNotesRequestState, PatchNoteRequestState, PostNoteRequestState } from '../notes/notes.state';
import { GetTopicsRequestState } from '../topics/topics.state';
import { GetAllUsersRequestState } from '../users/users.state';

export class RequestsGetterState {
  @Selector([
    GetNotesRequestState,
    GetTopicsRequestState,
    GetAllUsersRequestState,
    GetUserByTokenRequestState,
    PatchNoteRequestState,
    PostNoteRequestState,
    DeleteNoteByIdRequestState,
    LogOutUserRequestState,
  ])
  static getIsLoadingRequest(request: IRequest) {
    console.log(111, request.loading);
    return request.loading;
  }
}
