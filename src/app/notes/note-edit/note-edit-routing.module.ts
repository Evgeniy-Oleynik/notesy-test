import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteEditComponent } from './note-edit.component';

const noteEditRoutes: Routes = [
  {path: '', component: NoteEditComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(noteEditRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class NoteEditRoutingModule {}
