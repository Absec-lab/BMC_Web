import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BmcWcAdminUserAuthGuardService  {
  constructor(public auth: AuthService, public router: Router) {}
 
  canActivate():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  if (!this.auth.isAuthenticated() || (!this.auth.isAuthenticatedbyBmcAdminUser() && !this.auth.isAuthenticatedByWcuser())) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}



}