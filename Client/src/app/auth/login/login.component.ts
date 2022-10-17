import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { any } from 'joi';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogin } from '../../shared/interfaces/user.login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  hide = true;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  // getErrorMessage() {
  //   if (this.loginForm.controls['email'].hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  // }


  submit(form:any) {
    if(this.loginForm.invalid)return;
    this.authService.onLogin(form)
        .subscribe(() => {
          this.router.navigateByUrl('/home')
        })
  }

}