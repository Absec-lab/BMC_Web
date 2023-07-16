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
      console.log('  Authenticated ::  ',this.auth.isAuthenticated());
    if (!this.auth.isAuthenticated() ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  constructor(public auth: AuthService, public router: Router) {}

}