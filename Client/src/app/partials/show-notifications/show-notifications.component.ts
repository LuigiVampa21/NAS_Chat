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
  this.notificationSubscription = this.userService.getUserByIDwithNotifications()
        .pipe(tap((data:any)=> {
          console.log(data.user);
          this.notifications = data.user.notifications;
          console.log(data.user.notifications);
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

    // Get PenFRIEND ID FROM NOTIF
    const penFriend = this.singleNotification.from._id

    // ADD TO FRIENDS
    this.userService.addFriendToUser(penFriend).subscribe()

    // GET ROOM ID FROM NOTIF
    const roomToAdd = this.singleNotification.room

    // ADD THAT ROOM ID INTO ROOMS OF CURRENTUSER
    this.userService.addRoomToUser(roomToAdd).subscribe()

    // if(!this.singleNotification._id) return;

    // patch rooms user to add the new room created
    this.userService.deleteNotifcationFromUser(this.singleNotification._id)

    // Delete notif from database and from notif array of User
    this.notificationService.deleteNotifications(this.singleNotification._id)

  }
  onDecline(){
    if(!this.singleNotification._id) return;
    this.showSingleNotification = false;
    this.notificationService.deleteNotifications(this.singleNotification._id)
    this.userService.deleteNotifcationFromUser(this.singleNotification._id)
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe()
  }

}
