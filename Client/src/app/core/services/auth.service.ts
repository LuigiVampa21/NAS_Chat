import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';
import { loginResponse } from '../../shared/interfaces/login-response.interface'
import { Router } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL_REGISTER_USER = environment.USER_REGISTER;
  API_URL_LOGIN_USER = environment.USER_LOGIN;
  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;

  private isAuth!:boolean;
  private token!: string | undefined | null;

  private isAuth$ = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer;
  private userID!: string|null;
  private user!:User;
  private userSub$ = new Subject<User>();

  constructor(private http:HttpClient, private router:Router, private socketService: SocketService) { }

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

  onLogin(userData:any){
    return this.http.post<loginResponse>(this.API_URL_LOGIN_USER, userData)
    .pipe(
      tap(
        {
        next:(data:loginResponse) => {
          this.user = data.user;
          this.token = data.token;
          this.userID = data.user._id;
          if(this.token){
            const expiresInDuration = +data.expiring;
            this.setAuthTimer(expiresInDuration)
            this.isAuth = true;
            this.isAuth$.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
            this.saveAuthData(this.token, expirationDate, this.userID)
            this.socketService.ioConnect(this.user.email, userData.password);
            this.router.navigateByUrl('/home');
          }
        },
        error:(errorResponse) => {
          console.log(errorResponse.error);
          // this.isAuth$.next(false)
        }
      }
    )
   ).subscribe();
  }

  autoAuth(){
    const authInfo = this.getAuthData();
    if(!authInfo) return;
    // console.log(authInfo);
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    console.log(expiresIn);
    if(expiresIn < 0) return;
    this.token = authInfo.token;
    this.isAuth = true;
    this.isAuth$.next(true)
    this.userID = authInfo.userID;
    this.setAuthTimer(expiresIn / 1000)
    // this.setAuthTimer(expiresIn)
  }

  getisAuth(){
    return this.isAuth;
  }

  getToken(){
    return this.token;
  }

  getisAuth$():Observable<boolean>{
    return this.isAuth$.asObservable()
  }

  getUser$():Observable<User>{
    return this.userSub$.asObservable()
  }

  logout(){
    this.token = undefined;
    this.userID = null;
    this.isAuth = false;
    this.isAuth$.next(false);
    this.router.navigateByUrl('/');
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.socketService.socketOut();
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
      this.tokenTimer = setTimeout(()=> {
      this.logout()
    },duration * 1000);
  }
}
