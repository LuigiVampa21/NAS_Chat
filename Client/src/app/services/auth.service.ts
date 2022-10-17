import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLogin } from '../shared/interfaces/user.login.interface';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL_REGISTER_USER = environment.USER_REGISTER;
  API_URL_LOGIN_USER = environment.USER_LOGIN;
  userSub$: BehaviorSubject<User> = new BehaviorSubject(this.getUserFromLocalStorage());
  userObs$!:Observable<User>;

  constructor(private http:HttpClient) { }

  onRegister(userData:User){
   return this.http.post<User>(this.API_URL_REGISTER_USER, userData)
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

  onLogin(userData:UserLogin){
    return this.http.post<User>(this.API_URL_LOGIN_USER, userData)
    .pipe(
      tap(
        {
        next:(user:User) => {
          this.setUserToLocalStorage(user)
          this.userSub$.next(user);
        },
        error:(errorResponse) => {
          console.log(errorResponse.error);
        }
      }
    )
)
  }

  get currentUser() :User{
    return this.userSub$.value;
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem('User', JSON.stringify(user))
   }

   private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem('User');
    if(!userJson) return new User();
    return JSON.parse(userJson)
   }
}
