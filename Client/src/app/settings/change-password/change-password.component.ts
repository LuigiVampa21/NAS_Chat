import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.passwordForm = new FormGroup({
      'oldPassword': new FormControl('', Validators.minLength(8)),
      'newPassword': new FormControl('', Validators.minLength(8)),
    })
  }
  

}
