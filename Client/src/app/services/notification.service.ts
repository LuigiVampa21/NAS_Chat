import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Notification } from '../shared/models/notification.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  NOTIFICATION_URL = environment.NOTIFICATION_URL;

  constructor(private http:HttpClient) { }

  createNotification(notification:Notification){
    return this.http.post<Notification>(this.NOTIFICATION_URL, notification)
  }

  getSingleNotificationWithUsers(notifID:string){
    return this.http.get<Notification>(this.NOTIFICATION_URL + notifID + '/users')
  }

  deleteNotifications(notifID:string){
    this.http.delete<Notification>(this.NOTIFICATION_URL + notifID).subscribe()
  }


}
