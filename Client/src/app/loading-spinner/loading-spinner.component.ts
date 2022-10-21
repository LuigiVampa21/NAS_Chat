import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {

  isLoading:boolean = false;

  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {
    this.loadingSpinnerService.isLoading
        .subscribe(loader => {
          this.isLoading = loader
          console.log(loader);

        })
  }

}
