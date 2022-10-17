import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoadingSpinnerComponent } from './utils/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { CallsComponent } from './calls/calls.component';
import { ChatsComponent } from './chats/chats.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    CallsComponent,
    ChatsComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    LoadingSpinnerComponent,

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
