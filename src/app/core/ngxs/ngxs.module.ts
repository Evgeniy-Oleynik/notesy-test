import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRequestsPluginModule } from 'ngxs-requests-plugin';

import { environment } from '../../../environments/environment';

import {
  AuthState,
  GetUserByTokenRequestState,
  LogInUserRequestState,
  LogOutUserRequestState,
  SignUpUserRequestState
} from './auth/auth.state';
import { GetTopicsRequestState, TopicsState } from './topics/topics.state';
import { GetAllUsersRequestState, GetUserByIdRequestState, UsersState } from './users/users.state';
import {
  DeleteNoteByIdRequestState,
  GetNoteByIdRequestState,
  GetNotesRequestState,
  NotesState,
  PatchNoteRequestState,
  PostNoteRequestState
} from './notes/notes.state';


@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      AuthState,
      NotesState,
      TopicsState,
      UsersState,
    ], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRequestsPluginModule.forRoot([
      DeleteNoteByIdRequestState,
      GetAllUsersRequestState,
      GetNoteByIdRequestState,
      GetNotesRequestState,
      GetTopicsRequestState,
      GetUserByIdRequestState,
      GetUserByTokenRequestState,
      LogInUserRequestState,
      LogOutUserRequestState,
      PatchNoteRequestState,
      PostNoteRequestState,
      SignUpUserRequestState,
    ]),

  ]
})
export class NgxsStateModule {
}
