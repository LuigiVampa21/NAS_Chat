import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLogin } from '../shared/interfaces/user.login.interface';
import { User } from '../shared/models/user.model';
import { loginResponse } from '../shared/interfaces/login-response.interface'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL_REGISTER_USER = environment.USER_REGISTER;
  API_URL_LOGIN_USER = environment.USER_LOGIN;
  // userSub$: BehaviorSubject<User> = new BehaviorSubject(this.getUserFromLocalStorage());
  // userObs$:Observable<User> = this.userSub$.asObservable();

  private isAuth = false;
  private token!: string | undefined;
  private isAuth$ = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer;
  private userID!: string|null;

  constructor(private http:HttpClient, private router:Router) { }

  onRegister(userData:User){
   return this.http.post<User>(this.API_URL_REGISTER_USER, userData)
  //  SHOW ALERT MESSAGES
//    .pipe(
//     tap(
//       {
//       next:(user:User) => {
//         this.setUserToLocalStorage(user)
//         this.userSub$.next(user);
//       },
//       error:(errorResponse) => {
//         console.log(errorResponse.error)
//       }
//     }
//   )
// )
  }

  onLogin(userData:loginResponse){
    return this.http.post<loginResponse>(this.API_URL_LOGIN_USER, userData)
    .pipe(
      tap(
        {
        next:(data:loginResponse) => {
          this.token = data.token;
          this.userID = data.user._id;
          if(this.token){
            const expiresInDuration = +data.expiring;
            this.setAuthTimer(+expiresInDuration)
            this.isAuth = true;
            this.isAuth$.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime()+ expiresInDuration *1000);
            this.saveAuthData(this.token, expirationDate, this.userID)
            this.router.navigateByUrl('/')
          }
        },
        error:(errorResponse) => {
          console.log(errorResponse.error);
          this.isAuth$.next(false)
        }
      }
    )
   )
  }

  autoAuth(){
    const authInfo = this.getAuthData();
    if(!authInfo) return;
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn < 0) return;
    this.token = authInfo.token;
    this.isAuth = true;
    this.userID = authInfo.userID;
    // this.setAuthTimer(expiresIn / 1000)
    this.setAuthTimer(+expiresIn)
    this.isAuth$.next(true)
  }

  getisAuth(){
    return this.isAuth;
  }

  getUserID(){
    return this.userID;
  }

  getToken(){
    return this.token;
  }
  getisAuth$():Observable<boolean>{
    return this.isAuth$.asObservable()
  }

  logout(){
    this.token = undefined;
    this.isAuth= false;
    this.isAuth$.next(false);
    this.router.navigateByUrl('/');
    clearTimeout(this.tokenTimer);
    this.userID = null;
    this.clearAuthData();
  }

  private saveAuthData(token:string, expirationDate: Date, userID:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userID', userID);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userID');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userID = localStorage.getItem('userID');
    if(!token || !expirationDate || !userID) return;
    return {
      token,
      expirationDate: new Date(expirationDate),
      userID
    }
  }

  private setAuthTimer(duration:number){
    console.log(duration);

    // this.tokenTimer = setTimeout(()=> {
    //   this.logout()
    // },duration * 1000);
  }
}
