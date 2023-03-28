import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IRequest } from 'ngxs-requests-plugin';
import { NotesService } from '../services/notes.service';
import { filter, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NoteByIdResolver implements Resolve<IRequest> {
  constructor(private notesService: NotesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    this.notesService.getNoteById(Number(route.paramMap.get('id')));
    return this.notesService.getNoteByIdRequestState$.pipe(
      filter(res => res.loaded),
      take(1)
    )
  }
}
