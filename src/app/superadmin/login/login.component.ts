import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginReq } from 'src/app/model/pit.model';
import { LoginModel, UserInfo } from 'src/app/model/user.model';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  checkagreeterms: any;
    
    constructor(private toastr: ToastrService, private service: CommonService,private route:Router, private toastService: ToastService) {}
  loginResponse:any
  form = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public logindata:any;

  public loginPayload: LoginReq = {
    email: '',
    password: '',
    hasTermsChecked: true
  };

  ngOnInit(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('logindetails');
    localStorage.clear();
  }

  validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
 /**
   * Function used to call Bakend Login service
   */
 public doLogin(): void {

  const email: any = this.form.value.emailId?.trim();
  const password: any = this.form.value.password?.trim();

  if (this.form.status === 'INVALID') {
    if (!email) {
      this.toastService.showWarning('Email is required.');
      return;
    }
    if (!this.validateEmail(email)) {
      this.toastService.showWarning('Email is not valid.');
      return;
    }
    if (!password) {
      this.toastService.showWarning('Password is required.');
      return;
    }
    return;
  }

   this.loginPayload.email = email;
   this.loginPayload.password = password;
   this.loginPayload.hasTermsChecked = true;

  this.service.login(this.loginPayload).subscribe(data => {
       this.logindata = data;
       localStorage.setItem('userInfo', this.logindata.userentity[0].mccEntity);
       localStorage.setItem('access_token', this.logindata.access_token);
       localStorage.setItem('role', this.logindata.userdetails[0].attributes.role);
       localStorage.setItem('logindetails', JSON.stringify(this.logindata));
       localStorage.setItem('name', this.logindata.userdetails[0].firstName + "  " +this.logindata.userdetails[0].lastName);
       localStorage.setItem('email', this.logindata.userdetails[0].email);
     //  this.route.navigate(['/superadmin/dashboard'] , {state:{"userdetails": this.logindata.userdetails[0] , "usermenu" : this.logindata.menuitem}});
       this.route.navigate(['/superadmin/home'])
   
  }, err => {
    this.toastService.showError(err.error.error);
  });
}



}
