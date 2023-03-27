import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../core/services/notes.service';
import { TopicsService } from '../core/services/topics.service';
import { Topic } from '../core/interfaces/topic';
import { take } from 'rxjs/operators';
import { map } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { logMessages } from '@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  topics$ = this.topicsService.topics$;

  noteEditor = new FormGroup<any>({
    topicId: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  })

  constructor(
    private notesService: NotesService,
    private topicsService: TopicsService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  createNote() {
    this.notesService.createNewNote(this.noteEditor.value)
  }
}
