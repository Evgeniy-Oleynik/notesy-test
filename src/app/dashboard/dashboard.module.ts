import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NoteCardModule } from '../components/note-card/note-card.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    NoteCardModule,
  ],
  declarations: [
    DashboardComponent
  ],
})

export class DashboardModule {}
