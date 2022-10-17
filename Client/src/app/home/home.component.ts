import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthResolver } from '../resolver/auth.resolver';
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
  // user$!:Observable<User> | any;
  user!:User;
  step = 0;
  photo!:string
  template_photo!:string;

  constructor(private authService: AuthService, private authResolver: AuthResolver, private route: ActivatedRoute ) { }

  tiles!: any[]

  ngOnInit(): any{
    // this.user = this.authService.getUser();
    // // console.log(this.user);
    this.initCard()
  //  this.route.data.pipe(
  //     map(data => {
  //       this.user = data['user']['user'];
  //       console.log(data['user']['user']);

  //     }
  //     )
  //   )
  // ADD friend to array
  }

  initCard(){
    this.authService.getUserByID()
        .subscribe( (data:any) => {
          this.user = data.user
          // console.log(data);
          this.photo = `../../assets/images/${this.user.photo}`

        })
  }

}
