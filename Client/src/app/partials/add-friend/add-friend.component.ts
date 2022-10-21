import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { FriendsService } from 'src/app/services/friends.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  alreadyFriends!:boolean;
  user!:User;
  currentUser!:User;

  constructor(private friendsService:FriendsService, private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.friendsService.userToAdd;
    this.userService.getUserByIDwithFriends()
    .pipe(tap((data:any)=> {
      this.alreadyFriends = data.user.friends.some((friend:User) => friend._id === this.user._id)
    }))
    .subscribe()

  }

  onSendRequest(){
    this.friendsService.sendRequest(this.user)
  }

}
