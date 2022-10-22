import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { CallService } from 'src/app/core/services/call.service';
import { UserService } from 'src/app/core/services/user.service';
import { Call } from 'src/app/core/models/call.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss']
})
export class CallDetailComponent implements OnInit, OnDestroy {

  penFriend!:User;
  penFriendName!:any;
  callID!:string;
  currentUser!:User;
  call!:Call;
  paramSub!: Subscription;
  currentUserSub!:Subscription;
  callSub!:Subscription;
  penFriendSub!:Subscription;
  RoomSub!:Subscription;

  constructor(private route:ActivatedRoute, private userService: UserService, private router:Router, private callService : CallService) { }

  ngOnInit(): void {
    this.initCall()
  }

  initCall(){
  this.paramSub = this.route.params
    .subscribe((params: Params)=>{
      if(!params['id']) return;
      this.callID = params['id']
      this.initUser()
    })
  }

  initUser(){
  this.currentUserSub = this.userService.getUserFromLocalStorage()
    .subscribe((user:any) => {
      this.currentUser = user.user;
      this.getCall()
    })
  }

  getCall(){
  this.callSub = this.callService.getSingleCall(this.callID)
    .subscribe((call:any)=>{
      this.call = call.call
      this.getPenFriend()
          })
  }

  getPenFriend(){
    this.penFriendName = this.call.users.find((user:any) => user.name != this.currentUser.name);

  this.penFriendSub = this.userService.getUserByID(this.penFriendName._id)
        .subscribe((data:any) => {
          this.penFriend = data.user;
        })

  }

  onSendMessage(){
  this.RoomSub = this.userService.getUserByIDwithRooms()
    .pipe(tap((data:any) => {
      const currentUserRooms = data.user.rooms;
      currentUserRooms.forEach((r:any)=> {
        if(r.users.includes(this.penFriend._id)){
          this.router.navigateByUrl(`/chats/chat-detail/${r._id}`)
        }
      })
    }
    )).subscribe()
  }

  onExit(){
    this.router.navigateByUrl('/calls')
  }

  ngOnDestroy(){
    this.currentUserSub.unsubscribe();
    this.callSub.unsubscribe();
    this.penFriendSub.unsubscribe();
  }
}
