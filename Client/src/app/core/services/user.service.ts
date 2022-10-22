import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;

  // API_URL_DELETE_NOTIFICATION_FROM_USER = environment.DELETE_NOTIFICATION_FROM_USER;

  constructor(private http:HttpClient) { }

  getUserByIDwithFriends(){
    const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + userID + '/friends')
  }

  getUserFromLocalStorage(){
    const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + userID )
  }

  getUserByIDwithRooms(){
    const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + userID + '/rooms')
  }

  getUserByIDwithCalls(){
    const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + userID + '/calls')
  }

  getUserByIDwithNotifications(){
    const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + userID + '/notifications')
  }

  getUserByID(id:string){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + id)

  }

  getAllusers(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER)
  }

  addRoomToUser(room:string){
    const userID = localStorage.getItem('userID');
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + userID,
      {
        rooms: room
      }
    )
  }

  sendNotification(notificationID:string, id:string){
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + id,
      {
        notifications: notificationID
      }
    )
  }

  // deleteNotifcationFromUser(notifID:string){
  //   const userID = localStorage.getItem('userID');
  //   console.log(notifID);
  // this.http.patch<any>(this.API_URL_DELETE_NOTIFICATION_FROM_USER + userID, {
  //   notifID
  //   }).subscribe()
  // }

  addFriendToUser(friendID:string){
    const userID = localStorage.getItem('userID');
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + userID,
      {
        friends: friendID
      }
    )
  }
}