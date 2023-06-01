import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs';
import { LoginReq } from 'src/app/model/pit.model';
import { LoginModel, UserInfo } from 'src/app/model/user.model';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  checkagreeterms: any;
  constructor(private service: CommonService,private route:Router) {
  }
  loginResponse:any
  form = new FormGroup({
    emailId: new FormControl,
    password: new FormControl
  });


  

  public loginPayload: LoginReq = {
    email: '',
    password: '',
    hasTermsChecked: true
  };


  
 /**
   * Function used to call Bakend OLD Login service *****************
   */
  // login(){
  //   console.log(this.form.value)
  //   const payload={
  //     "payload":this.form.value
  //   }
  //   this.service.login(payload).subscribe(
  //     data=>{
  //       this.loginResponse=data as LoginModel
  //       localStorage.setItem('userInfo',JSON.stringify(this.loginResponse.responseBody));
  //       localStorage.setItem('token',this.loginResponse.bearerToken)
  //      // window.alert("Login Success")
  //       //this.route.navigate(['/map/view'])
  //       this.route.navigate(['/superadmin/home'])
  //     },
  //     error=>{
  //       window.alert("Invalid Credentials")
  //     }
  //   );
   
  // }


  public logindata: any;
 /**
   * Function used to call Bakend Login service
   */
 public doLogin(): void {

//   if (this.loginPayload.email == null || this.loginPayload.email === '' ||
//     this.loginPayload.password == null || this.loginPayload.password === '') {
//  //   this.toastr.warning(' Field can not be left empty ', 'Alert!');
//     return;
//   }
  this.loginPayload.email = 'testbmcadmin@gmail.com';
  this.loginPayload.password = 'Absec@123';
  this.loginPayload.hasTermsChecked = true;
  
  console.log("Login REQ : ",this.loginPayload);
  this.service.login(this.loginPayload).subscribe(data => {
    this.logindata = data;
    console.log("Login RES : ",this.logindata);
   // localStorage.setItem('access_token', data.token);
   // localStorage.setItem('role', data.role);
    this.route.navigate(['/superadmin/home'])
    // if (data.email) {
    //   localStorage.setItem('logintype', "password_login");
    //   this.route.navigate(['/superadmin/home'])
    //   this.doGetUserDetails(null , data.email , "email_login");
    // } else {
    //   this.route.navigate(['login']);
    // }
    // call get userdetails by userid to get user details.....
  }, error => {
    console.log(error);
  });
}



}
