import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-compost-material-packaging',
  templateUrl: './compost-material-packaging.component.html',
  styleUrls: ['../../../common.css', './compost-material-packaging.component.css']
})
export class CompostMaterialPackagingComponent implements OnInit{
  isAdd: boolean = true
  isUpdate: boolean = false
  goodList:any=[]
  goodResponse:any
  subGoodResponse:any
  subgoodList:any=[]
  list: any = []
  goodsList: any = []
  goodsName: any
  subGoodsId:any
  mrfTrnsId:any
  mrfResponse:any
  mrfList:any
  responseData:any
  isActive:any
  constructor(private service:CommonService, private formBuilder:FormBuilder){
    this.getList()
    this.getAllGoods()
     this.getAllSubGoods() 
  }
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
    mrfTrnsId: new FormControl,
    goodsId: new FormControl,
    goodssubId: new FormControl,
    interMaterial: new FormControl,
    mrfDesc: new FormControl,
    quntaum: new FormControl,
    goods: new FormControl,
    subGood: new FormControl,
    isActive: new FormControl
  });
  editForm = new FormGroup({
    goodsId: new FormControl,
    subGoodId: new FormControl,
    interMaterial:new FormControl,
    mrfDescription: new FormControl,
    quntaum:new FormControl,
    goods: new FormControl,
    subGood: new FormControl
})
  getAllGoods(){
     this.service.getAllGoods().subscribe(
      data=>{
       this.goodResponse=data
       this.goodList=this.goodResponse
       //console.log(this.goodList)
      }
     );
  }
  getAllSubGoods(){
    this.service.getAllSubGood().subscribe(
      data=>{
        this.subGoodResponse=data
        //console.log(this.subGoodResponse)
        this.subgoodList=this.subGoodResponse
      }
    );
  }
  getAllSubGoodByGoodId(){
    console.log(this.form.value.goodsId)
    this.service.getAllSubGoodByGoodId(this.form.value.goodsId).subscribe(
            data=>{
                    this.responseData=data
                    this.subgoodList = this.responseData.data.sort((a: any, b: any) => a.subgoodsName - b.subgoodsName)
                    //this.form.value.goodId=this.responseData.goods.goodId
                    //this.goodsName=this.responseData.goods.goodsName
                    console.log(this.subGoodsId)
            }
    );
}
  async getList() {
    try {
            this.list = await this.service.get(`/zone/getAllMrf`)
           // this.goodsList = await this.service.get(`/zone/getAllGoods`)
            //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
            console.error(e)
    }
}
  saveMrf(){
    const goods = this.goodList[this.goodList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
    const subgoods = this.subgoodList[this.subgoodList.findIndex((e: any) => e.goodssubId == this.form.value.goodssubId)]
    const data = {
      "goods": goods,
      "interMaterial": this.form.value.interMaterial,
      "mrfDesc": this.form.value.mrfDesc,
      "quntaum": this.form.value.quntaum,
      "subGood": subgoods
   }
   console.log(data)
   this.service.saveMrfData(data).subscribe(
    data=>{
      window.alert("Mrf data saved successfully")
    }
   );   
   this.getList()
   this.form.reset()
  }
  getGoodId() {
    console.log(this.form.value)
  }
  async remove(id: string) {
    try {
            const res = await this.service.delete(`/zone/deleteMrf/${id}`)
            this.getList()
    } catch (e) {
            console.error(e)
    }
}
updateData(item: any) {
  this.isUpdate = true
  this.isAdd = false
  console.log(item)
  console.log(item.goodssubId)
  this.goodsName = item.goods.goodsName
  this.form.patchValue({
          goodsId: item.goods.goodsId,
          goodssubId: item.subGood.goodssubId,
          mrfTrnsId:item.mrfTrnsId,
          interMaterial: item.interMaterial,
          mrfDesc: item.mrfDesc,
          quntaum: item.quntaum,
          //goods: item.goods,
          //subGood:item.subGood,
          isActive: true
  })
  this.subGoodsId=item.goodssubId
  // this.service.getZoneAllData().subscribe(
  //         async data => {
  //                 this.goodsList = await this.service.get(`/zone/getAllGoods`)
  //         }
  // );

}
cancel() {
  this.isAdd = true
  this.isUpdate = false
  this.form.reset()
}

updateMrf() {
  console.log("Form Value"+this.form.value)
  this.service.updateMrf(this.form.value).subscribe(
          data => {
                  window.alert("Mrf data updated successfully!!")
                  this.isAdd = true
                  this.isUpdate = false
                  this.getList()
                  this.form.reset()
          },
          error => {
                  window.alert("something went wrong")
          }
  );

}
}


