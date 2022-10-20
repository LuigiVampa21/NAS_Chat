import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  userToAdd!:User

  constructor() { }

  setUserToAdd(user:User){
    this.userToAdd = user;
  }

  sendRequest(user:User){
    
  }
}
