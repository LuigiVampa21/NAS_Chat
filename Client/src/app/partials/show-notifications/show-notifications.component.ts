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
  notifications!:Notification[];
  notificationSubscription!:Subscription;

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  this.notificationSubscription = this.userService.getUserByIDwithNotifications()
        .pipe(tap((data:any)=> {
          console.log(data.user);
          this.notifications = data.user.notifications;
        })).subscribe()
  }

  onViewNotification(notification:Notification){
    this.showSingleNotification = true;
    if(!notification._id) return;
    this.notificationService.getSingleNotificationWithUsers(notification._id)
        .pipe(tap((data:any)=> {
          console.log(data.notification.from);
          this.singleNotification = data.notification;
        })).subscribe()

  }

  onAccept(){
    this.showSingleNotification = false;
    // Delete notif from database and from notif array of User
    // patch rooms user to add the new room created
  }
  onDecline(){
    this.showSingleNotification = false;
    // Delete notif from database and from notif array of User
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe()
  }

}
