import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';
import { UsersGetterState } from '../ngxs/users/users-getter.state';
import { GetAllUsersRequestState, GetUserByIdRequestState } from '../ngxs/users/users.state';
import { GetAllUsers, GetUserById } from '../ngxs/users/users.actions';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private store: Store,
  ) { }

  @Select(UsersGetterState.getAllUsers)
  users$!: Observable<User[]>;

  @Select(GetAllUsersRequestState)
  getAllUsersRequestState$!: Observable<IRequest<User[]>>;

  @Select(GetUserByIdRequestState)
  getUserByIdRequestState$!: Observable<IRequest<User>>;

  getUserById(id: number) {
    this.store.dispatch(new GetUserById(id))
  }

  getUserById$(id: number) {
    return this.store.select(UsersGetterState.getUser(id));
  }

  getAllUsers() {
    this.store.dispatch(new GetAllUsers())
  }
}
