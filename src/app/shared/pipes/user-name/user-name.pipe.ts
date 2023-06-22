import { Pipe, PipeTransform } from '@angular/core';

import { User } from '../../interfaces/models/user.interface';

@Pipe({name: 'userName'})
export class UserNamePipe implements PipeTransform {

  transform(userId: number, users: User[]): string {
    return users.find(user => user.id === userId).name
  }
}
