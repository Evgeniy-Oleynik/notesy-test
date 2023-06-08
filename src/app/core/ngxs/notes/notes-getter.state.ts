import { Selector } from '@ngxs/store';
import { NotesState, NotesStateModel } from './notes.state';
import { TopicsState, TopicsStateModel } from '../topics/topics.state';
import { AuthState, AuthStateModel } from '../auth/auth.state';
import { UsersState, UsersStateModel } from '../users/users.state';

export class NotesGetterState {
  @Selector([NotesState, TopicsState, UsersState])
  static getNotes(notesState: NotesStateModel, topicsState: TopicsStateModel, usersState: UsersStateModel) {
    const notes = notesState.ids.map(id => {
      return notesState.entities[id]
    }).sort((a,b) => a.id && b.id ? a.id - b.id : -1);
    const topics = topicsState.ids.map(id => topicsState.entities[id]);
    const users = usersState.ids.map(id => usersState.entities[id]);
    return notes.map(note => {
      if (note.topicId) {
        note = {
          ...note, topicType: topics.find(topic => topic.id === note.topicId)?.type
        };
      }
      if (note.userId) {
        note = {
          ...note, userName: users.find(user => user.id === note.userId)?.name
        };
      }
      return note;
    })
  }

  @Selector([NotesState])
  static getCurrentNote(notesState: NotesStateModel) {
    return notesState.entities[notesState.currentNoteId as number];
  }

  @Selector([NotesState, TopicsState, UsersState, AuthState])
  static getUserNotes(notesState: NotesStateModel, topicsState: TopicsStateModel, usersState: UsersStateModel, authState: AuthStateModel) {
    return this.getNotes(notesState, topicsState, usersState).filter(note => note.userId === authState.user.id)
  }
}
