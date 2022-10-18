import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { string } from 'joi';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
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
  roomSubscription!:Subscription
  currentUser!:User;
  penFriend!:User;
  penFriendID!:any;
  constructor(private chatService: ChatService, private route:ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.initRoom()
    this.initUser()
    // this.getPenFriend()
  }

  initRoom(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['id']) return;
      this.roomID = params['id']
      this.getRoom()
      // this.initUser()
    })

  }

  initUser(){
    this.userService.getUserFromLocalStorage()
    .subscribe((user:any) => {
      this.currentUser = user.user;
      // console.log(this.currentUser);
      this.getPenFriend()
    })
  }
  getRoom(){
    this.chatService.getSingleRoom(this.roomID)
    .subscribe((room:any)=>{
      this.room = room.room
      // console.log(this.room);
      // this.getPenFriend()
          })
    }

    getPenFriend(){
      // console.log(this.room.users)
      console.log(this.currentUser)
      this.penFriendID = this.room.users.find((userID:any) => userID !== this.currentUser._id);

      this.userService.getUserByID(this.penFriendID)
          .subscribe(data => {
            console.log(data);
          })

    }


  ngOnDestroy(): void {
    // this.roomSubscription.unsubscribe()
  }

}
