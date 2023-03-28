import { NgModule } from '@angular/core';
import { NoteCardComponent } from './note-card.component';
import { RouterLinkWithHref } from '@angular/router';

@NgModule({
  imports: [
    RouterLinkWithHref

  ],
  declarations: [
    NoteCardComponent
  ],
  exports: [
    NoteCardComponent
  ]
})
export class NoteCardModule {}
