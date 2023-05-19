import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-mrf',
  templateUrl: './mrf.component.html',
  styleUrls: ['../../common.css', './mrf.component.css']
})
export class MrfComponent implements OnInit{
  goodList:any=[]
  goodResponse:any
  subGoodResponse:any
  subgoodList:any=[]
  list: any = []
  goodsList: any = []
  isAdd: boolean = true
  isUpdate: boolean = false
  goodsName: any
  subGoodsId:any
  constructor(private service:CommonService, private formBuilder:FormBuilder){
    this.getList()
    this.getAllGoods()
     this.getAllSubGoods()
  }
  ngOnInit() {
     this.getAllGoods()
     this.getAllSubGoods()
  }
  form = new FormGroup({
    goodId: new FormControl,
    subGoodId: new FormControl,
    inertMaterial:new FormControl,
    mrfDescription: new FormControl,
    quntaum:new FormControl
  });
  editForm = new FormGroup({
    goodId: new FormControl,
    subGoodId: new FormControl,
    inertMaterial:new FormControl,
    mrfDescription: new FormControl,
    quntaum:new FormControl
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
    data=>{
      window.alert("Mrf data saved successfully")
    }
   );
   this.form.reset()
   this.getList()
  }
  getGoodId(){
    console.log(this.form.value)
  }
  async remove(id: string) {
    try {
            const res = await this.service.delete(`/zone/deleteGoodssub/${id}`)
            this.getList()
    } catch (e) {
            console.error(e)
    }
}
updateData(item: any) {
    this.isUpdate = true
    this.isAdd = false
    console.log(item)
    this.goodsName = item.goods.goodsName
    // this.form = this.formBuilder.group({
    //         goodsId: item.goods.goodsId,
    //         subgoodsName: item.subgoodsName,
    //         subGoodsPerKg: item.subGoodsPerKg,
    //         mrfDescription: item.mrfDescription, 
    //         inertMaterial: item.inertMaterial 
                         
    // })
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

updateWcc() {
    console.log(this.form.value)
    this.service.updateSubGood(this.form.value,this.subGoodsId).subscribe(
            data => {
                    window.alert("MRF data updated successfully!!")
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

// {
//   "goods": {
//     "goodsId": 0
//   },
//   "interMaterial": 0,
//   "mrfDesc": "string",
//   "mrfTrnsId": 0,
//   "quntaum": 0,
//   "subGood": {
//     "goodssubId": 0
//   }
// }