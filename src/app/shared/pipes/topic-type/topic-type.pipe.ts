import { Pipe, PipeTransform } from '@angular/core';
import { TopicInterface } from '../../interfaces/models/topic.interface';

@Pipe({name: 'topicType'})
export class TopicTypePipe implements PipeTransform {

  transform(topicId: number, topics: TopicInterface[]): string {
    return topics.find(topic => topic.id === topicId).type
  }
}
