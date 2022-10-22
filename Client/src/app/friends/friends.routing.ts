import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { FriendsComponent } from "./friends.component";



const routes: Routes = [
  {path: '', component: FriendsComponent, canActivate: [AuthGuard]},

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class FriendsRoutingModule { }
