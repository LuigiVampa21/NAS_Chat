import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SocketService } from 'src/app/services/socket.service';
import { UserService } from 'src/app/services/user.service';
import { Message } from 'src/app/shared/models/message.model';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';



@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {

  room!:Room;
  roomID!:string;
  currentUser!:User;
  penFriend!:User;
  penFriendID!:any;
  messages!:Message[] | undefined;
  formMessage!: FormControl;
  msgObject!: Message;
  socketSub!:Subscription;
  currentUserSub!:Subscription;
  chatSub!: Subscription;
  penFriendSub!:Subscription;
  sendDBSub!:Subscription;


  constructor(
              private chatService: ChatService,
              private route:ActivatedRoute,
              private userService: UserService,
              private router:Router,
              private formBuilder: FormBuilder,
              private socketService: SocketService
              ) { }

  ngOnInit(): void {
    this.initRoom()
    this.formMessage = this.formBuilder.control('');
    this.socketSub = this.socketService.getMessageObservable()
        .subscribe((data:Message) => {
          if(!data || !this.messages)return
          this.messages.push(data)
        })
  }

  initRoom(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['id']) return;
      this.roomID = params['id']
      this.initUser()
    })

  }

  initUser(){
  this.currentUserSub = this.userService.getUserFromLocalStorage()
    .subscribe((user:any) => {
      this.currentUser = user.user;
      this.getRoom()
    })
  }

  getRoom(){
  this.chatSub = this.chatService.getSingleRoom(this.roomID)
    .subscribe((room:any)=>{
      this.room = room.room
      this.getPenFriend()
          })
    }

    getPenFriend(){
      this.penFriendID = this.room.users.find((userID:any) => userID !== this.currentUser._id);
    this.penFriendSub = this.userService.getUserByID(this.penFriendID)
          .subscribe((data:any) => {
            this.penFriend = data.user;
            this.initMsg()
          })

    }

    initMsg(){
      this.messages = this.room.chat;
    }

    onSend(msg:string){
      if(!msg || !this.roomID || !this.currentUser._id)return ;
      this.msgObject = {content: msg, room: this.roomID, poster:this.currentUser._id};
      this.socketService.onSendMessage(this.msgObject);
      this.sendDBSub = this.socketService.SendMessageToDB(this.msgObject)
          .subscribe();
      this.formMessage.reset();
    }


    onExit(){
      this.router.navigateByUrl('/chats');
      this.socketService.onLeaveRoom(this.roomID);
    }

    ngOnDestroy(): void {
      this.socketSub.unsubscribe();
      this.currentUserSub.unsubscribe();
      this.chatSub.unsubscribe();
      this.penFriendSub.unsubscribe();
      // this.sendDBSub.unsubscribe();
    }

}
