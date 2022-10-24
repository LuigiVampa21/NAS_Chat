import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notifier-container',
  templateUrl: './notifier-container.component.html',
  styleUrls: ['./notifier-container.component.scss']
})
export class NotifierContainerComponent implements OnInit {

  status!:string;
  message!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
