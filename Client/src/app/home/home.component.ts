import { Component, OnDestroy, OnInit } from '@angular/core';
// import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// import { AuthResolver } from '../resolver/auth.resolver';
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
  status = '';
  friends!: User[];
  userSub!:Subscription;

  constructor(private authService: AuthService, private route: ActivatedRoute, private userService: UserService) { }


  ngOnInit(): any{
    this.initCard()
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

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

}
