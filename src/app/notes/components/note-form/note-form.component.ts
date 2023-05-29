import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable, Subject, tap } from 'rxjs';
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
export class NoteFormComponent implements OnInit {
  @Input() currentNote$?: Observable<Note>;
  @Input() dialogId!: number;

  currentNoteId!: number;
  isEditMode$!: Observable<boolean>;
  isFormInvalid!: boolean;
  submitFormSubject$: Subject<void> = new Subject<void>();
  topics$ = this.topicsService.topics$;


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
    this.currentNote$ = this.notesService.getNoteById$(this.activatedRoute.snapshot.params['id']);
    this.activatedRoute.params.pipe(
      map(params => params['id']),
      filter(id => id),
      switchMap(id => this.notesService.getNoteById$(id))
    ).subscribe(note => this.noteEditorFormGroup.patchValue(note));

    this.isFormInvalid = !this.noteEditorFormGroup.valid;
    this.noteEditorFormGroup.statusChanges.subscribe(() => this.isFormInvalid = !this.noteEditorFormGroup.valid);

    this.isEditMode$ = this.currentNote$.pipe(
      map(note => {
        if (note?.id) {
          this.currentNoteId = note.id;
        }
        return !!this.currentNoteId;
      })
    );

    this.submitFormSubject$.pipe(
      withLatestFrom(this.isEditMode$),
      filter(() => this.noteEditorFormGroup.valid)
    ).subscribe(
      ([_, isEditMode]) => {
        console.log(this.noteEditorFormGroup.value);
        if (isEditMode) {
          this.notesService.patchNote(this.noteEditorFormGroup.value);
        } else {
          this.notesService.postNote(this.noteEditorFormGroup.value);
        }
      }
    );
  }

  submitForm() {
    this.submitFormSubject$.next();
    this.notesService.postNoteRequestState$.pipe(
      tap(res => {
        if (res.status === RequestStatus.Success) {
          if (this.dialogId) {
            this.dialog.closeAll();
          } else {
            this.router.navigate(['notes']);
          }
        }
      }),
      filter(res => res.loaded),
      take(1)
    ).subscribe();
  }

  deleteNote() {
    this.notesService.deleteNote(this.currentNoteId);
    this.notesService.deleteNoteByIdRequestState$.pipe(
      tap(res => {
        if (res.status === 'success') {
          if (this.dialogId) {
            this.dialog.closeAll();
          } else {
            this.router.navigate(['notes']);
          }
        }
      }),
      filter(res => res.loaded),
      take(1)
    ).subscribe()
  }
}
