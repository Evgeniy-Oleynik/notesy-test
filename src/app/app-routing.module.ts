import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { topicsResolver } from './core/resolvers/topics.resolver';
import { notesResolver } from './core/resolvers/notes.resolver';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(mod => mod.SignupModule)
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    resolve: {notes$: notesResolver},
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
  {
    path: 'notes',
    canActivate: [AuthGuard],
    resolve: {topics$: topicsResolver},
    loadChildren: () => import('./note-edit/note-edit.module').then(mod => mod.NoteEditModule)
  },
  {path: '404', loadChildren: () => import('./notfound/notfound.module').then(mod => mod.NotfoundModule)},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
