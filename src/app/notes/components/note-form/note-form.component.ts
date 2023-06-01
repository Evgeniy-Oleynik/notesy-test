import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';
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
  @Input() currentNote?: Note;
  @Input() dialogId!: number;

  currentNote$ = this.notesService.currentNote$;
  topics$ = this.topicsService.topics$;
  currentNoteId!: number;
  isEditMode$!: Observable<boolean>;
  isFormInvalid!: boolean;
  isDialogOpenedSubject: Subject<boolean> = new Subject<boolean>();
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
    if (this.currentNote) this.noteEditorFormGroup.patchValue(this.currentNote)
    else this.activatedRoute.params.pipe(
      map(params => params['id']),
      filter(id => id),
      switchMap(id => this.notesService.getNoteById$(id))
    ).subscribe(note => {
      this.noteEditorFormGroup.patchValue(note)
    });

    this.notesService.currentNote$.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(note => console.log(note));
    this.isDialogOpenedSubject.subscribe();
    this.dialog.afterOpened.subscribe(() => this.isDialogOpenedSubject.next(true));
    this.dialog.afterAllClosed.subscribe(() => this.isDialogOpenedSubject.next(false));

    this.isFormInvalid = !this.noteEditorFormGroup.valid;
    this.noteEditorFormGroup.statusChanges.subscribe(() => this.isFormInvalid = !this.noteEditorFormGroup.valid);

    this.isEditMode$ = this.notesService.currentNote$.pipe(
      map(note => {
        if (note?.id) {
          this.currentNoteId = note.id;
        }
        return !!this.currentNoteId;
      })
    );

    this.submitFormSubject$.pipe(
      withLatestFrom(this.isEditMode$),
      filter(() => this.noteEditorFormGroup.valid),
    ).subscribe(
      ([_, isEditMode]) => {
        console.log('submit value:', this.noteEditorFormGroup.value);
        if (isEditMode) {
          this.notesService.patchNote(this.noteEditorFormGroup.value);
        } else {
          this.notesService.postNote(this.noteEditorFormGroup.value);
        }
      }
    );

    this.deleteNoteSubject$.pipe(
      withLatestFrom(this.currentNote$),
    ).subscribe(([_,note]) => {
      if (note.id) this.notesService.deleteNote(note.id);
    })
  }

  submitForm() {
    this.submitFormSubject$.next();
    this.notesService.patchNoteByIdRequestState$.pipe(
      filter(res => {
        console.log(res);
        return res.loaded
      }),
      withLatestFrom(this.isDialogOpenedSubject),
      map(([res, isDialogOpened]) => {
        console.log(res);
        if (res.status === RequestStatus.Success) {
          isDialogOpened ? this.dialog.closeAll() : this.router.navigate(['notes']);
        }
      }),
    ).subscribe();
  }

  deleteNote() {
    this.notesService.deleteNoteByIdRequestState$.pipe(
      filter(res => res.loaded),
      withLatestFrom(this.isDialogOpenedSubject),
      map(([res, isDialogOpened]) => {
        if (res.status === 'success') {
          isDialogOpened ? this.dialog.closeAll() : this.router.navigate(['notes']);
        }
      }),
    ).subscribe()
    this.deleteNoteSubject$.next();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
