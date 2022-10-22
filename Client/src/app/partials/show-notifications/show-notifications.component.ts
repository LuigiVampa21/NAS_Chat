import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserService } from 'src/app/core/services/user.service';
import { Notification } from 'src/app/shared/models/notification.model';

@Component({
  selector: 'app-show-notifications',
  templateUrl: './show-notifications.component.html',
  styleUrls: ['./show-notifications.component.scss']
})
export class ShowNotificationsComponent implements OnInit, OnDestroy {

  showSingleNotification = false;
  singleNotification!:Notification;
  notifications!:Notification[]
  notificationSubscription!:Subscription;
  unsubArray:Subscription[] = [];

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initNotifications();
      }

      initNotifications(){
   this.unsubArray.push(this.userService.getUserByIDwithNotifications()
          .pipe(tap((data:any)=> {
            this.notifications = data.user.notifications;
          })).subscribe()
   )
  }


  onViewNotification(notification:Notification){
    this.showSingleNotification = true;
    if(!notification._id) return;
    this.unsubArray.push(this.notificationService.getSingleNotificationWithUsers(notification._id)
        .pipe(tap((data:any)=> {
          this.singleNotification = data.notification;
        })).subscribe()
    )
  }

  onAccept(){
    this.showSingleNotification = false;

    if(!this.singleNotification || !this.singleNotification._id) return;
    const penFriend = this.singleNotification.from._id
    this.unsubArray.push(this.userService.addFriendToUser(penFriend).subscribe())
    const roomToAdd = this.singleNotification.room
    this.unsubArray.push(this.userService.addRoomToUser(roomToAdd)
          .pipe(tap(()=> {
            this.onDeleteNotifications()
          })).subscribe()
    )
  }
  onDecline(){
    if(!this.singleNotification._id) return;
    this.showSingleNotification = false;
    this.onDeleteNotifications()
  }

  onDeleteNotifications(){
    if(!this.singleNotification._id) return;
    this.notificationService.deleteNotifcationFromUser(this.singleNotification._id)
    this.unsubArray.push(this.notificationService.deleteNotifications(this.singleNotification._id).subscribe())
  }

  ngOnDestroy(){
    this.unsubArray.forEach(u => u.unsubscribe())
  }
}
