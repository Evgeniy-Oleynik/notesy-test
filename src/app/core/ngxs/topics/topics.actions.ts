import { TopicInterface } from '../../../shared/interfaces/models/topic.interface';

const ActionTypes = {
  GET_TOPICS: '[Topics] Get Topics',
  GET_TOPICS_SUCCESS: '[Topics] Get Topics Success',
  GET_TOPICS_FAILED: '[Topics] Get Topics Failed',

  RESET_TOPICS_STATE: '[Topics] Reset Topics State',
};

export class GetTopics {
  static type = ActionTypes.GET_TOPICS;
}

export class GetTopicsSuccess {
  static type = ActionTypes.GET_TOPICS_SUCCESS;

  constructor(public payload: TopicInterface[]) {
  }
}

export class GetTopicsFailed {
  static type = ActionTypes.GET_TOPICS_FAILED;
}

export class ResetTopicsState {
  static type = ActionTypes.RESET_TOPICS_STATE;
}
