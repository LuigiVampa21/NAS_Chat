import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  constructor(private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void{
    this.initUser();
  }

  initUser(){
    this.user = this.authService.getUser();
    this.initCard();
  }

  initCard(){
    this.photo = `../../assets/images/${this.user.photo}`
    if(!this.user._id) return;
    this.userSub = this.userService.getUserwithFriends(this.user._id)
    .subscribe( (data:any) => {
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
    this.status = status
  }

}
