import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  token!:string;
  email!: string;

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail(){
    this.route.params
      .subscribe((params: Params) => {
        this.email = params['email'];
        this.initForm()
      }
    );
  }
  initForm() {
    throw new Error('Method not implemented.');
  }

  onSend(token:string){
    this.authService.verifyEmail(token, this.email).subscribe()
  }

}
