import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { ChatDetailComponent } from "./chat-detail/chat-detail.component";
import { ChatsComponent } from "./chats.component";


const routes: Routes = [
  {path: '', component: ChatsComponent, canActivate: [AuthGuard]},
  {path:'chat-detail/:id', component: ChatDetailComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
})

export class ChatsRoutingModule { }
