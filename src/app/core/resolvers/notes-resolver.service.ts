import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IRequest } from 'ngxs-requests-plugin';
import { filter, Observable, take } from 'rxjs';

import { Note } from '../../shared/interfaces/models/note.interface';
import { NotesService } from '../services/notes.service';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class NotesResolver implements Resolve<IRequest> {
  constructor(
    private authService: AuthService,
    private notesService: NotesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest<Note[]>> {
    return this.notesService.getNotes(route.queryParams).pipe(
      filter(res => res.loaded && !res.loading),
      take(1)
    );
  }
}

