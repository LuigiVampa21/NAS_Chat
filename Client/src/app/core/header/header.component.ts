import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNotificationsComponent } from '../../partials/show-notifications/show-notifications.component';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  notificationsNumber!:number;
  notifications!:Notification[];
  isAuth!:boolean;
  user!:User;
  AuthSub!:Subscription;
  userSub!:Subscription;
  notificationSub!:Subscription;

  constructor(
              private authService: AuthService,
              private notificationService: NotificationService,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getisAuth()
    this.AuthSub = this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth
      })
      if(this.isAuth){
        this.userSub = this.notificationService.getUser()
        .subscribe((data:any)=> {
          this.user = data;
        })

        this.notificationSub = this.notificationService.getUserNotifications()
        .subscribe((data:any)=> {
          this.notifications = data;
          this.notificationsNumber = data.length;
        })
      }
  }

  onShowNotifications(){
      this.dialog.open(ShowNotificationsComponent);
  }

  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(): void {
    this.AuthSub.unsubscribe();
    this.userSub.unsubscribe();
    this.notificationSub.unsubscribe();
  }

}
