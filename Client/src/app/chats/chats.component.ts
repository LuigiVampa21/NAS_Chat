import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Room } from '../shared/models/room.model';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  rooms!:Room[]

  constructor(private authService: AuthService, private userService:UserService) { }

  ngOnInit(): void {
    this.initRooms()
  }

  initRooms(){
    this.userService.getUserByIDwithRooms()
        .subscribe((data:any) => {
          this.rooms = data.user.rooms
          console.log(this.rooms);
        })
  }

  onViewChat(room:Room){
    console.log(room._id);

  }

}
