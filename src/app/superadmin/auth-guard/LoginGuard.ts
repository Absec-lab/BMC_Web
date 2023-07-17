import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class LoginGuard {

    canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
     // console.log('  Authenticated ::  ',this.auth.isAuthenticated());
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    // logged in, so return true
    this.auth.isAuthenticatedbyMccUser();
    return true;
  }

  constructor(public auth: AuthService, public router: Router) {}

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     if (this.identityService.isLoggedIn()) { // determine if the uder is logged in from this method.
    //         return true;
    //     }
    //     this.router.navigate(['/superadmin/login']);
    //     return false;
    // }
}