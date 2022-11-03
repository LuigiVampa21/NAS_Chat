import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '../../environment'
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
  message$ = new BehaviorSubject<any>('');

  constructor( private http: HttpClient, private userService: UserService) { }

  ioConnect(email:string,password:string){
    this.socket = io(this.URL);
    this.socket.emit('login', {email,password})
    this.socket.on('new_message', (data:Message) => {
    this.message$.next(data)
     }
    )
  }

  getCurrentUserID(){
    this.currentUserID = localStorage.getItem('userID') || '';
  }

  onSendMessage(msg:Message):void{
    this.socket.emit('send_message', msg);
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

  SendMessageToDB(data:Message){
  return this.http.post<Message>(this.API_MESSAGE, data)
    .pipe(
        tap((data:any)=> {
          const { _id, room } = data.newMessage
          this.sendMessageToRoom(_id, room)
        }))
  }

  sendMessageToRoom(msgID:string, msgRoom:string){
  return this.http.patch<Message>(this.API_ROOMS + msgRoom,{
      "message": msgID
      })
      .subscribe()
  }

  socketOut(){
    this.socket.emit('end');
  }
}

