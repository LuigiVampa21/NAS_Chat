import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNotificationsComponent } from '../partials/show-notifications/show-notifications.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notificationsNumber!:number;
  notifications!:Notification[];
  isAuth!:boolean;
  constructor(private authService: AuthService, private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getisAuth()
    this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth
      })
    this.userService.getUserFromLocalStorage()
        .subscribe((data:any) => {
          console.log(data.user);
          this.notifications = data.user.notifications;
          console.log(this.notifications);
          this.notificationsNumber = data.user.notifications.length;
          console.log(this.notifications.length);
        })
  }

  onShowNotifications(){
      this.dialog.open(ShowNotificationsComponent);
  }

  onLogout(){
    this.authService.logout()
  }

}
