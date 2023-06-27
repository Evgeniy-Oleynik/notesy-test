import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotesResolver } from './core/resolvers/notes-resolver.service';
import { TopicsResolver } from './core/resolvers/topics-resolver.service';
import { UsersResolver } from './core/resolvers/users-resolver.service';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'notes', pathMatch: 'full'},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(mod => mod.SignupModule)
  },
  {
    path: 'notes',
    canMatch: [authGuard],
    resolve: [NotesResolver, TopicsResolver, UsersResolver],
    loadChildren: () => import('./notes/notes.module').then(mod => mod.NotesModule)
  },
  {path: '404', loadChildren: () => import('./shared/components/not-found/not-found.module').then(mod => mod.NotFoundModule)},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
