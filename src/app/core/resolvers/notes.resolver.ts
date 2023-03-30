import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IRequest } from 'ngxs-requests-plugin';
import { filter } from 'rxjs';
import { take } from 'rxjs/operators';
import { NotesService } from '../services/notes.service';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class NotesResolver implements Resolve<IRequest> {
  constructor(
    private authService: AuthService,
    private notesService: NotesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.currentUser$.subscribe(user => {
      if (user.id) this.notesService.getUserNotes(user.id);
      return this.notesService.getNotesRequestState$.pipe(
        filter(res => res.loaded),
        take(1)
      )
    })
  }
}

