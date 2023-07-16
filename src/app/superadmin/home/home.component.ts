import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  role:any='';

  constructor(private toastr: ToastrService,
       public route:Router){
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')?.toString();   
  }


  public doLogout() : void{
        localStorage.removeItem('access_token');
        localStorage.removeItem('role');
        localStorage.removeItem('logindetails');
        localStorage.clear();
        this.route.navigate(['/login'])
  }

}
