import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { HomeFriendsComponent } from './home-friends/home-friends.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeFriendsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HomeRoutingModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
