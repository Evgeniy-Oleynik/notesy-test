import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { NotesService } from '../core/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes$ = this.notesService.notes$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notesService: NotesService,
  ) {
  }

  ngOnInit(): void {
  }

  newNote() {
    this.router.navigate(['/notes/new']);
  }
}
