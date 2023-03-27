import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { TopicsGetterState } from '../ngxs/topics/topics-getter.state';
import { GetTopicsRequestState } from '../ngxs/topics/topics.state';
import { Topic } from '../interfaces/topic';
import { GetTopics } from '../ngxs/topics/topics.actions';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(
    private store: Store,
  ) { }

  @Select(TopicsGetterState.getTopics)
  topics$!: Observable<Topic[]>;

  @Select(GetTopicsRequestState)
  getTopicsRequestState$!: Observable<IRequest<Topic[]>>;

  getAllTopics() {
    this.store.dispatch(new GetTopics());
  }

}
