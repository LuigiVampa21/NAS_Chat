import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { environment } from '../../environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;
  API_PHOTO_UPLOAD = environment.USER_UPLOAD_PHOTO;
  API_UPDATE_PWD = environment.USER_UPDATE_PWD;

  userID!: string | null;
  userPseudo!: string | null;


  constructor(private http:HttpClient, private router: Router) {
    this.userID = localStorage.getItem('userID');
   }

  getUserByIDwithFriends(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/friends')
  }

  getUserwithFriends(id:string){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + id + '/friends')
  }

  getUserFromLocalStorage(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID )
  }

  getUserByIDwithRooms(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/rooms')
  }

  getUserByIDwithCalls(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/calls')
  }

  getUserByIDwithNotifications(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/notifications')
  }

  getUserByID(id:string){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + id)
  }

  getAllusers(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER)
  }

  addRoomToUser(room:string){
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + this.userID,
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

  updateUser(values:any){
    this.http.patch(this.API_URL_GET_CURENT_USER + this.userID, values)
          .subscribe()
  }

  updatePassword(values:any){
    this.http.patch(this.API_UPDATE_PWD + this.userID, values)
          .subscribe( (data) => {
            console.log(data);
            this.router.navigateByUrl('/settings')
          })
  }

  getUserPseudo():any{
    if(!this.userID) return;
    return this.getUserByID(this.userID)

  }

  uploadUserPhoto(file:any){
    const photoData = new FormData()
    photoData.append('image', file)
      this.http.post(this.API_PHOTO_UPLOAD + this.userID, photoData).subscribe( () => {
        this.router.navigateByUrl('/settings')
      });
  }

  addFriendToUser(friendID:string){
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + this.userID,
      {
        friends: friendID
      }
    )
  }
}
