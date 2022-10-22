import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserLogin } from '../../shared/interfaces/user.login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginSubscription!: Subscription;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  hide = true;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void { }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }
    if(this.loginForm.controls['email'].hasError('email')) {
      return 'Not a valid email'
    };

    if (this.loginForm.controls['password'].hasError('required')) {
      return 'You must enter a password';
    }
    return 'Wrong password';
  }


  submit(form:UserLogin) {
    if(this.loginForm.invalid)return;
     this.authService.onLogin(form)
  }
}
