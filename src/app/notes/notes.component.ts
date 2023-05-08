import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotesService } from '../core/services/notes.service';
import { TopicsService } from '../core/services/topics.service';
import { Topic } from '../shared/interfaces/topic';
import { combineLatest, map } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { Note } from '../shared/interfaces/note';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @ViewChild(MatTable) table?: MatTable<any>;

  notes$ = this.notesService.notes$;
  topics$ = this.topicsService.topics$;
  tableColumnsList = ['marker', 'number', 'topic', 'title'];
  selectedRows = new SelectionModel<Note>(true, []);
  notesListLength = 0;
  notesList$ = combineLatest(this.notes$, this.topics$).pipe(
    map(([notes, topics]: [Note[], Topic[]]) => {
      this.notesListLength = notes.length;
      return notes.map(note => {
        if (note.topicId) note = {...note, 'topicType': topics[note.topicId].type};
        return note;
      });
    })
  );


  constructor(
    private authService: AuthService,
    private router: Router,
    private notesService: NotesService,
    private topicsService: TopicsService,
  ) {
  }

  ngOnInit(): void {
  }

  newNote() {
    this.router.navigate(['notes', 'new']);
  }

  redirectTo(id: any) {
    this.router.navigate(['notes', id]);
  }

  showSelected() {
    console.log(this.selectedRows.selected);
  }

  isAllSelected() {
    const numSelected = this.selectedRows.selected.length;
    return numSelected === this.notesListLength;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
      return;
    }
    this.notesList$.subscribe(notes => {
      notes.forEach(note => {
        if (!this.selectedRows.selected.includes(note)) {
          this.selectedRows.select(note);
          this.selectedRows.isSelected(note);
        }
      })
      // this.selectedRows.select(...notes)
    });
    this.table?.renderRows();
  }
}
