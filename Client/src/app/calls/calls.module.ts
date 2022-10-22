import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CallsComponent } from './calls.component';
import { CallDetailComponent } from './call-detail/call-detail.component';
import { CallsRoutingModule } from './calls.routing';



@NgModule({
  declarations: [
    CallsComponent,
    CallDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CallsRoutingModule,
  ],
  exports: [
    CallsComponent,
    CallDetailComponent,
  ],
})
export class CallsModule { }
