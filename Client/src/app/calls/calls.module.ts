import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CallsComponent } from './calls.component';
import { CallDetailComponent } from './call-detail/call-detail.component';



@NgModule({
  declarations: [
    CallsComponent,
    CallDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CallsComponent,
    CallDetailComponent,
  ],
})
export class CallsModule { }
