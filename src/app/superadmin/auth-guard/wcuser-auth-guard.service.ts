import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class B2bAuthGuardService  {


  constructor(public auth: AuthService, public router: Router) {}
  public canActivate(): boolean {


    console.log("  BMC Admin chk :::   "+this.auth.isAuthenticated());
    console.log("  WC Admin chk :::   "+this.auth.isAuthenticatedByWcuser);
    console.log("  MCC Admin chk :::   "+this.auth.isAuthenticatedbyMccUser());

    console.log("  Total check  ::  "+(!this.auth.isAuthenticated() || !this.auth.isAuthenticatedbyMccUser) && !this.auth.isAuthenticatedbyMccUser());

    if ((!this.auth.isAuthenticated() || !this.auth.isAuthenticatedByWcuser) && !this.auth.isAuthenticatedbyMccUser()) {
      this.router.navigate(['login']);    
    }
    return true;
  }
}