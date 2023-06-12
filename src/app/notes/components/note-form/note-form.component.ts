import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, filter, map, takeUntil, switchMap, withLatestFrom } from 'rxjs';
import { RequestStatus } from 'ngxs-requests-plugin';

import { NotesService } from '../../../core/services/notes.service';
import { TopicsService } from '../../../core/services/topics.service';
import { Note } from '../../../shared/interfaces/note';

interface NoteForm {
  id: FormControl<number | null>,
  topicId: FormControl<number | null>,
  title: FormControl<string | null>,
  text: FormControl<string | null>
}

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit, OnDestroy {
  @Input() noteId!: number;

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
    private notesService: NotesService,
    private topicsService: TopicsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.currentNote$ = this.notesService.getNoteById(this.noteId);

    this.isEditMode$ = this.currentNote$.pipe(
      map(note => note ? !!note.id : false)
    );


    this.patchFormSubject$.pipe(
      takeUntil(this.componentDestroyed$),
      withLatestFrom(this.currentNote$),
    ).subscribe(([_, note]) => {
      this.noteEditorFormGroup.patchValue(note);
    });

    this.submitFormSubject$.pipe(
      takeUntil(this.componentDestroyed$),
      filter(() => {
        return this.noteEditorFormGroup.valid;
      }),
      withLatestFrom(this.isEditMode$),
      switchMap(([_, isEditMode]) => {
        return isEditMode ? this.notesService.patchNote(this.noteEditorFormGroup.value) : this.notesService.postNote(this.noteEditorFormGroup.value);
      }),
    ).subscribe(res => {
      if (res.status === RequestStatus.Success) {
        this.dialog.closeAll();
      }
    });

    this.deleteNoteSubject$.pipe(
      takeUntil(this.componentDestroyed$),
      withLatestFrom(this.currentNote$),
      switchMap(([_, note]) => {
        if (note.id) {
          return this.notesService.deleteNote(note.id);
        }
        return this.notesService.deleteNoteByIdRequestState$;
      })
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
