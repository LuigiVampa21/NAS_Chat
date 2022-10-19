import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallService } from '../services/call.service';
import { UserService } from '../services/user.service';
import { Call } from '../shared/models/call.model';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss']
})
export class CallsComponent implements OnInit {

  currentUser!:User;
  calls!:Call[];

  constructor(private router: Router, private userService:UserService, private callService:CallService) { }

  ngOnInit(): void {
    this.initCalls()
  }
  initCalls(){
    this.userService.getUserByIDwithCalls()
        .subscribe((data:any) => {
          this.currentUser = data.user;
          this.calls = data.user.calls;
          console.log(this.calls);
          this.getPenFriend()
        })
  }

  getPenFriend(){
      this.calls.forEach((c:any) => {
    c.ID = c.users.filter((userID:any) => userID !== this.currentUser._id);
        if(c.ID.length < 2){
          this.userService.getUserByID(c.ID[0])
          .subscribe((data:any) => {
            c.penFriend = data.user.name;
          })
        }else{
          this.userService.getUserByID(c.ID[0])
          .subscribe((data:any) => {
            c.penFriend = data.user.name;
          })
          this.userService.getUserByID(c.ID[1])
          .subscribe((data:any) => {
            c.penFriend = c.penFriend + ', ' + data.user.name;
          })
        }
    })
  }

  onViewCall(call:Call){
    this.router.navigateByUrl(`/calls/call-detail/${call._id}`)
  }
}

