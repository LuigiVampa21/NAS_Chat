import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  user!:User;
  photo!:string
  status = 'Online';
  friends!: User[];
  userSub!:Subscription;
  statusArray = ["Online", "Occuped", "Working", "Offline"]
  statusIcons: any = {
    "Online": "person_pin",
    "Occuped": "self_improvement",
     "Working": "work",
     "Offline": "person_off"
  }

  constructor(private userService: UserService) { }


  ngOnInit(): void{
    setTimeout(() => {
      this.initCard()
    }, 1000)
  }

  initCard(){
  this.userSub = this.userService.getUserByIDwithFriends()
        .subscribe( (data:any) => {
          this.user = data.user
          this.photo = `../../assets/images/${this.user.photo}`
          this.friends = data.user.friends
          this.initFriendsPhoto()
        })
  }

  initFriendsPhoto(){
    if(!this.friends)return;
    this.friends
      .forEach(f => {
        f.photo = `../../assets/images/${f.photo}`
      })
  }

  setStatus(status:string){
    this.status= status
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
