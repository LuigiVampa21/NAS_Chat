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
  // options:User[] = this.friends;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchFriendInput = this.formBuilder.control('');
    this.userService.getUserByIDwithFriends()
      .subscribe((data:any) => {
        this.friends = data.user.friends;
        console.log(this.friends);
      })
    
    this.filteredOptions = this.searchFriendInput.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value);
        const name = typeof value === 'string' ? value : value?.name;

        return name ? this._filter(name as string) : this.friends?.slice();
      }),
    );
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.friends.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onViewfriend(friend:User){}
}
