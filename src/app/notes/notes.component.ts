import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, filter, map, Observable, startWith, Subject, switchMap, take, takeUntil, } from 'rxjs';

import { NotesService } from '../core/services/notes.service';
import { TopicsService } from '../core/services/topics.service';
import { UsersService } from '../core/services/users.service';
import { NoteInterface } from '../shared/interfaces/models/note.interface';
import { UserInterface } from '../shared/interfaces/models/user.interface';
import { TopicInterface } from '../shared/interfaces/models/topic.interface';

import { NoteEditDialogComponent } from './note-edit-dialog/note-edit-dialog.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable) table: MatTable<any>;

  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  notesList$: Observable<MatTableDataSource<NoteInterface>>;
  users$: Observable<UserInterface[]>;
  topics$: Observable<TopicInterface[]>;
  notes$ = this.notesService.notes$;
  tableColumnsList = ['topic', 'title', 'author', 'updated', 'created'];
  formGroup: FormGroup<{userId: FormControl<number>, topicId: FormControl<number>}>;
  searchFormControl = new FormControl('');
  searchFormControlValue$: Observable<string>;

  constructor(
    private router: Router,
    private notesService: NotesService,
    private topicsService: TopicsService,
    private usersService: UsersService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
  }

  get userIdFormControl() {
    return this.formGroup.controls.userId;
  };

  get topicIdFormControl() {
    return this.formGroup.controls.topicId;
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
    });

    this.formGroup?.valueChanges.pipe(
      switchMap((formData: { userId: number, topicId: number }) => {
        const {userId, topicId} = formData;
        return this.notesService.getNotes({
            ...(!!userId ? {userId} : {}),
            ...(!!topicId ? {topicId} : {}),
          }
        ).pipe(
          filter(res => res.loaded && !res.loading),
          map(() => formData),
          takeUntil(this.componentDestroyed$)
        );
      }),
    ).subscribe(formData => this.addQueryParams(formData));

    this.searchFormControlValue$ = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map(value => value)
    );

    this.notesList$ = combineLatest([this.notes$, this.searchFormControlValue$]).pipe(
      map(([notes, search]) => {
        const notesList = new MatTableDataSource(notes);
        notesList.filter = search.trim().toLowerCase();
        return notesList;
      })
    )
  }

  newNote() {
    this.dialog.open(NoteEditDialogComponent);
  }

  openDialog(note: NoteInterface) {
    this.dialog.open(NoteEditDialogComponent, {data: note.id});
  }

  addQueryParams(params?: Params) {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {...params},
    });
  }

  clearSearch() {
    this.searchFormControl.reset()
  }

  private createFormGroup(userId: number | null, topicId: number | null) {
    this.formGroup = new FormGroup({
      userId: new FormControl(userId),
      topicId: new FormControl(topicId),
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
