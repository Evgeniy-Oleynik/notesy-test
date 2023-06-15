import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, startWith, Subject, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';

import { Note } from '../../shared/interfaces/note';
import { NotesService } from '../../core/services/notes.service';
import { TopicsService } from '../../core/services/topics.service';

interface NoteForm {
  id: FormControl<number | null>,
  topicId: FormControl<number | null>,
  title: FormControl<string | null>,
  text: FormControl<string | null>
}

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.scss']
})

export class NoteEditDialogComponent implements OnInit, OnDestroy {
  noteId: number;
  noteTextarea: Element;
  topics$ = this.topicsService.topics$;
  currentNote$!: Observable<Note>;
  isEditMode$!: Observable<boolean>;
  isNoChanges$!: Observable<boolean>;
  patchFormSubject$: Subject<void> = new Subject<void>();
  submitFormSubject$: Subject<void> = new Subject<void>();
  deleteNoteSubject$: Subject<void> = new Subject<void>();
  resizeTextareaSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  noteEditorFormGroup = new FormGroup<NoteForm>({
    id: new FormControl(null),
    topicId: new FormControl(null, [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250),
    ]),
  });

  get topicId() {
    return this.noteEditorFormGroup.get('topicId') as FormControl;
  }

  get title() {
    return this.noteEditorFormGroup.get('title') as FormControl;
  }

  get text() {
    return this.noteEditorFormGroup.get('text') as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private notesService: NotesService,
    private topicsService: TopicsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.noteId = data;
  }

  ngOnInit() {
    this.currentNote$ = this.notesService.getNoteById(this.noteId);

    this.isEditMode$ = this.currentNote$.pipe(
      map(note => !!note?.id)
    );

    this.isNoChanges$ = this.noteEditorFormGroup.valueChanges.pipe(
      startWith(1),
      withLatestFrom(this.currentNote$),
      map(([_, curNote]) => {
        return curNote.topicId === this.noteEditorFormGroup.value.topicId &&
          curNote.title === this.noteEditorFormGroup.value.title &&
          curNote.text === this.noteEditorFormGroup.value.text
      }),
    );

    this.noteTextarea = document.querySelector(".textarea-autosize");
    this.noteTextarea.addEventListener("keyup", (e) => {
      if (e['key'] === 'Enter') this.resizeTextareaSubject$.next();
    });

    this.resizeTextareaSubject$.pipe(
      withLatestFrom(this.noteEditorFormGroup.get('text').valueChanges),
      takeUntil(this.componentDestroyed$)
    ).subscribe(([_, text]) => {
      let numberOfLines = text.match(/\n/g)?.length;
      this.noteTextarea['style'].height = (20 + numberOfLines * 16) + 'px';
    });

    this.patchFormSubject$.pipe(
      withLatestFrom(this.currentNote$),
      takeUntil(this.componentDestroyed$),
    ).subscribe(([_, note]) => {
      this.noteEditorFormGroup.patchValue(note);
      this.resizeTextareaSubject$.next();
    });

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

    this.patchFormSubject$.next();
  }

  submitForm() {
    console.log('submit form triggered');
    this.submitFormSubject$.next();
  }

  deleteNote() {
    this.deleteNoteSubject$.next();
  }

  cancelChanges() {
    this.patchFormSubject$.next();
  }

  resetForm() {
    this.noteEditorFormGroup.reset();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
