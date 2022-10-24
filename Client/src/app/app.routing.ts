import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path: '', redirectTo:'auth/login', pathMatch: 'full'},

  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'chats', loadChildren: () => import('./chats/chats.module').then(m => m.ChatsModule)},
  {path: 'calls', loadChildren: () => import('./calls/calls.module').then(m => m.CallsModule)},
  {path: 'friends', loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule)},
  {path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
  {path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)},


  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
