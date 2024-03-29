import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environment';
import { Room } from '../shared/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  API_URL_SINGLE_ROOM = environment.GET_SINGLE_ROOM_BY_ID;
  currentRoom!:Room;
  currentRoomSub$ = new Subject<Room>()
  currentRoomObs$!:Observable<Room>;

  constructor(private http: HttpClient) {
    this.currentRoomObs$ = this.currentRoomSub$.asObservable()
   }

  getSingleRoom(id:string){
    return this.http.get(this.API_URL_SINGLE_ROOM + id)
        .pipe(tap( (data:any) => {
          this.currentRoom = data.room
          this.currentRoomSub$.next(this.currentRoom)
        }))
  }

  createNewRoom(room:Room){
    return this.http.post<Room>(this.API_URL_SINGLE_ROOM, room)
    }
}
