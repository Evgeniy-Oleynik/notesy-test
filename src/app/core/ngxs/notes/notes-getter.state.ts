import { createSelector, Selector } from '@ngxs/store';
import { NotesState, NotesStateModel } from './notes.state';
import { TopicsState, TopicsStateModel } from '../topics/topics.state';

export class NotesGetterState {
  @Selector([NotesState, TopicsState])
  static getNotes(notesState: NotesStateModel, topicsState: TopicsStateModel) {
    const notes = notesState.ids.map(id => {
      return notesState.entities[id]
    }).sort((a,b) => a.id && b.id ? a.id - b.id : -1);
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

  // @Selector([NotesState])
  // static getNotes(state: NotesStateModel) {
  //   return state.ids.map(id => state.entities[id]);
  // }

  static getNote(id: number) {
    return createSelector([NotesState], (state: NotesStateModel) => {
      return state.entities[id];
    })
  }


}
