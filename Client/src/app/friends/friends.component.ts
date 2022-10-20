import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends!:User[];
  users!:User[];
  searchFriendInput!: FormControl;
  searchUserInput!: FormControl;
  filteredOptions!: Observable<User[]>;
  filteredUsers!: Observable<User[]>
  friendSelected!: User;
  userSelected!: User;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchFriendInput = this.formBuilder.control('');
    this.searchUserInput = this.formBuilder.control('');
    this.userService.getUserByIDwithFriends()
      .subscribe((data:any) => {
        this.friends = data.user.friends;
      })
      this.userService.getAllusers()
      .subscribe((data:any)=> {
        this.users = data.allUsers
      })
    this.filteredOptions = this.searchFriendInput.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.friends) : this.friends?.slice();
      }),
    );

    this.filteredUsers = this.searchUserInput.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string, this.users ) : this.users?.slice();
      }),
    );
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string, type:any): User[] {
    const filterValue = name.toLowerCase();
    return type.filter((option:any) => option.name.toLowerCase().includes(filterValue));
  }

  getFriend(user:User){
    console.log(user);

  }
  getUser(user:User){
    console.log(user);

  }

  onViewfriend(friend:User){
    console.log(friend);

  }
}
