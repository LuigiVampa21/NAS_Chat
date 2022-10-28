import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { Message } from '../shared/models/message.model';
import { Room } from '../shared/models/room.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {

  rooms!:Room[];
  currentUser!:User;
  penFriend!:User;
  messageBox:{name: string, content?:string, createdAt?:Date}[] = [];
  messages:any[] = [];
  penFriendID!:any;
  currentUserSub!:Subscription;
  penFriendSub!:Subscription;
  chatSub!:Subscription;

  constructor(
              private router: Router,
              private userService:UserService,
              private chatService:ChatService,
              private socketService: SocketService,
              private messageService: MessageService,
              ) { }

  ngOnInit(): void {
    this.initRooms()
  }

  initRooms(){
  this.currentUserSub = this.userService.getUserByIDwithRooms()
        .subscribe((data:any) => {
          this.currentUser = data.user;
          this.rooms = data.user.rooms;
          this.rooms.forEach((room:Room) => {
            if( room.chat === undefined || room.chat.length === 0) return;
            const index = room.chat.length;
            this.messages.push(room.chat[index-1])
          })
          this.getPenFriend()
        })
  }

  onViewChat(room:Room){
    if(!room._id) return;
  this.chatService.getSingleRoom(room._id)
        .pipe(tap(() => {
          this.router.navigateByUrl('/chats/chat-detail/' + room._id);
          this.socketService.onJoinRoom(room._id)
        }))
        .subscribe()

  }

  getPenFriend(){
    this.rooms.forEach((r:any) => {
      r.ID = r.users.find((userID:any) => userID !== this.currentUser._id);
       this.userService.getUserByID(r.ID)
          .subscribe((data:any) => {
            r.penFriend = data.user.name;
            this.messageBox.push({name: r.penFriend})
            this.initMessageBox();
      })
    })
  }

  initMessageBox(){
    console.log(this.messages);

// this.messages.forEach(message => {
//   console.log(message[0]);

//   this.messageService.GetSignleMessageByID(message)
//       .pipe(tap(console.log))
//         .subscribe()
// })
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
