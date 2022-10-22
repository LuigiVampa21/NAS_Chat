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
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
