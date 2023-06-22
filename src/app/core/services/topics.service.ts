import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { TopicsGetterState } from '../ngxs/topics/topics-getter.state';
import { GetTopicsRequestState } from '../ngxs/topics/topics.state';
import { GetTopics } from '../ngxs/topics/topics.actions';
import { TopicInterface } from '../../shared/interfaces/models/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  @Select(TopicsGetterState.getTopics)
  topics$!: Observable<TopicInterface[]>;
  @Select(GetTopicsRequestState)
  getTopicsRequestState$!: Observable<IRequest<TopicInterface[]>>;

  constructor(
    private store: Store,
  ) {
  }

  getAllTopics() {
    this.store.dispatch(new GetTopics());
    return this.getTopicsRequestState$;
  }

}
