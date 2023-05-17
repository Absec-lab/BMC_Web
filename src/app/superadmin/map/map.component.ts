import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  constructor(private service:CommonService,private route:Router){}
  mapResponse:any
  wcResponse:any
  wcList:any=[]
  ngOnInit(){
    this.getWardData()
    this.getWealthCentreData(92)
  }

  getWardData(){
    this.service.getWardsCount().subscribe(
      data=>{
        this.mapResponse=data
        console.log(this.mapResponse)
      }
    );
  
  }
  getWealthCentreData(id:any){
    this.service.getWcListByZoneId(id).subscribe(
      data=>{
        this.wcResponse=data
        this.wcList=this.wcResponse.data
        console.log(this.wcList)
      }
    );
  }
  redirectToDashboard(){
     this.route.navigate(['/superadmin/dashboard'])
  }
}
