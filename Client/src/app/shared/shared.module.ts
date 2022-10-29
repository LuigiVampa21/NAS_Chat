import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './pipes/shorten.pipe';
import { DateTimePipe } from './pipes/date-time.pipe';



@NgModule({
  declarations: [
    ShortenPipe,
    DateTimePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShortenPipe,
    DateTimePipe,

  ]
})
export class SharedModule { }
