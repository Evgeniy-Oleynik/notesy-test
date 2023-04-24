import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { TopicsResolver } from '../core/resolvers/topics.resolver';
import { NoteByIdResolver } from '../core/resolvers/note-id.resolver';

const notesRoutes: Routes = [
  {
    path: '',
    component: NotesComponent,
    resolve: [TopicsResolver],
  },
  {
    path: 'new',
    resolve: [TopicsResolver],
    loadChildren: () => import('./note-edit/note-edit.module').then(mod => mod.NoteEditModule)
  },
  {
    path: ':id',
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
