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
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    //  console.log("  Auth guard  token *******    ",localStorage.getItem('access_token'));
    console.log("  Auth guard  role  *******    ", localStorage.getItem('role'));
    console.log("  Auth guard  token  *******    ", token);
    if (token != undefined) {
      return true;
    } else {
      return false;
    }
  }

  public isTokenAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public isAuthenticatedMCCAdmin(): boolean {
    let token: any;
    // token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    //  console.log("  Auth guard  token *******    ",localStorage.getItem('access_token'));
    console.log("  Auth guard  role *******    ", localStorage.getItem('role'));
    if (localStorage.getItem('role') === 'mccadmin') {
      return true;
    } else {
      return false;
    }
  }


  public isAuthenticatedByWcuser(): boolean {
    let token: any;
    // token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    // console.log("  Auth guard  token *******    ",localStorage.getItem('access_token'));
    console.log("  Auth guard  role *******    ", localStorage.getItem('role'));
    if (localStorage.getItem('role') === 'wcuser') {
      return true;
    } else {
      return false;
    }
  }


  public isAuthenticatedbyMccUser(): boolean {
    let token: any;
    // token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    // console.log("  Auth guard  token *******    ",localStorage.getItem('access_token'));
    console.log("   Token expiry :::::::   ", this.isTokenAuthenticated());
    console.log("  Auth guard  role *******    ", localStorage.getItem('role'));
    if (localStorage.getItem('role')?.includes('mccuser')) {
      return true;
    } else {
      return false;
    }
  }



}