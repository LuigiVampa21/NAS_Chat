import { Component, Input, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  user!:User;

  @Input() Username!:string;

  constructor(private friendsService:FriendsService) { }

  ngOnInit(): void {
    this.user = this.friendsService.userToAdd;
  }

  onSendRequest(){
    this.friendsService.sendRequest(this.user)
  }

}
