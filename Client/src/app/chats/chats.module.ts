import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ChatsComponent,
    ChatDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  exports: [
    ChatsComponent,
    ChatDetailComponent,
  ]
})
export class ChatsModule { }
