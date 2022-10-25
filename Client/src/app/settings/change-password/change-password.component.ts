import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  getFormControlError(ctrl: AbstractControl){
    if(ctrl.hasError('required')){
      return 'This field is required'
    }else if (ctrl.hasError('email')){
      return  'Please enter a valid email'
    }else if (ctrl.hasError('minlength')){
      return 'Too short'
    }else if (ctrl.hasError('notMatch')){
      return 'both passwords needs to match'
    }else{
      return 'This field contains an error'
    }
  }

  onSubmit(f:NgForm){
    this.userService.updatePassword(f)
  }

}
