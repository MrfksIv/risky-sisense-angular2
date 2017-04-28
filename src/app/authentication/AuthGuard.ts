import { NgModule, Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable()
export class AuthAccessGuard implements CanActivate {

  constructor(private router: Router){}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const ACCESS_TOKEN = localStorage.getItem('sisenseToken');
    console.log('IN AUTH-GUARD!!');
    console.log(ACCESS_TOKEN);

    if(!ACCESS_TOKEN) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}