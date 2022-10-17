import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pseudo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // photo: new FormControl(''),
      // password: new FormControl('', [Validators.required, Validators.minLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl(''),
    },{
        validators: PasswordsMatchValidator('password','confirmPassword')
    });
  }

  submit(form:User){
    if(this.registerForm.invalid) return;
    this.authService.onRegister(form)
        .subscribe(() => {
          this.router.navigateByUrl('/auth/login')
        })

  }
}
