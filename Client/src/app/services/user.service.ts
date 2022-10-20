import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;

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

  getUserByID(id:string){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER + id)

  }

  getAllusers(){
    return this.http.get<User>(this.API_URL_GET_CURENT_USER)
  }

  addRoomToUser(id:string,room:string){
    return this.http.patch<User>(this.API_URL_GET_CURENT_USER + id,
      {
        rooms: room
      }
    )
  }
}
