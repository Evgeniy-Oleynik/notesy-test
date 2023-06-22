import { Pipe, PipeTransform } from '@angular/core';
import { UserInterface } from '../../interfaces/models/user.interface';

@Pipe({name: 'userName'})
export class UserNamePipe implements PipeTransform {

  transform(userId: number, users: UserInterface[]): string {
    return users.find(user => user.id === userId).name
  }
}
