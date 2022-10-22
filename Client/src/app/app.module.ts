import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ErrorComponent } from './partials/error/error.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './partials/loading-spinner/loading-spinner.component';
import { AddFriendComponent } from './partials/add-friend/add-friend.component';
import { ShowNotificationsComponent } from './partials/show-notifications/show-notifications.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { FriendsModule } from './friends/friends.module';
import { ChatsModule } from './chats/chats.module';
import { CallsModule } from './calls/calls.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    AddFriendComponent,
    ShowNotificationsComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HomeModule,
    FriendsModule,
    ChatsModule,
    SettingsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    MaterialModule,
    CallsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
