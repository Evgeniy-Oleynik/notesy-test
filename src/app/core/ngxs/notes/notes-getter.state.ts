import { createSelector, Selector } from '@ngxs/store';
import { NotesState, NotesStateModel } from './notes.state';
import { TopicsState, TopicsStateModel } from '../topics/topics.state';

export class NotesGetterState {
  @Selector([NotesState])
  static getNotes(state: NotesStateModel) {
    return state.ids.map(id => state.entities[id]);
  }

  static getNote(id: number) {
    return createSelector([NotesState], (state: NotesStateModel) => {
      return state.entities[id];
    })
  }

  @Selector([NotesState, TopicsState])
  static getNotesWithTopics(notesState: NotesStateModel, topicsState: TopicsStateModel) {
    const notes = this.getNotes(notesState);
    const topics = topicsState.ids.map(id => topicsState.entities[id]);
    return notes.map(note => {
      if (note.topicId) {
        note = {
          ...note, topicType: topics.find(topic => topic.id === note.topicId)?.type
        };
      }
      return note;
    })
  }
}
