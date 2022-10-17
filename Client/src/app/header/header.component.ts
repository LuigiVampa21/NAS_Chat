import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth
      })
  }

  onLogout(){
    this.authService.logout()
  }

}
