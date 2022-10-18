import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { Room } from '../shared/models/room.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  rooms!:Room[]

  constructor(private router: Router, private userService:UserService, private chatService:ChatService) { }

  ngOnInit(): void {
    this.initRooms()
  }

  initRooms(){
    this.userService.getUserByIDwithRooms()
        .subscribe((data:any) => {
          this.rooms = data.user.rooms
          // console.log(this.rooms);
        })
  }

  onViewChat(room:Room){
    if(!room._id) return;
    this.chatService.getSingleRoom(room._id)
        .subscribe(() => {
          this.router.navigateByUrl('/chats/chat-detail/' + room._id)
        })
  }

}
