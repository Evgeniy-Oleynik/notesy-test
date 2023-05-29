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

  notes$ = this.notesService.notes$;
  tableColumnsList = ['marker', 'number', 'topic', 'title'];
  selectedRows = new SelectionModel<Note>(true, []);
  notesListLength = 0;
  notesList$!: Observable<MatTableDataSource<Note>>;
  selectAllNotes$ = new Subject<void>();

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
        this.notesListLength = notes.length;
        return new MatTableDataSource<Note>(notes);
      }),
      shareReplay()
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
    this.router.navigate(['notes', 'new']);
  }

  openDialog(id: number) {
    this.dialog.open(NoteEditDialogComponent, {
      data: {
        id: id,
      }
    });
  }

  showSelected() {
    console.log(this.selectedRows.selected);
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
