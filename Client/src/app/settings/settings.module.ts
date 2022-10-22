import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from '../material.module';
import { SettingsRoutingModule } from './setings.routing';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SettingsRoutingModule,
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
