import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'nas-chat-client';
  isAuth = false;

  constructor(private authService: AuthService){ }

ngOnInit(){
  this.authService.autoAuth()
  this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth
      })
}
}
