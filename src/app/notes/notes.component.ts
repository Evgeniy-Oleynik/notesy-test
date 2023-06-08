import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { NoteEditDialogComponent } from './note-edit-dialog/note-edit-dialog.component';
import { AuthService } from '../core/services/auth.service';
import { NotesService } from '../core/services/notes.service';
import { TopicsService } from '../core/services/topics.service';
import { Note } from '../shared/interfaces/note';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../shared/interfaces/user';
import { UsersService } from '../core/services/users.service';
import { Topic } from '../shared/interfaces/topic';

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
  selectedRows = new SelectionModel<Note>(true, []);
  notesListLength = 0;
  formGroup?: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notesService: NotesService,
    private topicsService: TopicsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    this.createFormGroup();
  }

  get userIdFormControl() {
    return this.formGroup?.get('userId') as FormControl;
  };

  get topicIdFormControl() {
    return this.formGroup?.get('topicId') as FormControl;
  };

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
    this.topics$ = this.topicsService.topics$;

    this.formGroup?.patchValue(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.queryParams);
    console.log(this.formGroup?.value);

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
    this.notesService.setCurrentNoteId(null);
    this.dialog.open(NoteEditDialogComponent);
  }

  openDialog(note: Note) {
    if (note.id) {
      this.notesService.setCurrentNoteId(note.id);
    }
    this.dialog.open(NoteEditDialogComponent);
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

  private createFormGroup() {
    this.formGroup = new FormGroup({
      userId: new FormControl(null),
      topicId: new FormControl(null),
    });
  }
}
