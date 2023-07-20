import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TtsUserAuthGuardService  {
  constructor(public auth: AuthService, public router: Router) {}
 
  canActivate():boolean{

  if (!this.auth.isAuthenticatedbyTtsUser()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}



}