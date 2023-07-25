import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }
  // ...
  public isAuthenticated(): boolean {
    let token: any;
    token = localStorage.getItem('access_token');
    if (token != undefined) {
      return true;
    } else {
      return false;
    }
  }

  public isTokenAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAuthenticatedMCCAdmin(): boolean {
    let token: any;
    if (localStorage.getItem('role') === 'mccadmin') {
      return true;
    } else {
      return false;
    }
  }


  public isAuthenticatedByWcuser(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('wcuser')) {
      return true;
    } else {
      return false;
    }
  }


  public isAuthenticatedbyMccUser(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('mccuser')) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedbyBmcAdminUser(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('bmcadmin')) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedbyTtsUser(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('ttsuser')) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedbyTtsUserAndDryingYard(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('ttsuser') || localStorage.getItem('role')?.includes('dryingyarduser')) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedbyDtyingYardUser(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('dryingyarduser')) {
      return true;
    } else {
      return false;
    }
  }

  public isAuthenticatedbyBmcSuperAdminUser(): boolean {
    let token: any;
    if (localStorage.getItem('role')?.includes('bmcsuperadminuser')) {
      return true;
    } else {
      return false;
    }
  }

}