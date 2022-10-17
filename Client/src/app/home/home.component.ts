import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user.model';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user!:User;
  step = 0;

  constructor(private authService: AuthService) { }

  // tiles!: Tile[]

  ngOnInit(): void {
    setTimeout( () => {
      this.initCard()
    },2000)
  }

  initCard(){
    this.authService.getUser$()
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
      // this.tiles = [
      //   {text: this.user.name, cols: 3, rows: 1, color: 'lightblue'},
      //   {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      //   {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      //   {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      // ];
        })
  }

}
