import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!:boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getisAuth()
    this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth
        // console.log(this.isAuth);
      })
  }

  onLogout(){
    this.authService.logout()
  }

}
