import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // isAuth!:boolean;

  constructor(private authService: AuthService, private router:Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // this.authService.getisAuth$()
      //     .subscribe( auth => {
      //       // this.isAuth = auth
      //       if(auth){
      //         return true;
      //       }else{
      //         this.router.navigateByUrl('/auth/login')
      //         return false;
      //       }
      const isAuth = this.authService.getisAuth()
      if(!isAuth){
        this.router.navigateByUrl('/auth/login')
      }
    return isAuth;

          }
}

