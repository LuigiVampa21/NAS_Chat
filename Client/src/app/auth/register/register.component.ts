import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { PasswordsMatchValidator } from '../../shared/Validators/passwords-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  hide = true;
  registerForm!: FormGroup;
  registerSub!: Subscription;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        pseudo: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
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

  submit(form:User){
    if(this.registerForm.invalid) return;
     this.authService.onRegister(form)
        .subscribe(() => {
          this.router.navigateByUrl('/auth/login')
        })
  }
}


