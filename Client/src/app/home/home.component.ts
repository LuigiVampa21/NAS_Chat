import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  user!:User;
  photo!:string
  status = 'Online';
  friends!: User[];
  statusArray = ["Online", "Occuped", "Working", "Offline"]
  statusIcons: any = {
    "Online": "person_pin",
    "Occuped": "self_improvement",
     "Working": "work",
     "Offline": "person_off"
  }

  constructor(private userService: UserService, private authService: AuthService) { }


  ngOnInit(): void{
    this.user = this.authService.getUser();
  }

  ngAfterViewInit(): void {
    this.user = this.authService.getUser();
    this.initCard()
  }

  initCard(){
    this.userService.getUserByIDwithFriends()
    .subscribe( (data:any) => {
      this.user = data.user;
      this.photo = `../../assets/images/${this.user.photo}`
          this.friends = data.user.friends
          this.initFriendsPhoto()
        })
  }

  initFriendsPhoto(){
    if(!this.friends)return;
    this.friends
      .forEach(f => {
        f.photo = `../../assets/images/${f.photo}`
      })
  }

  setStatus(status:string){
    this.status = status
  }

}
