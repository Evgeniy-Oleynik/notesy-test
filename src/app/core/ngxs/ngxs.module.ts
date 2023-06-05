import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInUserRequestState, SignUpUserRequestState, AuthState } from './auth/auth.state';
import { environment } from '../../../environments/environment';
import { NgxsRequestsPluginModule } from 'ngxs-requests-plugin';
import { NgxsModule } from '@ngxs/store';
import { GetTopicsRequestState, TopicsState } from './topics/topics.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
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
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      AuthState,
      TopicsState,
      UsersState,
      NotesState,
    ], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRequestsPluginModule.forRoot([
      SignUpUserRequestState,
      LogInUserRequestState,
      GetTopicsRequestState,
      GetAllUsersRequestState,
      GetUserByIdRequestState,
      GetNotesRequestState,
      PostNoteRequestState,
      GetNoteByIdRequestState,
      PatchNoteRequestState,
      DeleteNoteByIdRequestState,
    ]),

  ]
})
export class NgxsStateModule { }
