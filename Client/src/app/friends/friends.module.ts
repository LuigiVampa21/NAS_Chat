import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendsRoutingModule } from './friends.routing';



@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FriendsRoutingModule
  ],
  exports: [
    FriendsComponent
  ]
})
export class FriendsModule { }
