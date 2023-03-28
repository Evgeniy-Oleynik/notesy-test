import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IRequest } from 'ngxs-requests-plugin';
import { filter, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';

@Injectable({providedIn: 'root'})
export class NotesResolver implements Resolve<IRequest> {
  constructor(private notesService: NotesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    this.notesService.getAllNotes(56, 1);
    return this.notesService.getNotesRequestState$.pipe(
      filter(res => res.loaded),
      take(1)
    )
  }
}

