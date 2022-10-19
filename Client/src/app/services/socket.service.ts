import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environments/environment'
import { Message } from '../shared/models/message.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  URL = environment.BASE_SERVER_URL
  API_MESSAGE = environment.MESSAGE_URL;
  API_ROOMS = environment.GET_SINGLE_ROOM_BY_ID;
  socket!: any;
  currentUserID!:string;
  message!:Message;
  message$ = new BehaviorSubject<any>(this.message)

  constructor( private http: HttpClient, private userService: UserService) { }

  ioConnect(email:string,password:string){
    this.socket = io(this.URL);
    this.socket.emit('login', {email,password})
    this.openApp();
  }

  getCurrentUserID(){
    this.currentUserID = localStorage.getItem('userID') || '';
  }

  openApp(){
    // this.socket.on("login_success", () => {
    //   // this.loadEvents()
    // })

    // this.socket.on("wrong_credentials", () =>{
    //   this.socket.disconnect()
    // })
  }

  // loadEvents(){

  // }

  onSendMessage(msg:Message):void{
    this.socket.emit('send_message', msg);
    this.socket.on('new_message', (data:Message) => {
      this.message = data;
      console.log(data);
      this.message$.next(data)
  })
  }

  onJoinRoom(room:string|undefined){
    if(!room) return;
    this.socket.emit('join_room', room)
  }

  onLeaveRoom(room:string){
    this.socket.emit('leave_room', room)
  }

  getMessageObservable(): Observable<Message> {
    return this.message$.asObservable()
  }

  getMessage(){
  this.socket.on('new-message', (data:Message) => {
      this.message = data;
      if(!this.message) return;
      this.http.post<any>(this.API_MESSAGE, data)
          .pipe(tap(console.log));
      this.message$.next(this.message)
  })
  }

  // getMessage(): Observable<Message>{
  //   return new Observable<Message>( observer => {
  //     this.socket.on('new_message', (data:Message) => {
  //       console.log(data);
  //       observer.next(data);
  //     });
      // return() => {
      //   this.socket.disconnect();
      // }
  //   })
  // }
}

