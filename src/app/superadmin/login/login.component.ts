import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { windowWhen } from 'rxjs';
import { LoginRes, Userdetail } from 'src/app/model/login.model';
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
    
    constructor(private toastr: ToastrService,
      private service: CommonService,private route:Router) {
  }
  loginResponse:any
  form = new FormGroup({
    emailId: new FormControl,
    password: new FormControl
  });

  public logindata:any;

  public loginPayload: LoginReq = {
    email: '',
    password: '',
    hasTermsChecked: true
  };


  
 /**
   * Function used to call Bakend Login service
   */
 public doLogin(): void {

  if (this.form.controls.emailId.value == null || this.form.controls.emailId.value  === '' ||
     this.form.controls.password.value == null || this.form.controls.password.value === '') {
      this.toastr.error('Error!','   Field can not be left empty   ' , {positionClass:'toast-center-center'});
    return;
  }
   this.loginPayload.email = this.form.controls.emailId.value;
   this.loginPayload.password = this.form.controls.password.value;
   this.loginPayload.hasTermsChecked = true;
  
  console.log("Login REQ : ",this.loginPayload);
  this.service.login(this.loginPayload).subscribe(data => {
       this.logindata = data;
       console.log("Login RES : ",this.logindata);
       console.log("Login RES : ",this.logindata.userdetails[0].attributes.role);

       localStorage.setItem('access_token', this.logindata.access_token);
       localStorage.setItem('role', this.logindata.userdetails[0].attributes.role);
       localStorage.setItem('logindetails', JSON.stringify(this.logindata));
     //  this.route.navigate(['/superadmin/dashboard'] , {state:{"userdetails": this.logindata.userdetails[0] , "usermenu" : this.logindata.menuitem}});
       this.route.navigate(['/superadmin/home'])
   
  }, error => {
    console.log(error);
  });
}



}
