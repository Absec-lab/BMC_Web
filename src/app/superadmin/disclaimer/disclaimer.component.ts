import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent {
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
