import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { first, map, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { IRequest } from 'ngxs-requests-plugin';
import { UsersGetterState } from '../ngxs/users/users-getter.state';
import { GetAllUsersRequestState, GetUserByIdRequestState } from '../ngxs/users/users.state';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GetUserById, GetUserByIdSuccess } from '../ngxs/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private store: Store,
    private httpClient: HttpClient,
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

}
