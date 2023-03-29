import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../../core/services/notes.service';
import { TopicsService } from '../../core/services/topics.service';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { filter, map, Observable, Subject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../core/interfaces/note';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  topics$ = this.topicsService.topics$;
  currentNote$!: Observable<Note>;
  isEditMode$!: Observable<boolean>;
  submitFormSubject$: Subject<void> = new Subject<void>();

  noteEditorFormGroup = new FormGroup<any>({ // TODO: change any
    id: new FormControl(null),
    topicId: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });

  constructor(
    private notesService: NotesService,
    private topicsService: TopicsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.currentNote$ = this.notesService.getNoteById$(this.activatedRoute.snapshot.params['id']);
    // this.currentNote$.subscribe(note => this.noteEditorFormGroup.patchValue(note));
    this.isEditMode$ = this.activatedRoute.params.pipe(
      map(params => !!parseInt(params['id']))
    );

    this.activatedRoute.params.pipe(
      map(params => params['id']),
      filter(id => id),
      switchMap(id => this.notesService.getNoteById$(id))
    ).subscribe(note => this.noteEditorFormGroup.patchValue(note));

    this.submitFormSubject$.pipe(
      withLatestFrom(this.isEditMode$),
      filter(() => this.noteEditorFormGroup.valid)
    ).subscribe(
      ([_, isEditMode]) => {
        if (isEditMode) {
          this.notesService.patchNote(this.noteEditorFormGroup.value);
        } else {
          this.notesService.postNote(this.noteEditorFormGroup.value);
        }
      }
    );
  }

  // patchNote() {
  //   this.notesService.patchNote(this.noteEditorFormGroup.value);
  // }
  //
  // postNote() {
  //   this.notesService.postNote(this.noteEditorFormGroup.value);
  // }

  submitForm() {
    this.submitFormSubject$.next();
  }

}
