import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { SettingsComponent } from "./settings.component";
import { UploadPhotoComponent } from "./upload-photo/upload-photo.component";



const routes: Routes = [
  {path: '', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'upload-photo', component: UploadPhotoComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class SettingsRoutingModule { }
