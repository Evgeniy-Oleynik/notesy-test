import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, Subject, Subscription } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { RequestStatus } from 'ngxs-requests-plugin';
import { NotesService } from '../../../core/services/notes.service';
import { TopicsService } from '../../../core/services/topics.service';

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
  topics$ = this.topicsService.topics$;
  isEditMode$!: Observable<boolean>;
  isFormInvalid!: boolean;
  patchFormSubject$: Subject<void> = new Subject<void>();
  submitFormSubject$: Subject<void> = new Subject<void>();
  deleteNoteSubject$: Subject<void> = new Subject<void>();
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  noteFormSubscriptions: Array<Subscription> = [];

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
    this.noteFormSubscriptions.push(
      this.noteEditorFormGroup.statusChanges.subscribe(() => this.isFormInvalid = !this.noteEditorFormGroup.valid),

      this.patchFormSubject$.pipe(
        withLatestFrom(this.notesService.currentNote$),
      ).subscribe(([_, note]) => {
        this.noteEditorFormGroup.patchValue(note);
      }),

      this.submitFormSubject$.pipe(
        filter(() => {
          console.log('filter 1');
          return this.noteEditorFormGroup.valid;
        }),
        withLatestFrom(this.isEditMode$),
        switchMap(([_, isEditMode]) => {
          console.log('switchMap', isEditMode);
          return isEditMode ? this.notesService.patchNote(this.noteEditorFormGroup.value) : this.notesService.postNote(this.noteEditorFormGroup.value);
          // return isEditMode ? this.notesService.patchNoteByIdRequestState$ : this.notesService.postNoteRequestState$;
        }),
      ).subscribe(res => {
        if (res.status === RequestStatus.Success) {
          this.dialog.closeAll();
        }
      }),

      this.deleteNoteSubject$.pipe(
        withLatestFrom(this.notesService.currentNote$),
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
      }),
    );

    this.patchFormSubject$.next();

    this.isFormInvalid = !this.noteEditorFormGroup.valid;

    this.isEditMode$ = this.notesService.currentNote$.pipe(
      map(note => !!note.id)
    );
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

    this.noteFormSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
