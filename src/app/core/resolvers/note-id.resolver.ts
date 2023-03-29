import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IRequest } from 'ngxs-requests-plugin';
import { filter, Observable, tap } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';

@Injectable({providedIn: 'root'})
export class NoteByIdResolver implements Resolve<IRequest> {
  constructor(
    private notesService: NotesService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRequest> {
    this.notesService.getNoteById(parseInt(<string>route.paramMap.get('id')));
    return this.notesService.getNoteByIdRequestState$.pipe(
      tap(res => {
        if(res.status === 'fail') this.router.navigate(['notes/new'])
      }),
      filter(res => res.loaded),
      take(1)
    )
  }
}
