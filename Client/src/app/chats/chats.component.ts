import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ChatService } from '../services/chat.service';
import { MessageService } from '../services/message.service';
import { SocketService } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { MessageBox } from '../shared/interfaces/message-box.interface';
import { Room } from '../shared/models/room.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {

  rooms:Room[] = [];
  currentUser!:User;
  penFriend!:User;
  messageBox:MessageBox[] = [];
  messageBoxSorted!:MessageBox[];
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
    let index = 0;
    this.rooms.forEach((r:any) => {
      r.ID = r.users.find((userID:any) => userID !== this.currentUser._id);
       this.userService.getUserByID(r.ID)
          .subscribe((data:any) => {
            r.penFriend = data.user.name;
            r.photo = data.user.photo;
            this.messageBox.push({
                                  photo: r.photo,
                                  name: r.penFriend,
                                  room: r,
                                  createdAt: r.updatedAt,
                                  timestamp: new Date(r.updatedAt).getTime()
                                })
            this.initMessageBox(index);
            index++;
          })
        })
  }

  initMessageBox(index:number){
    const messages = this.messageBox[index].room?.chat;
    if(!messages) return;
    const lastMsg = (messages[messages.length - 1]);

    this.messageService.GetSignleMessageByID(lastMsg)
        .pipe(
          tap((data:any)=>{
            this.messageBox[index] = {...this.messageBox[index], content: data.message.content}
            this.sortMessageBox()
          })
        ).subscribe()
  }

  sortMessageBox(){
  this.messageBoxSorted = [...this.messageBox].sort((a,b):any => (b.timestamp > a.timestamp) ? 1 : -1)
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }
}
