import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-mrf',
  templateUrl: './mrf.component.html',
  styleUrls: ['../../common.css', './mrf.component.css']
})
export class MrfComponent implements OnInit{
  goodList:any=[]
  goodResponse:any
  constructor(private service:CommonService){}
  ngOnInit() {
     this.getAllGoods()
  }
  
  getAllGoods(){
     this.service.getAllGoods().subscribe(
      data=>{
       this.goodResponse=data
       this.goodList=this.goodResponse
       console.log(this.goodList)
      }
     );
  }
}
