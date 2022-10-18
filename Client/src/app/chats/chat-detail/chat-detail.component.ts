import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { Room } from 'src/app/shared/models/room.model';


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {

  room!:Room;
  roomID!:string;
  roomSubscription!:Subscription
  constructor(private chatService: ChatService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.initRoom()
  }

  initRoom(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['id']) return;
      this.roomID = params['id']
      this.getRoom()
    })

  }
    getRoom(){
      this.chatService.getSingleRoom(this.roomID)
          .subscribe((room:any)=>{
            this.room = room.room
            console.log(this.room);
          })
    }



  ngOnDestroy(): void {
    // this.roomSubscription.unsubscribe()
  }

}
