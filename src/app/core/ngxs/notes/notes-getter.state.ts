import { createSelector, Selector } from '@ngxs/store';

import { IdToLabelPipe } from '../../../shared/pipes/id-to-label/id-to-label.pipe';
import { TopicsState, TopicsStateModel } from '../topics/topics.state';
import { UsersState, UsersStateModel } from '../users/users.state';

import { NotesState, NotesStateModel } from './notes.state';

export class NotesGetterState {
  @Selector([NotesState, TopicsState, UsersState])
  static getNotes(notesState: NotesStateModel, topicsState: TopicsStateModel, usersState: UsersStateModel) {
    const notes = notesState.ids.map(id => {
      return notesState.entities[id];
    }).sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1);
    const topics = topicsState.ids.map(id => topicsState.entities[id]);
    const users = usersState.ids.map(id => usersState.entities[id]);
    return notes.map(note => {
      note = {
        ...note,
        topicType: IdToLabelPipe.prototype.transform(note.topicId, topics, 'type'),
        userName: IdToLabelPipe.prototype.transform(note.userId, users, 'name')
      };
      return note;
    });
  }

  static getNoteById(noteId: number) {
    return createSelector([NotesState], (notesState: NotesStateModel) => {
      return notesState.entities[noteId];
    })
  }
}
