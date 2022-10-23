import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

  file:any;
  imagePreview!:string | undefined;
  photo!:FormControl<any>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onImageDropped(event:Event){
    this.file = (event.target as any).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(this.file);
  }

  onSendPicture(){
    if(!this.imagePreview) return;
    this.userService.updateUserPhoto(this.file);
    this.router.navigateByUrl('/settings')
  }
  onDropPicture(){
    this.imagePreview = undefined;
  }

}
