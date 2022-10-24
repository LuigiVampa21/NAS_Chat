import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from '../../shared/interfaces/user.login.interface';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from 'src/app/partials/forgot-password/forgot-password.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // private readonly notifier!: NotifierService;

  loginSubscription!: Subscription;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  hide = true;

  constructor(private authService: AuthService, private router:Router, public dialog: MatDialog) { }

  ngOnInit(): void { }

  getFormControlError(ctrl: AbstractControl){
    if(ctrl.hasError('required')){
      return 'This field is required'
    }else if (ctrl.hasError('email')){
      return  'Please enter a valid email'
    }else{
      return 'This field contains an error'
    }
  }

  submit(form:UserLogin) {
    if(this.loginForm.invalid)return;
     this.authService.onLogin(form)
  }

  openDialog(){
    this.dialog.open(ForgotPasswordComponent)
  }
}
