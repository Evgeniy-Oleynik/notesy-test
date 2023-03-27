import { createSelector, Selector } from '@ngxs/store';
import { NotesState, NotesStateModel } from './notes.state';

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
}
