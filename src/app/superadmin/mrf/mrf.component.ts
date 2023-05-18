import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-mrf',
  templateUrl: './mrf.component.html',
  styleUrls: ['../../common.css', './mrf.component.css']
})
export class MrfComponent implements OnInit {
  goodList: any = []
  goodResponse: any
  subGoodResponse: any
  subgoodList: any = []
  mrfResponse: any
  mrfList: any = []
  constructor(private service: CommonService) { }
  ngOnInit() {
    this.service.getAllMrf().subscribe(
      data => {
        this.mrfResponse = data
        this.mrfList = this.mrfResponse
        console.log(this.mrfList)
      }
    );
    this.getAllGoods()
  }
  form = new FormGroup({
    goodId: new FormControl,
    subGoodId: new FormControl,
    inertMaterial: new FormControl,
    mrfDescription: new FormControl,
    quntaum: new FormControl
  });
  getAllGoods() {
    this.service.getAllGoods().subscribe(
      data => {
        this.goodResponse = data
        this.goodList = this.goodResponse
        console.log(this.goodList)
      }
    );
  }
  getAllSubGoods() {
    this.service.getAllSubGood().subscribe(
      data => {
        this.subGoodResponse = data
        console.log(this.subGoodResponse)
        this.subgoodList = this.subGoodResponse
      }
    );
  }
  saveMrf() {
    const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodId)]
    const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.subGoodId)]
    const data = {
      "goods": goods,
      "interMaterial": this.form.value.inertMaterial,
      "mrfDesc": this.form.value.mrfDescription,
      "quntaum": this.form.value.quntaum,
      "subGood": subgoods
    }
    console.log(data)
    this.service.saveMrfData(data).subscribe(
      data => {
        window.alert("Mrf data saved successfully")
        this.service.getAllMrf().subscribe(
          data => {
            this.mrfResponse = data
            this.mrfList = this.mrfResponse
            console.log(this.mrfList)
          }
        );
      }
    );
  }
  getGoodId() {
    console.log(this.form.value)
  }

  getsubGoodListByGoodId() {
    this.service.getAllSubGoodByGoodId(this.form.value.goodId).subscribe(
      data => {
        this.subGoodResponse = data
        this.subgoodList = this.subGoodResponse.data
      }
    );
   
  }
    deactivateMrf(id:any){
      this.service.deactivateMrf(id).subscribe(
        data=>{
          window.alert("Mrf Deleted Successfully..")
          this.service.getAllMrf().subscribe(
            data => {
              this.mrfResponse = data
              this.mrfList = this.mrfResponse
              console.log(this.mrfList)
            }
          );
        }
      );
    }
}


