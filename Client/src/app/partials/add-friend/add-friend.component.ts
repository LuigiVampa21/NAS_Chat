import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { FriendsService } from 'src/app/core/services/friends.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

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

  constructor(private friendsService:FriendsService, private userService:UserService) { }

  ngOnInit(): void {
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
