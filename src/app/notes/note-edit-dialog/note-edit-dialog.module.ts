import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormErrorsModule } from '../../shared/components/form-errors/form-errors.module';
import { UserNamePipeModule } from '../../shared/pipes/user-name/user-name.pipe.module';
import { TopicTypePipeModule } from '../../shared/pipes/topic-type/topic-type.pipe.module';
import { SharedModule } from '../../shared/shared.module';

import { NoteEditDialogComponent } from './note-edit-dialog.component';


@NgModule({
  imports: [
    SharedModule,
    FormErrorsModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    UserNamePipeModule,
    TopicTypePipeModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  declarations: [
    NoteEditDialogComponent,
  ],
})

export class NoteEditDialogModule {}
