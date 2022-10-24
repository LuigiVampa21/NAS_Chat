import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;
  API_PHOTO_UPLOAD = environment.USER_UPLOAD_PHOTO;

  userID!: string | null;
  userPseudo!: string | null;


  constructor(private http:HttpClient, private router: Router) {
    this.userID = localStorage.getItem('userID');
   }

  getUserByIDwithFriends(){
    // const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/friends')
  }

  getUserFromLocalStorage(){
    // const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID )
  }

  getUserByIDwithRooms(){
    // const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/rooms')
  }

  getUserByIDwithCalls(){
    // const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/calls')
  }

  getUserByIDwithNotifications(){
    // const userID = localStorage.getItem('userID');
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + this.userID + '/notifications')
  }

  getUserByID(id:string){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + id)
  }

  getAllusers(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER)
  }

  addRoomToUser(room:string){
    // const userID = localStorage.getItem('userID');
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

  }

  getUserPseudo():any{
    if(!this.userID) return;
    return this.getUserByID(this.userID)

  }

  uploadUserPhoto(file:any){
    const photoData = new FormData()
    photoData.append('image', file)
      this.http.post(this.API_PHOTO_UPLOAD + this.userID, photoData).subscribe( (data) => {
        console.log(data);
        this.router.navigateByUrl('/settings')
      });
  }

  addFriendToUser(friendID:string){
    // const userID = localStorage.getItem('userID');
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + this.userID,
      {
        friends: friendID
      }
    )
  }
}
