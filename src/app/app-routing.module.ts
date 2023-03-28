import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { NotesResolver } from './core/resolvers/notes.resolver';
import { NoteByIdResolver } from './core/resolvers/note-id.resolver';
import { TopicsResolver } from './core/resolvers/topics.resolver';

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
    resolve: [NotesResolver],
    loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
  {path: 'notes', redirectTo: 'notes/new', pathMatch: 'full'},
  {
    path: 'notes/:id',
    canActivate: [AuthGuard],
    resolve: [TopicsResolver, NoteByIdResolver],
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
