import { Pipe, PipeTransform } from '@angular/core';

import { Topic } from '../../interfaces/models/topic.interface';

@Pipe({name: 'idToLabel'})
export class IdToLabelPipe implements PipeTransform {

  transform(id: number, arr: any[], label: string ): string {
    return arr.find(item => item.id === id)[label]
  }
}
