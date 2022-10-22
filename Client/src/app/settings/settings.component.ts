import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
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

  constructor(private authService: AuthService) { }


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
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
