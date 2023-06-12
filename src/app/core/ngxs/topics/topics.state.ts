import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { Topic } from '../../../shared/interfaces/topic';
import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';

import { GetTopics, GetTopicsFailed, GetTopicsSuccess, ResetTopicsState } from './topics.actions';

@RequestState('getTopics')
@Injectable()
export class GetTopicsRequestState {
}

export interface TopicsStateModel {
  entities: { [key: number]: Topic };
  ids: number[];
}

@State<TopicsStateModel>({
  name: 'topics',
  defaults: {
    entities: {},
    ids: []
  }
})

@Injectable()
export class TopicsState {
  constructor(
    private httpClient: HttpClient,
    private store: Store,
  ) {
  }

  @Action(GetTopics)
  getTopics({dispatch}: StateContext<TopicsStateModel>) {
    const request = this.httpClient.get('api/topics');

    return dispatch(createRequestAction({
      state: GetTopicsRequestState,
      request,
      failAction: GetTopicsFailed,
      successAction: GetTopicsSuccess
    }));
  }

  @Action(GetTopicsFailed)
  getTopicsFail() {
    console.log('getTopics failed');
  }

  @Action(GetTopicsSuccess)
  getTopicsSuccess({getState, patchState}: StateContext<TopicsStateModel>, {payload: topics}: GetTopicsSuccess) {
    console.log('getTopics success');
    const state = getState();
    const {ids, entities} = createEntitiesIds(state, topics);

    patchState({ids, entities});
  }

  @Action(ResetTopicsState)
  resetTopicsState() {
    this.store.reset(TopicsState);
  }
}
