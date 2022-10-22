import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material.module';
import { SettingsRoutingModule } from './setings.routing';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettingsComponent
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
