import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, shareReplay, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { NoteEditDialogComponent } from './note-edit-dialog/note-edit-dialog.component';
import { AuthService } from '../core/services/auth.service';
import { NotesService } from '../core/services/notes.service';
import { TopicsService } from '../core/services/topics.service';
import { Note } from '../shared/interfaces/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @ViewChild(MatTable) table?: MatTable<any>;

  selectAllNotes$ = new Subject<void>();

  notesList$!: Observable<MatTableDataSource<Note>>;

  notes$ = this.notesService.notes$;
  userNotes$ = this.notesService.userNotes$;
  tableColumnsList = ['marker', 'number', 'topic', 'title'];
  selectedRows = new SelectionModel<Note>(true, []);
  notesListLength = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notesService: NotesService,
    private topicsService: TopicsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.notesList$ = this.notes$.pipe(
      map(notes => {
        return new MatTableDataSource<Note>(notes);
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );

    this.selectAllNotes$.pipe(
      withLatestFrom(this.notesList$)
    ).subscribe(([_, notes]) => {
      notes.data.forEach((note: Note) => {
        this.selectedRows.select(note);
      })
    })
  }

  newNote() {
    this.notesService.setCurrentNoteId(null);
    this.dialog.open(NoteEditDialogComponent);
  }

  openDialog(note: Note) {
    if (note.id) this.notesService.setCurrentNoteId(note.id);
    this.dialog.open(NoteEditDialogComponent);
    console.log('current note:', note);
  }

  showSelected() {
    console.log(this.selectedRows.selected);
  }

  showAllNotes() {
    this.notesService.getAllNotes();
    this.notesList$ = this.notes$.pipe(
      map(notes => {
        return new MatTableDataSource<Note>(notes);
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );
  }

  showMyNotes() {
    this.authService.currentUser$.pipe(
      map(user => {
        if (user.id) this.notesService.getUserNotes(user.id)
      })
    ).subscribe()
    this.notesList$ = this.userNotes$.pipe(
      map(notes => {
        return new MatTableDataSource<Note>(notes);
      }),
      shareReplay({refCount: true, bufferSize: 1})
    );
  }

  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    return numSelected >= this.notesListLength;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }
    this.selectAllNotes$.next();
  }
}
