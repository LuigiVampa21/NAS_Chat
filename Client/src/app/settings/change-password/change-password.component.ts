import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm!:FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.passwordForm = new FormGroup({
      'oldPassword': new FormControl('', Validators.minLength(8)),
      'newPassword': new FormControl('', Validators.minLength(8)),
    })
  }

  onSubmit(f:NgForm){
    this.userService.updatePassword(f)
  }

}
