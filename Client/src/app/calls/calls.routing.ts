import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { CallDetailComponent } from "./call-detail/call-detail.component";
import { CallsComponent } from "./calls.component";

const routes: Routes = [
  {path: '', component: CallsComponent, canActivate: [AuthGuard]},
  {path:'call-detail/:id', component: CallDetailComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class CallsRoutingModule { }
