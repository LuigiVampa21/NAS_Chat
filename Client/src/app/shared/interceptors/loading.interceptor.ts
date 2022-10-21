import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { delay, Observable, tap } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  pendingRequests = 0;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> | any {

    this.loadingSpinnerService.showLoading();
    this.pendingRequests++;
    return next.handle(request)
      .pipe(
        tap({
          next:(event)=>{
            // if request id finished
            if(event.type === HttpEventType.Response){
              this.handleHideloading()
            }
          },
          error:() => {
            this.handleHideloading()
          }
        }))
  }

  handleHideloading(){
    this.pendingRequests--;
    if(this.pendingRequests === 0){
      this.loadingSpinnerService.hideLoading();
    }
  }
}
