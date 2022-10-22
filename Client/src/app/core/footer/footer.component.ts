import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAuth!:boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getisAuth();
    this.authService.getisAuth$()
      .subscribe(auth => {
        this.isAuth = auth;
      })
  }

}
