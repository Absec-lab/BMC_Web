import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BmcWcMccUserAuthGuardService  {

  constructor(public auth: AuthService, public router: Router) {}


  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  if (!this.auth.isAuthenticated() || ( !this.auth.isAuthenticatedbyBmcAdminUser() && !this.auth.isAuthenticatedByWcuser() && !this.auth.isAuthenticatedbyMccUser() && !this.auth.isAuthenticatedbyBmcSuperAdminUser())) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}

}