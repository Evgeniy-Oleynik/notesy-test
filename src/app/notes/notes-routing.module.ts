import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { TopicsResolver } from '../core/resolvers/topics-resolver.service';
import { UsersResolver } from '../core/resolvers/users-resolver.service';

const notesRoutes: Routes = [
  {
    path: '',
    component: NotesComponent,
    resolve: [TopicsResolver, UsersResolver],
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
