import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  imagePreview!:string;

  constructor(private authService: AuthService, private ref: ChangeDetectorRef) { }


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

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }

  onImageDropped(file:Event){
    console.log(file);

  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
