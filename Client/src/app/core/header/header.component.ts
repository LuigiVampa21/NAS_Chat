import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNotificationsComponent } from '../../partials/show-notifications/show-notifications.component';
import { NotificationService } from '../services/notification.service';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notificationsNumber!:number;
  notifications!:Notification[];
  isAuth = false;
  user!:User;
  notificationSub!:Subscription;

  constructor(
              private authService: AuthService,
              private notificationService: NotificationService,
              public dialog: MatDialog
              ) { }

  ngOnInit(): void {
    this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth
      })
      if(this.isAuth){
        this.notificationService.getUser()
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
}
