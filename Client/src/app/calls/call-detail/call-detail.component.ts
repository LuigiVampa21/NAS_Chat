import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CallService } from 'src/app/services/call.service';
import { UserService } from 'src/app/services/user.service';
import { Call } from 'src/app/shared/models/call.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-call-detail',
  templateUrl: './call-detail.component.html',
  styleUrls: ['./call-detail.component.scss']
})
export class CallDetailComponent implements OnInit {

  penFriend!:User;
  penFriendName!:any;
  callID!:string;
  currentUser!:User;
  call!:Call;

  constructor(private route:ActivatedRoute, private userService: UserService, private router:Router, private callService : CallService) { }

  ngOnInit(): void {
    this.initCall()
  }

  initCall(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['id']) return;
      this.callID = params['id']
      this.initUser()
    })
  }

  initUser(){
    this.userService.getUserFromLocalStorage()
    .subscribe((user:any) => {
      this.currentUser = user.user;
      this.getCall()
    })
  }

  getCall(){
    this.callService.getSingleCall(this.callID)
    .subscribe((call:any)=>{
      this.call = call.call
      this.getPenFriend()
          })
  }

  getPenFriend(){
    this.penFriendName = this.call.users.find((user:any) => user.name != this.currentUser.name);

    this.userService.getUserByID(this.penFriendName._id)
        .subscribe((data:any) => {
          this.penFriend = data.user;
        })

  }

  onSendMessage(){
    this.userService.getUserByIDwithRooms()
    .pipe(tap((data:any) => {
      const currentUserRooms = data.user.rooms;
      console.log(this.penFriend._id);
      currentUserRooms.forEach((r:any)=> {
        console.log(r.users);
        if(r.users.includes(this.penFriend._id)){
          this.router.navigateByUrl(`/chats/chat-detail/${r._id}`)
          console.log(r);
        }
      })
    }
    )).subscribe()
        // .subscribe( (data:any) => {
        //   })

        // })
    // console.log();
    // check if discussion exists with current userID and PenFriend ID
    // NAVIGATE TO
  }

  onExit(){
    this.router.navigateByUrl('/calls')
  }
}
