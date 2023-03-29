import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { TopicsResolver } from '../core/resolvers/topics.resolver';
import { NoteByIdResolver } from '../core/resolvers/note-id.resolver';

const notesRoutes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    loadChildren: () => import('./note-edit/note-edit.module').then(mod => mod.NoteEditModule)
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    resolve: [TopicsResolver, NoteByIdResolver],
    loadChildren: () => import('./note-edit/note-edit.module').then(mod => mod.NoteEditModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(notesRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class NotesRoutingModule {}
