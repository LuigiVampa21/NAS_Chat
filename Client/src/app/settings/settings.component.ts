import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  user!:User;
  step = 0;
  authSub!:Subscription;
  file!:any;
  settingForm!:FormGroup;

  constructor(private authService: AuthService, private ref: ChangeDetectorRef, private userService: UserService) { }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
   this.authSub = this.authService.getUser$()
    .subscribe(user => {
      this.user = user;
        })
    this.initForm()
  }

  initForm(){
    this.settingForm = new FormGroup({
      'name': new FormControl('', Validators.minLength(3)),
      'pseudo': new FormControl('', Validators.minLength(1)),
      'phone': new FormControl('', Validators.minLength(3)),
      'email': new FormControl('', Validators.minLength(3)),
    })

  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onSaveSettings(f:NgForm){

  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
