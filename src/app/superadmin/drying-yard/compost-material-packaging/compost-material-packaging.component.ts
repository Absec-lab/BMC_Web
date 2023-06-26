import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

export class WetType{
  type:any
}

@Component({
  selector: 'app-compost-material-packaging',
  templateUrl: './compost-material-packaging.component.html',
  styleUrls: ['../../../common.css', './compost-material-packaging.component.css']
})
export class CompostMaterialPackagingComponent implements OnInit{
  isAdd: boolean = true
  isUpdate: boolean = false
  wcList:any=[]
  wcResponse:any
  dryingyardResponse:any
  dryingyardList:any=[]
  wetTypeList:any=[]
  list: any =[]
  goodsList: any = []
  goodsName: any
  subGoodsId:any
  mrfTrnsId:any
  mrfResponse:any
  mrfList:any
  responseData:any
  isActive:any
  composePackingList:any=[]
  packagingType:any=[5,10,15,20]
  wcId : any = 0;
  constructor(private service:CommonService, private formBuilder:FormBuilder){
    this.wcId = localStorage.getItem('wcId')
    this.getList()
    this.getAllWC()
     this.getAllDryingYard() 
  }
  ngOnInit() {
    this.service.getAllMrf(parseInt(this.wcId)).subscribe(
      data => {
        this.mrfResponse = data
        this.mrfList = this.mrfResponse
        console.log(this.mrfList)
      }
    );
    this.service.getAllUnit().subscribe(
      data=>{
        this.wetTypeList=data
      }
    );
    this.service.getAllCompostPacking().subscribe(
      data=>{
        this.composePackingList=data
      }
    );
   console.log(this.list)
  }
  form = new FormGroup({
    dryingPackgingId: new FormControl,
    dryingyardId: new FormControl,
    wcId: new FormControl,
    dryCompostWt: new FormControl,
    npkRatio: new FormControl,
    date: new FormControl,
    description: new FormControl,
    wc: new FormControl,
    dryingyard: new FormControl,
    isActive: new FormControl,
    unitId: new FormControl,
    noOfPacketsIssue:new FormControl
  });
  editForm = new FormGroup({
    dryingPackgingId: new FormControl,
    dryingyardId: new FormControl,
    wcId: new FormControl,
    dryCompostWt: new FormControl,
    npkRatio: new FormControl,
    date: new FormControl,
    description: new FormControl,
    wc: new FormControl,
    dryingyard: new FormControl,
    isActive: new FormControl
})
getAllWC(){
  this.service.getAllWcData().subscribe(
   data=>{
    this.wcResponse=data
    this.wcList=this.wcResponse
    //console.log(this.goodList)
   }
  );
}
getAllDryingYard(){
 this.service.getAllDryingYard().subscribe(
   data=>{
     this.dryingyardResponse=data
     //console.log(this.subGoodResponse)
     this.dryingyardList=this.dryingyardResponse
   }
 );
}
  
  async getList() {
    try {
            this.list = await this.service.get(`/inventory/getAllCompostWtmt`)
           // this.goodsList = await this.service.get(`/zone/getAllGoods`)
            //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
            console.error(e)
    }
}
  saveMrf(){
    const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
    const dryingyard = this.dryingyardList[this.dryingyardList.findIndex((e: any) => e.dryyardId == this.form.value.dryingyardId)]
    // const unit= this.wetTypeList[this.wetTypeList.findIndex((e:any)=>e.unitId == this.form.value.unitId)]
    const data = {
      "dryCompostId": this.form.value.dryingPackgingId,
      "wc": wc,
      "dryCompostWt": this.form.value.dryCompostWt,
      "description": this.form.value.description,
      "npkRatio": this.form.value.npkRatio,
      "dryingyard": dryingyard,
      "date": this.form.value.date,
      "packageWtType": this.form.value.unitId,
      "noOfPacketsIssue": this.form.value.noOfPacketsIssue
   }
   console.log(data)
   this.service.saveCompostPacking(data).subscribe(
    data=>{
      window.alert("Compose packing data saved successfully")
      this.service.getAllCompostPacking().subscribe(
        data=>{
          this.composePackingList=data
        }
      );
    }
   ); 
   this.form.reset()  
   this.getList()   
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


