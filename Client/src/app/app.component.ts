import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isAuth!:boolean;

  constructor(private authService: AuthService){ }

ngOnInit(){
  // this.isAuth = this.authService.getisAuth()
  this.authService.autoAuth()
  // console.log(this.isAuth);
  // this.authService.getisAuth$()
  // .subscribe(auth => {
    // this.authService.autoAuth()
    // this.isAuth = auth;
    // console.log(auth);

    // this.authService.autoAuth()
      // })
  }
}
