import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from './config-service.service';
import { isNullOrEmpty } from "./enums-global.enum";

@Injectable({
  providedIn: 'root'
})
export class CanActivateViaGuard implements CanActivate {

  // constructor(private authService:LoginService,private router: Router) { }
  constructor(private router: Router, private service: ConfigService) { }


  canActivate() {
    // if(!this.authService.isLogged()){
    //   console.log('No logged');
    //   this.router.navigate(['/']);
    //   return false;
    // }
    // let tmptoken = this.service.getToken();
    let flag = isNullOrEmpty(this.service.getToken());
    // flag = isNullOrEmpty(null);
    if (flag) {
      // console.log('No logged');
      this.router.navigate(['/users']);
      return false;
    }else{
      return true;
    }
  }

  // (next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // return true;
}


