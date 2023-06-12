import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, filter, map, take, shareReplay, switchMap } from 'rxjs';

import { NotesService } from '../core/services/notes.service';
import { TopicsService } from '../core/services/topics.service';
import { UsersService } from '../core/services/users.service';
import { Note } from '../shared/interfaces/note';
import { User } from '../shared/interfaces/user';
import { Topic } from '../shared/interfaces/topic';

import { NoteEditDialogComponent } from './note-edit-dialog/note-edit-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @ViewChild(MatTable) table?: MatTable<any>;

  selectAllNotes$ = new Subject<void>();

  notesList$!: Observable<MatTableDataSource<Note>>;
  users$?: Observable<User[]>;
  topics$?: Observable<Topic[]>;

  notes$ = this.notesService.notes$;
  tableColumnsList = ['marker', 'topic', 'title', 'author'];
  newNoteRow = ['createNewNote'];
  selectedRows = new SelectionModel<Note>(true, []);
  notesListLength = 0;
  formGroup?: FormGroup;

  constructor(
    private router: Router,
    private notesService: NotesService,
    private topicsService: TopicsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  get userIdFormControl() {
    return this.formGroup?.get('userId') as FormControl;
  };

  get topicIdFormControl() {
    return this.formGroup?.get('topicId') as FormControl;
  };

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
    this.topics$ = this.topicsService.topics$;

    this.route.queryParams.pipe(
      take(1)
    ).subscribe(params => {
      const userId = parseInt(params['userId']) || null;
      const topicId = parseInt(params['topicId']) || null;
      this.createFormGroup(userId, topicId);
    })

    this.formGroup?.valueChanges.pipe(
      switchMap((formData: {userId: number, topicId: number}) => {
        const {userId, topicId} = formData;

        return this.notesService.getNotes({
            ...(!!userId ? {userId} : {}),
            ...(!!topicId ? {topicId} : {}),
          }
        ).pipe(
          filter(res => res.loaded && !res.loading)
        );
      }),
    ).subscribe(() => this.addQueryParams(this.formGroup?.value));

    this.notesList$ = this.notes$.pipe(
      map(notes => {
        return new MatTableDataSource<Note>(notes);
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );
  }

  newNote() {
    this.dialog.open(NoteEditDialogComponent, {data: null});
  }

  openDialog(note: Note) {
    this.dialog.open(NoteEditDialogComponent, {data: note.id});
    console.log('current note:', note);
  }

  showSelected() {
    console.log(this.selectedRows.selected);
  }

  addQueryParams(params?: Params) {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {...params},
    });
  }

  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    return numSelected >= this.notesListLength;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }
    this.selectAllNotes$.next();
  }

  private createFormGroup(userId: number | null, topicId: number | null) {
    this.formGroup = new FormGroup({
      userId: new FormControl(userId),
      topicId: new FormControl(topicId),
    });
  }
}
