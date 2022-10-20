import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { CallsComponent } from './calls/calls.component';
import { ChatsComponent } from './chats/chats.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatDetailComponent } from './chats/chat-detail/chat-detail.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CallDetailComponent } from './calls/call-detail/call-detail.component';
import { FriendsComponent } from './friends/friends.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    CallsComponent,
    ChatsComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    ChatDetailComponent,
    CallDetailComponent,
    FriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
    },
    {
      provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi:true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
