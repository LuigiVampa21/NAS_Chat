import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

    showLoading(){
      console.log('spinner start');
      this.isLoadingSubject.next(true);
    }

    hideLoading(){
      console.log('spinner stop');
      this.isLoadingSubject.next(false);
    }

    get isLoading(){
      return this.isLoadingSubject.asObservable();
    }
}
