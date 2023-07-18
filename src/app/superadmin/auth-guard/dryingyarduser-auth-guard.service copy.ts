import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DryingYardUserAuthGuardService  {
  constructor(public auth: AuthService, public router: Router) {}
 
  canActivate():boolean{

  if (!this.auth.isAuthenticatedbyDtyingYardUser()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}



}