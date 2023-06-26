import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormErrorsModule } from '../../shared/components/form-errors/form-errors.module';
import { IdToLabelPipeModule } from '../../shared/pipes/id-to-label/id-to-label.pipe.module';
import { SharedModule } from '../../shared/shared.module';

import { NoteEditDialogComponent } from './note-edit-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    FormErrorsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    IdToLabelPipeModule,
    MatSnackBarModule,
  ],
  declarations: [
    NoteEditDialogComponent,
  ],
})

export class NoteEditDialogModule {}
