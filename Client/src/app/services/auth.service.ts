import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../shared/models/user.model';
import { loginResponse } from '../shared/interfaces/login-response.interface'
import { Router } from '@angular/router';
import { SocketService } from './socket.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL_REGISTER_USER = environment.USER_REGISTER;
  API_URL_LOGIN_USER = environment.USER_LOGIN;
  API_URL_GET_CURENT_USER = environment.GET_SINGLE_USER_BY_ID;
  API_URL_USER_FORGOT_PASSWORD = environment.USER_FORGOT_PASSWORD;
  API_URL_USER_RESET_PASSWORD = environment.USER_RESET_PASSWORD;
;
  private isAuth!:boolean;
  private token!: string | undefined | null;

  private isAuth$ = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer;
  private userID!: string|null;
  private user!:User;
  private userSub$ = new Subject<User>();

  constructor(
    private http:HttpClient,
    private router:Router,
    private socketService: SocketService,
    private notifier: NotifierService
    ) { }


  onRegister(userData:User){
   return this.http.post<User>(this.API_URL_REGISTER_USER, userData)
   .pipe(
    tap(
      {
      next:(data:any) => {
      this.notifier.notify('success', `Congrats ${data.user.pseudo}, you registered successfully!`);
    },
    error:(errorResponse) => {
      console.log(errorResponse.error)
      this.notifier.notify('error', errorResponse.error.msg);
      }
    }
  )
)
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
          this.notifier.notify('success', `Hello ${data.user.pseudo}, successful login! 😁`);
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
          this.notifier.notify('error', errorResponse.error.msg + ' 😞');
          this.isAuth$.next(false)
        }
      }
    )
   ).subscribe();
  }

  autoAuth(){
    const authInfo = this.getAuthData();
    if(!authInfo) return;
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if(expiresIn < 0) return;
    this.token = authInfo.token;
    this.isAuth = true;
    this.isAuth$.next(true)
    this.userID = authInfo.userID;
    this.setAuthTimer(expiresIn / 1000)
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
    this.notifier.notify('default', 'logout successful, see you soon! 😉');
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

  forgotPassword(email:string){
    this.http.post(this.API_URL_USER_FORGOT_PASSWORD, email)
        .pipe(tap({
          next:
        }))
  }

}
