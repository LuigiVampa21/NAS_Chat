import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initNotifications();
  // this.notificationSubscription = this.userService.getUserByIDwithNotifications()
  //       .pipe(tap((data:any)=> {
  //         this.notifications = data.user.notifications;
  //         console.log(data.user.notifications);
  //       })).subscribe()
      }

      initNotifications(){
    this.notificationSubscription = this.userService.getUserByIDwithNotifications()
          .pipe(tap((data:any)=> {
            this.notifications = data.user.notifications;
            // console.log(data.user.notifications);
          })).subscribe()

  }


  onViewNotification(notification:Notification){
    this.showSingleNotification = true;
    if(!notification._id) return;
    this.notificationService.getSingleNotificationWithUsers(notification._id)
        .pipe(tap((data:any)=> {
          this.singleNotification = data.notification;
        })).subscribe()
  }

  onAccept(){
    this.showSingleNotification = false;

    if(!this.singleNotification || !this.singleNotification._id) return;
    const penFriend = this.singleNotification.from._id
    this.userService.addFriendToUser(penFriend).subscribe()
    const roomToAdd = this.singleNotification.room
    this.userService.addRoomToUser(roomToAdd)
          .pipe(tap(()=> {
            this.onDeleteNotifications()
          })).subscribe()
  }
  onDecline(){
    if(!this.singleNotification._id) return;
    this.showSingleNotification = false;
    this.onDeleteNotifications()
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe()
  }

  onDeleteNotifications(){
    // On Delete Notification We need to send notification to header to get new info from DB
    if(!this.singleNotification._id) return;
    this.notificationService.deleteNotifcationFromUser(this.singleNotification._id)
    this.notificationService.deleteNotifications(this.singleNotification._id).subscribe()
    // this.initNotifications();
  }

}
