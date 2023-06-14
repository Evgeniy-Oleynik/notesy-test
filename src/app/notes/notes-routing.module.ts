import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesComponent } from './notes.component';

const notesRoutes: Routes = [
  {
    path: '',
    component: NotesComponent,
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
