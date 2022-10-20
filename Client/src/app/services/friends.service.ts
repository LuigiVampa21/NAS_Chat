import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room } from '../shared/models/room.model';
import { User } from '../shared/models/user.model';
import { ChatService } from './chat.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  userToAdd!:User;
  currentUser!:User;
  ROOMS_URL = environment.GET_SINGLE_ROOM_BY_ID;
  NOTIFICATIONS_URL = environment.NOTIFICATION_URL
  constructor(private userService: UserService, private chatService: ChatService) { }

  setUserToAdd(user:User){
    this.userToAdd = user;
  }

  sendRequest(user:User){
    this.getCurrentUser();
    // const notifications = {
    //   sort: "Friend Request",
    //   from: this.currentUser,
    //   room:
    // }


    //  Create Room -DONE
    // Push ROOM INTO CURRENT USER MODEL - DONE
    //  sendRequestToUserToAdd By creating Notification
    // Wait for other user to Respond to accept Room
  }

  getCurrentUser(){
    this.userService.getUserFromLocalStorage()
    .pipe(tap((data:any)=> {
          this.currentUser = data.user;
          console.log(this.currentUser);
          this.createRoom();
    })).subscribe()
  }

  createRoom(){
    const room = {
      users: [this.currentUser, this.userToAdd]
    };
    this.chatService.createNewRoom(room)
          .pipe(tap((data:any)=> {
            const { newRoom } = data;
            this.addNewRoomToCurrentUser(newRoom)
          }))
          .subscribe()
        }

  addNewRoomToCurrentUser(newRoom:Room){
    if(!this.currentUser._id || !newRoom._id) return;
    this.userService.addRoomToUser(this.currentUser._id, newRoom._id)
        .pipe(tap(()=> {
          // this.sendNotificationToPenFriend(newRoom._id)
        }))
        .subscribe()
  }

  sendNotificationToPenFriend(roomID:string){
    //  const notifications = {
    //   sort: "Friend Request",
    //   from: this.currentUser,
    //   room:
    // }
  }
}
