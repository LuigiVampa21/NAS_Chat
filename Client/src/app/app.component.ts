import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nas-chat-client';
  isAuth!:boolean;

  constructor(private authService: AuthService){ }

ngOnInit(){
  this.isAuth = this.authService.getisAuth();
  this.authService.getisAuth$()
  .subscribe(auth => {
    this.isAuth = auth;
    this.authService.autoAuth()
      })
}
}
