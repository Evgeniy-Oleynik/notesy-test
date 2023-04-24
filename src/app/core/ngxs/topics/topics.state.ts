import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { Topic } from '../../../shared/interfaces/topic';
import { createEntitiesIds } from '../../../shared/utility/create-entities-ids';
import { GetTopics, GetTopicsFailed, GetTopicsSuccess } from './topics.actions';

@RequestState('getTopics')
@Injectable()
export class GetTopicsRequestState {
}

export interface TopicsStateModel {
  entities: {[key: number]: Topic};
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
    }))
  }

  @Action(GetTopicsFailed)
  getTopicsFail() {
    console.log('getTopics failed');
  }

  @Action(GetTopicsSuccess)
  getTopicsSuccess(ctx: StateContext<TopicsStateModel>, {payload}: GetTopicsSuccess) {
    console.log('getTopics success');
    const state = ctx.getState();
    const {ids, entities} = createEntitiesIds(state, payload, 'id');

    ctx.patchState({ids, entities});
  }
}
