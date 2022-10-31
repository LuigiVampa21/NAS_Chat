import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FriendsService } from 'src/app/services/friends.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit, OnDestroy {

  alreadyFriends!:boolean;
  user!:User;
  currentUser!:User;
  friendsSub!:Subscription;

  constructor(private friendsService:FriendsService, private userService:UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.initAddUser()
  }

  initAddUser(){
    // if(!this.currentUser._id)return;
    this.user = this.friendsService.userToAdd;
    this.friendsSub = this.userService.getUserByIDwithFriends()
    .pipe(tap((data:any)=> {
      this.alreadyFriends = data.user.friends.some((friend:User) => friend._id === this.user._id)
    }))
    .subscribe()
  }

  onSendRequest(){
    this.friendsService.sendRequest(this.user)
  }

  ngOnDestroy(): void {
    this.friendsSub.unsubscribe();
  }

}
