import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room } from '../shared/models/room.model';
import { User } from '../shared/models/user.model';
import { ChatService } from './chat.service';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  // ADD SECURITY SO USER CAN ONLY ASK ONCE TO BE FRIENDS

  userToAdd!:User;
  currentUser!:User;
  ROOMS_URL = environment.GET_SINGLE_ROOM_BY_ID;
  NOTIFICATIONS_URL = environment.NOTIFICATION_URL
  constructor(private userService: UserService, private chatService: ChatService, private notificationService: NotificationService) { }

  setUserToAdd(user:User){
    this.userToAdd = user;
  }

  sendRequest(user:User){
    this.getCurrentUser();
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
    // this.userService.addRoomToUser(this.currentUser._id, newRoom._id)
    this.userService.addRoomToUser(newRoom._id)
        .pipe(tap(()=> {
          if (!newRoom._id) return
          this.createNotification(newRoom._id)
        }))
        .subscribe()
      }

      createNotification(roomID:string){
        if(!this.currentUser._id) return;
        const notification = {
          sort: "Friend Request",
          from: this.currentUser._id,
          room: roomID
        }
        this.notificationService.createNotification(notification)
            .pipe(tap((data:any)=> {
              const { _id } = data.newNotification;
              console.log(_id);
              if (!this.userToAdd._id) return
              this.sendNotificationToPenFriend(_id, this.userToAdd._id)
            })).subscribe()

  }

  sendNotificationToPenFriend(notificationID:string, userID:string){
    if(!this.userToAdd._id)return;
    this.userService.sendNotification(notificationID, userID).subscribe()
    this.addAsFriend()
  }

  addAsFriend(){
    if(!this.userToAdd._id)return;
    this.userService.addFriendToUser(this.userToAdd._id).subscribe()
  }
}
