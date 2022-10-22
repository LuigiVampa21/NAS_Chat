import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatsRoutingModule } from './chats.routing';



@NgModule({
  declarations: [
    ChatsComponent,
    ChatDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ChatsRoutingModule

  ],
  exports: [
    ChatsComponent,
    ChatDetailComponent,
  ]
})
export class ChatsModule { }
