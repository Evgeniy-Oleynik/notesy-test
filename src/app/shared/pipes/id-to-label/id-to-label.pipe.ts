import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'idToLabel'})
export class IdToLabelPipe implements PipeTransform {

  transform<T extends {id?: number}>(id: number, array: T[], label: string ): string {
    return array.find(item => item.id === id)[label]
  }
}
