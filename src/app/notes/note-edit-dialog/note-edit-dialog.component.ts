import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, Observable, startWith, Subject, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';
import _ from 'lodash';

import { Note } from '../../shared/interfaces/note';
import { NotesService } from '../../core/services/notes.service';
import { TopicsService } from '../../core/services/topics.service';
import { AuthService } from '../../core/services/auth.service';

interface NoteForm {
  id: FormControl<number>,
  topicId: FormControl<number>,
  title: FormControl<string>,
  text: FormControl<string>
}

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.scss']
})

export class NoteEditDialogComponent implements OnInit, OnDestroy {
  topics$ = this.topicsService.topics$;
  currentNote$: Observable<Note>;
  isEditMode$: Observable<boolean>;
  isEqual$: Observable<boolean>;
  isOwner$: Observable<boolean>;
  submitFormSubject$: Subject<void> = new Subject<void>();
  deleteNoteSubject$: Subject<void> = new Subject<void>();
  cancelChangesSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  titleMaxLength = 50;
  textMaxLength = 250;

  noteEditorFormGroup = new FormGroup<NoteForm>({
    id: new FormControl(null),
    topicId: new FormControl(null, [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(this.titleMaxLength),
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(this.textMaxLength),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public noteId: number,
    private authService: AuthService,
    private notesService: NotesService,
    private topicsService: TopicsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  get topicIdFormControl() {
    return this.noteEditorFormGroup.get('topicId') as FormControl;
  }

  get titleFormControl() {
    return this.noteEditorFormGroup.get('title') as FormControl;
  }

  get textFormControl() {
    return this.noteEditorFormGroup.get('text') as FormControl;
  }

  ngOnInit() {
    this.currentNote$ = this.notesService.getNoteById(this.noteId);

    this.currentNote$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(note => this.noteEditorFormGroup.patchValue(note));

    this.isOwner$ = this.currentNote$.pipe(
      withLatestFrom(this.authService.currentUser$),
      map(([note, user]) => note.userId === user.id)
    );

    this.isOwner$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(isOwner =>{
      if (!isOwner) this.snackBar.open('This Note is not yours. View only allowed.', 'OK', {duration: 5000});
    })

    this.isEditMode$ = this.currentNote$.pipe(
      map(note => !!note?.id)
    );

    this.isEqual$ = this.noteEditorFormGroup.valueChanges.pipe(
      startWith(this.noteEditorFormGroup.value),
      withLatestFrom(this.currentNote$),
      map(([v, currentNote]) => {
        const {updatedAt, createdAt, topicType, userId, userName, ...note} = currentNote;
        return _.isEqual(this.noteEditorFormGroup.value, note);
      }),
    );

    this.submitFormSubject$.pipe(
      filter(() => {
        return this.noteEditorFormGroup.valid;
      }),
      withLatestFrom(this.isEditMode$),
      switchMap(([_, isEditMode]) => {
        const formValue = this.noteEditorFormGroup.value;
        return isEditMode ? this.notesService.patchNote(formValue) : this.notesService.postNote(formValue);
      }),
      takeUntil(this.componentDestroyed$),
    ).subscribe(res => {
      if (res.status === RequestStatus.Success) {
        this.dialog.closeAll();
      }
    });

    this.deleteNoteSubject$.pipe(
      withLatestFrom(this.currentNote$),
      switchMap(([_, note]) => this.notesService.deleteNote(note.id)),
      takeUntil(this.componentDestroyed$),
    ).subscribe(res => {
      if (res.status === RequestStatus.Success) {
        this.dialog.closeAll();
      }
    });

    this.cancelChangesSubject$.pipe(
      withLatestFrom(this.currentNote$),
      takeUntil(this.componentDestroyed$)
    ).subscribe(([_, note]) => this.noteEditorFormGroup.patchValue(note));
  }

  submitForm() {
    console.log('submit form triggered');
    this.submitFormSubject$.next();
  }

  deleteNote() {
    this.deleteNoteSubject$.next();
  }

  cancelChanges() {
    this.cancelChangesSubject$.next();
  }

  resetForm() {
    this.noteEditorFormGroup.reset();
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
