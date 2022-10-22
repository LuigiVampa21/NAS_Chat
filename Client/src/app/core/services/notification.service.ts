import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Notification } from '../../shared/models/notification.model';
import { User } from '../../shared/models/user.model';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // private user!:User;
  // private notifications!:Notification[];

  API_URL_DELETE_NOTIFICATION_FROM_USER = environment.DELETE_NOTIFICATION_FROM_USER;

  private userSub$ = new Subject();
  private notificationsSub$ = new Subject();

  NOTIFICATION_URL = environment.NOTIFICATION_URL;
  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;

  constructor(private http:HttpClient, private userService: UserService) {
    // const userID = localStorage.getItem('userID');
    // this.userService.getUserByIDwithNotifications()
    //     .subscribe((data:any) => {
    //       this.userSub$.next(data.user)
    //       this.notificationsSub$.next(data.user.notifications)
    //     })
   }

  getUser(){
    return this.userSub$.asObservable();
  }

  getUserNotifications(){
    return this.notificationsSub$.asObservable()
  }

  createNotification(notification:Notification){
    return this.http.post<Notification>(this.NOTIFICATION_URL, notification)
  }

  getSingleNotificationWithUsers(notifID:string){
    return this.http.get<Notification>(this.NOTIFICATION_URL + notifID + '/users')
  }

  deleteNotifications(notifID:string){
    return this.http.delete<Notification>(this.NOTIFICATION_URL + notifID)
  }

  deleteNotifcationFromUser(notifID:string){
    const userID = localStorage.getItem('userID');
    console.log(notifID);
  this.http.patch<any>(this.API_URL_DELETE_NOTIFICATION_FROM_USER + userID, {
    notifID
    }).subscribe((data:any)=> {
      this.notificationsSub$.next(data.newNotifArray
        )
    })
  }


}
