import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WcUserAuthGuardService  {


  constructor(public auth: AuthService, public router: Router) {}
  // public canActivate(): boolean {
  //   if ((!this.auth.isAuthenticated() || !this.auth.isAuthenticatedByWcuser) && !this.auth.isAuthenticatedbyMccUser()) {
  //     this.router.navigate(['login']);    
  //   }
  //   return true;
  // }


  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  //  console.log('  Authenticated ::  inside Wcuser auth :::::   ',this.auth.isAuthenticated());
  //  console.log('  Authenticated ::  inside Wcuser auth 222 ********   :::::   ',this.auth.isAuthenticated());
  //  console.log('  Authenticated ::  inside Wcuser auth 3333  ********     :::::   ',this.auth.isAuthenticatedbyMccUser());
  //  console.log('  Authenticated ::  inside Wcuser auth 4444   ********    :::::   ',this.auth.isAuthenticatedByWcuser());
  if (!this.auth.isAuthenticated() && (!this.auth.isAuthenticatedByWcuser() || !this.auth.isAuthenticatedbyMccUser())) {
  //  console.log('  Authenticated ::  inside Wcuser auth 222    :::::   ',this.auth.isAuthenticated());
  //  console.log('  Authenticated ::  inside Wcuser auth 3333    :::::   ',this.auth.isAuthenticatedbyMccUser());
  //  console.log('  Authenticated ::  inside Wcuser auth 4444    :::::   ',this.auth.isAuthenticatedByWcuser());
    this.router.navigate(['/login']);
    return false;
  }
  // logged in, so return true
  //this.auth.isAuthenticatedbyMccUser();
  return true;
}

}