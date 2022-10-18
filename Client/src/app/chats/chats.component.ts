import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { Room } from '../shared/models/room.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  rooms!:Room[];
  currentUser!:User;
  penFriend!:User;
  penFriendID!:any;

  constructor(private router: Router, private userService:UserService, private chatService:ChatService) { }

  ngOnInit(): void {
    this.initRooms()
  }

  initRooms(){
    this.userService.getUserByIDwithRooms()
        .subscribe((data:any) => {
          this.currentUser = data.user;
          this.rooms = data.user.rooms;
          this.getPenFriend()
        })
  }

  onViewChat(room:Room){
    if(!room._id) return;
    this.chatService.getSingleRoom(room._id)
        .subscribe(() => {
          this.router.navigateByUrl('/chats/chat-detail/' + room._id)
        })
  }


  getPenFriend(){
    this.rooms.forEach((r:any) => {
      r.ID = r.users.find((userID:any) => userID !== this.currentUser._id);
      this.userService.getUserByID(r.ID)
          .subscribe((data:any) => {
            console.log(data.user.name)
            r.penFriend = data.user.name;
      })
    })
  }
}
