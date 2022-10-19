import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment'
import { Message } from '../shared/models/message.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  URL = environment.BASE_SERVER_URL
  socket!: any;
  currentUserID!:string;

  constructor( private http: HttpClient, private userService: UserService) {
    this.getCurrentUserID();

   }

  ioConnect(email:string,password:string){
    console.log(email,password, "socket service");
    this.socket = io(this.URL);
    this.socket.emit('login', {email,password})
    this.openApp();

  }

  getCurrentUserID(){
    this.currentUserID = localStorage.getItem('userID') || '';
  }

  openApp(){
    this.socket.on("login success", () => {
      console.log("socket login success");

      this.loadEvents()
    })

    this.socket.on("wrong credentials", () =>{
      console.log("socket login error");
      this.socket.disconnect()
    })
  }

  loadEvents(){

  }

  // joinRoom(data:{}): void {
  //   this.socket.emit('join', data)
  // }
  sendMessage(msg:Message):void{
    this.socket.emit('message', msg)
  }

  onJoinRoom(room:string|undefined){
    if(!room) return;
    this.socket.emit('join room', room)
  }
  onLeaveRoom(){}
}
