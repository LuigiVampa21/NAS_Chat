import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  API_URL_MESSAGE = environment.GET_SINGLE_MESSAGE_BY_ID

  constructor(private http: HttpClient) { }

  GetSignleMessageByID(id:string){
  return this.http.get(this.API_URL_MESSAGE + id)
  }


}
