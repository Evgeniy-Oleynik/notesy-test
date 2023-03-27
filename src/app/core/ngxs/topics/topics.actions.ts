const ActionTypes = {
  GET_TOPICS: '[Topics] Get Topics',
  GET_TOPICS_SUCCESS: '[Topics] Get Topics Success',
  GET_TOPICS_FAILED: '[Topics] Get Topics Failed',
  SHOW_TOPICS: '[Topics] Show Topics'
}

export class GetTopics {
  static type = ActionTypes.GET_TOPICS;
}

export class GetTopicsSuccess {
  static type = ActionTypes.GET_TOPICS_SUCCESS

  constructor(public payload: {id: number, type: string}[]) {}
}

export class GetTopicsFailed {
  static type = ActionTypes.GET_TOPICS_FAILED
}

export class ShowTopics {
  static type = ActionTypes.SHOW_TOPICS
}

