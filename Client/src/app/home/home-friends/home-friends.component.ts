import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home-friends',
  templateUrl: './home-friends.component.html',
  styleUrls: ['./home-friends.component.scss']
})
export class HomeFriendsComponent implements OnInit {

  @Input() friends!:User[];

  constructor() { }

  ngOnInit(): void {
  }

  

}
