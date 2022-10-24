import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email!:FormControl;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.email = new FormControl('', [Validators.required, Validators.email])
  }

  onSend(e:string){
    this.authService.forgotPassword(e);
  }
}
