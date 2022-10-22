import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'nas-chat-client';
  isAuth!:boolean;
  isAuthSub = new Subscription()

  constructor(private authService: AuthService){ }

ngOnInit(){
  this.isAuth = this.authService.getisAuth();
 this.isAuthSub = this.authService.getisAuth$()
  .subscribe(auth => {
    this.isAuth = auth;
      })
}

ngOnDestroy(): void {
  this.isAuthSub.unsubscribe()
}
}
