import { Pipe, PipeTransform } from '@angular/core';

import { Topic } from '../../interfaces/models/topic.interface';

@Pipe({name: 'topicType'})
export class TopicTypePipe implements PipeTransform {

  transform(topicId: number, topics: Topic[]): string {
    return topics.find(topic => topic.id === topicId).type
  }
}
