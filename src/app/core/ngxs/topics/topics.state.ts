import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';
import { RequestsState } from 'ngxs-requests-plugin/lib/requests.state';
import { GetTopics, GetTopicsFailed, GetTopicsSuccess, ShowTopics } from './topics.actions';
import { Topic } from '../../interfaces/topic';
import { createEntitiesIds } from '../../utility/create-entities-ids';

@RequestState('getTopics')
@Injectable()
export class GetTopicsRequestState {
}

export interface TopicsStateModel {
  entities: {[id: number]: Topic}[];
  ids: number[];
}

@State<TopicsStateModel>({
  name: 'topics',
  defaults: {
    entities: [],
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
    ctx.patchState(createEntitiesIds(state, payload, 'id'));
  }
}
