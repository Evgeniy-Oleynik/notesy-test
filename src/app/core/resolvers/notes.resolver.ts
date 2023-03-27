import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Topic } from '../interfaces/topic';
import { inject } from '@angular/core';
import { TopicsService } from '../services/topics.service';
import { NotesService } from '../services/notes.service';

export const notesResolver: ResolveFn<void> = () => {

  return inject(NotesService).getAllNotes(56, 1);
  }
