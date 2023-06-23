import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'idToLabel'})
export class IdToLabelPipe implements PipeTransform {

  transform(id: number, arr: any[], label: string ): string {
    return arr.find(item => item.id === id)[label]
  }
}