import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAuth!:boolean;

  constructor(private authService: AuthService, private router:Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.getisAuth$()
          .subscribe( auth => {
            this.isAuth = auth
          }
      )
      // if(!this.isAuth){
      //   this.router.navigateByUrl('/auth/login')
      //   return false;
      // }
    return true;
  }

}
