import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { NoteEditDialogComponent } from './note-edit-dialog.component';
import { FormErrorsModule } from '../../shared/components/form-errors/form-errors.module';

@NgModule({
  imports: [
    SharedModule,
    FormErrorsModule,
  ],
  declarations: [
    NoteEditDialogComponent,
  ],
})

export class NoteEditDialogModule {}
