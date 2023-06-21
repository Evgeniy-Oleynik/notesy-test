import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FormErrorsModule } from './components/form-errors/form-errors.module';
import { TopicTypePipeModule } from './pipes/topic-type/topic-type.pipe.module';
import { UserNamePipeModule } from './pipes/user-name/user-name.pipe.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    FormErrorsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TopicTypePipeModule,
    UserNamePipeModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    FormErrorsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TopicTypePipeModule,
    UserNamePipeModule,
  ],
  bootstrap: []
})
export class SharedModule {
}
