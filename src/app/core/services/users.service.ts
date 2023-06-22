import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IRequest } from 'ngxs-requests-plugin';

import { UsersGetterState } from '../ngxs/users/users-getter.state';
import { GetAllUsersRequestState, GetUserByIdRequestState } from '../ngxs/users/users.state';
import { GetAllUsers, GetUserById } from '../ngxs/users/users.actions';
import { UserInterface } from '../../shared/interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Select(UsersGetterState.getAllUsers)
  users$!: Observable<UserInterface[]>;

  @Select(GetAllUsersRequestState)
  getAllUsersRequestState$!: Observable<IRequest<UserInterface[]>>;

  @Select(GetUserByIdRequestState)
  getUserByIdRequestState$!: Observable<IRequest<UserInterface>>;

  constructor(
    private store: Store,
  ) {
  }

  getUserById(id: number) {
    this.store.dispatch(new GetUserById(id));
  }

  getUserById$(id: number) {
    return this.store.select(UsersGetterState.getUser(id));
  }

  getAllUsers() {
    this.store.dispatch(new GetAllUsers());
    return this.getAllUsersRequestState$;
  }
}
