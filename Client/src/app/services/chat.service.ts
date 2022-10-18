import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  API_URL_SINGLE_ROOM = environment.GET_SINGLE_ROOM_BY_ID;

  constructor(private http: HttpClient) { }

  getSingleRoom(id:string){
    return this.http.get(this.API_URL_SINGLE_ROOM + id)
  }
}
