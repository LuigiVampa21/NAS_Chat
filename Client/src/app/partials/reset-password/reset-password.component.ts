import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordComponent } from 'src/app/settings/change-password/change-password.component';
import { PasswordsMatchValidator } from 'src/app/shared/Validators/passwords-match.validator';
ChangePasswordComponent

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!:FormGroup;
  token!:string;
  email!:string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEmail()
    this.getToken()
  }

  getEmail(){
    this.route.queryParams
      .subscribe(params => {
        this.email = params['email'];
        this.initForm()
      }
    );
  }

  getToken(){
    this.route.params
    .subscribe((params: Params)=>{
      if(!params['token']) return;
      this.token = params['token']
    })
  }

  initForm(){
    this.resetPasswordForm = this.formBuilder.group({
      email: this.formBuilder.control(this.email, [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(''),
  },{
      validators: [PasswordsMatchValidator('password','confirmPassword')],
      updateOn: 'blur'
  });
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
    this.authService.resetPassword(f, this.token)
        .subscribe()
  }

}
