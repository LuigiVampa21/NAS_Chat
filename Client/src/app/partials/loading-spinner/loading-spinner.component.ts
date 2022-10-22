import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from '../../core/services/loading-spinner.service';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {

  isLoading:boolean = false;
  spinnerSub!:Subscription;

  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {
  this.spinnerSub = this.loadingSpinnerService.isLoading
        .subscribe(loader => {
          this.isLoading = loader
        })
  }

  ngOnDestroy(): void {
    this.spinnerSub.unsubscribe();
  }

}
