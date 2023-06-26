import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const notfoundRoutes: Routes = [
  {path: '', component: NotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(notfoundRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class NotFoundRoutingModule {}
