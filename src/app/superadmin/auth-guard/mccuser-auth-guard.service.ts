import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MccUserAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  public canActivate(): boolean {
    if (!this.auth.isAuthenticated() || !this.auth.isAuthenticatedbyMccUser) {
      this.router.navigate(['login']);
      //return false;
    }
    return true;
  }
}