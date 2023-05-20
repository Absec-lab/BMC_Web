import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: CommonService,private route:Router) {
  }
  loginResponse:any
  form = new FormGroup({
    emailId: new FormControl,
    password: new FormControl
  });

  login(){
    console.log(this.form.value)
    const payload={
      "payload":this.form.value
    }
    this.service.login(payload).subscribe(
      data=>{
        this.loginResponse=data
        localStorage.setItem('token',this.loginResponse.bearerToken)
        window.alert("Login Success")
        //this.route.navigate(['/map/view'])
        this.route.navigate(['/superadmin/home'])
      },
      error=>{
        window.alert("Invalid Credentials")
      }
    );
   
  }
}
