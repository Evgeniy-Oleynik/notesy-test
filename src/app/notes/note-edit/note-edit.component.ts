import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, Observable, Subject, tap } from 'rxjs';
import { switchMap, take, withLatestFrom } from 'rxjs/operators';
import { NotesService } from '../../core/services/notes.service';
import { TopicsService } from '../../core/services/topics.service';
import { AuthService } from '../../core/services/auth.service';
import { Note } from '../../core/interfaces/note';

interface NoteForm {
  id: FormControl<number | null>,
  topicId: FormControl<number | null>,
  title: FormControl<string | null>,
  text: FormControl<string | null>
}

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

  noteEditorFormGroup = new FormGroup<NoteForm>({
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
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.currentNote$ = this.notesService.getNoteById$(this.activatedRoute.snapshot.params['id']);
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

  submitForm() {
    this.submitFormSubject$.next();
    this.notesService.postNoteRequestState$.pipe(
      tap(res => {
        if (res.status === 'success') {
          this.router.navigate(['notes']);
        }
      }),
      filter(res => res.loaded),
      take(1)
    ).subscribe();
  }

  deleteNote() {
    this.notesService.deleteNote(this.activatedRoute.snapshot.params['id']);
    this.notesService.deleteNoteByIdRequestState$.pipe(
      tap(res => {
        if (res.status === 'success') {
          this.router.navigate(['notes']);
        }
      }),
      filter(res => res.loaded),
      take(1)
    ).subscribe()
  }

}
