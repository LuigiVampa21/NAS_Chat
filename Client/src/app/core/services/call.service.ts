import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Call } from '../models/call.model';

@Injectable({
  providedIn: 'root'
})
export class CallService {
  API_URL_SINGLE_CALL = environment.GET_SINGLE_CALL_BY_ID;
  currentCall!:Call;
  currentCallSub$ = new Subject<Call>()
  currentCallObs$!:Observable<Call>;

  constructor(private http: HttpClient) {
    this.currentCallObs$ = this.currentCallSub$.asObservable()
   }

  getSingleCall(id:string){
    return this.http.get(this.API_URL_SINGLE_CALL+ id)
        .pipe(tap( (data:any) => {
          this.currentCall = data.call
          this.currentCallSub$.next(this.currentCall)
        }))
  }
}
