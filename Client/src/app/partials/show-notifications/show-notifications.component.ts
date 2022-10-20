import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  this.notificationSubscription = this.userService.getUserByIDwithNotifications()
        .pipe(tap((data:any)=> {
          console.log(data.user);
          this.notifications = data.user.notifications;
          console.log(this.notifications);
        })).subscribe()
  }

  onViewNotification(notification:Notification){
    this.showSingleNotification = true;
    this.singleNotification = notification
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe()
  }

}
