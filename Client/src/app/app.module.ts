import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';
import { LoadingSpinnerComponent } from './partials/loading-spinner/loading-spinner.component';
import { AddFriendComponent } from './partials/add-friend/add-friend.component';
import { ShowNotificationsComponent } from './partials/show-notifications/show-notifications.component';
import { CoreModule } from './core/core.module';
import { customNotifierOptions } from './shared/utils/notifier.options';
import { ForgotPasswordComponent } from './partials/forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './partials/reset-password/reset-password.component';
import { VerifyEmailComponent } from './partials/verify-email/verify-email.component';



@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    AddFriendComponent,
    ShowNotificationsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
