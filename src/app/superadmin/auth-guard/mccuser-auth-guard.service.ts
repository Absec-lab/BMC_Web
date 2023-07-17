import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MccUserAuthGuardService  {
  constructor(public auth: AuthService, public router: Router) {}
 
  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  //  console.log('  Authenticated ::  inside mccuser auth :::::   ',this.auth.isAuthenticated());
  if (!this.auth.isAuthenticated() || !this.auth.isAuthenticatedbyMccUser()) {
  //  console.log('  Authenticated ::  inside mccuser auth 222    :::::   ',this.auth.isAuthenticated());
  //  console.log('  Authenticated ::  inside mccuser auth 3333    :::::   ',this.auth.isAuthenticatedbyMccUser());
    this.router.navigate(['/login']);
    return false;
  }
  // logged in, so return true
  //this.auth.isAuthenticatedbyMccUser();
  return true;
}



}