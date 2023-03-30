import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { NotesResolver } from './core/resolvers/notes.resolver';

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
    canActivate: [AuthGuard],
    resolve: [NotesResolver],
    loadChildren: () => import('./notes/notes.module').then(mod => mod.NotesModule)
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
