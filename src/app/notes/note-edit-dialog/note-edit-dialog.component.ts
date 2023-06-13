import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, Subject, switchMap, takeUntil, withLatestFrom } from 'rxjs';
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
  topics$ = this.topicsService.topics$;
  currentNote$!: Observable<Note>;
  isEditMode$!: Observable<boolean>;
  patchFormSubject$: Subject<void> = new Subject<void>();
  submitFormSubject$: Subject<void> = new Subject<void>();
  deleteNoteSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  noteEditorFormGroup = new FormGroup<NoteForm>({
    id: new FormControl(null),
    topicId: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

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
      map(note => !!note.id)
    );

    this.patchFormSubject$.pipe(
      withLatestFrom(this.currentNote$),
      takeUntil(this.componentDestroyed$),
    ).subscribe(([_, note]) => {
      this.noteEditorFormGroup.patchValue(note);
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

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
