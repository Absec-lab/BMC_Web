import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(public auth: AuthService, public router: Router) {}
  
  // public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.checkLogin(state.url);
  // }

  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    console.log('  Authenticated ::  ',this.auth.isAuthenticatedbyMccUser);
  if (!this.auth.isAuthenticatedbyMccUser) {
    this.router.navigate(['login']);
    return false;
  }
  // logged in, so return true
  this.auth.isAuthenticatedbyMccUser();
  return true;
}

  private checkLogin(url: string): boolean {
    if (localStorage.getItem('access_token')) { 
      return true;
    }
    else
  { 
    localStorage.clear();
    this.router.navigate(['login']);
    return false;}
  }
}