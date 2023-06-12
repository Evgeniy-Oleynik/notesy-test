import { Selector } from '@ngxs/store';

import { TopicsState, TopicsStateModel } from './topics.state';

export class TopicsGetterState {
  @Selector([TopicsState])
  static getTopics(state: TopicsStateModel) {
    return state.ids.map(id => state.entities[id]);
  }
}
