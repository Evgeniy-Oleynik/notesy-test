import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { GetTopics } from '../core/ngxs/topics/topics.actions';
import { Store } from '@ngxs/store';
import { GetAllUsers } from '../core/ngxs/users/users.actions';
import { UsersService } from '../core/services/users.service';
import { Observable } from 'rxjs';
import { User } from '../core/interfaces/user';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../core/services/notes.service';
import { GetNotes } from '../core/ngxs/notes/notes.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser$ = this.authService.currentUser$;
  userById$!: Observable<User>;
  notes$ = this.notesService.notes$;

  idFormControl = new FormControl(1);

  constructor(
    private authService: AuthService,
    private store: Store,
    private usersService: UsersService,
    private router: Router,
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOutUser();
  }

  newNote() {
    this.router.navigate(['/notes']);
  }

  getNotes() {
    this.store.dispatch(new GetNotes({userId: 56, topicId: 1}));
  }

  getUsers() {
    this.store.dispatch(new GetAllUsers());
  }

  getUserById() {
    this.usersService.getUserById(this.idFormControl.value as number);
    this.userById$ = this.usersService.getUserById$(this.idFormControl.value as number);
  }
}
