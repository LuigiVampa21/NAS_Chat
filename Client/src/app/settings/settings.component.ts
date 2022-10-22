import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
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
  file!:any;
  settingForm!:FormGroup;
  photo!:FormControl<any>;

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

  onImageDropped(event:Event){
    this.file = (event.target as any).files[0];
    // const file = (event.target as any).files[0];
    // this.settingForm.patchValue({photo: file});
    // this.settingForm.patchValue({photo: file});
    // this.settingForm.get('photo')?.updateValueAndValidity()
    // this.settingForm.get('photo')?.updateValueAndValidity()
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(this.file);
  }

  onSaveSettings(f:NgForm){
    if(!this.settingForm.value){
      this.userService.updateUser(f);
    }

  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onSendPicture(){
    console.log(this.file);

  }
  onDropPicture(){}

}
