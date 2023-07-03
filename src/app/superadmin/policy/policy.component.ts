import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent {

  constructor(private toastr: ToastrService,
       public route:Router){
  }


  public doLogout() : void{
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        localStorage.removeItem('logindetails');
        localStorage.clear();
        this.route.navigate(['/login'])
  }

}
