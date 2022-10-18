import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ChatsComponent } from './chats/chats.component';
import { CallsComponent } from './calls/calls.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { AuthResolver } from './resolver/auth.resolver';



const routes: Routes = [
  {path: '', redirectTo:'auth/login', pathMatch: 'full'},
  // {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'about-us', component: AboutUsComponent},
  // {path: 'home', component: HomeComponent, canActivate: [AuthGuard], resolve: {user: AuthResolver}},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  // {path: 'home', component: HomeComponent},
  {path: 'calls', component: CallsComponent, canActivate: [AuthGuard]},
  {path: 'chats', component: ChatsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'not-found', component: ErrorComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
