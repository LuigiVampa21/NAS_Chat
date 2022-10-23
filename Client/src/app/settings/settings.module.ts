import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material.module';
import { SettingsRoutingModule } from './setings.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    SettingsComponent,
    UploadPhotoComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
