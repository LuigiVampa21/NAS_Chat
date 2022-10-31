import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  token!:string;

  constructor() { }

  ngOnInit(): void {
  }

  onSend(token:string){
    console.log(token);
  }

}
