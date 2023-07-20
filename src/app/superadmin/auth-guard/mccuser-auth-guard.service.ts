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
  if (!this.auth.isAuthenticated() || !this.auth.isAuthenticatedbyMccUser()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}



}