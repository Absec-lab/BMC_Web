import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-compost-drying',
  templateUrl: './compost-drying.component.html',
  styleUrls: ['../../../common.css', './compost-drying.component.css']
})
export class CompostDryingComponent implements OnInit{
  isAdd: boolean = true
  isUpdate: boolean = false
  wcList:any=[]
  wcResponse:any
  dryingyardResponse:any
  dryingyardList:any=[]
  vehicleResponse:any
  vehicleList:any=[]
  driverResponse:any
  driverList:any=[]
  vehicleNo:any
  driverName:any
  list: any = []
  //goodsList: any = []
  wcName: any
  dryingyardId:any
  compostdryingTrnsId:any
  compostdryingResponse:any
  compostdryingList:any
  responseData:any
  isActive:any
  constructor(private service:CommonService, private formBuilder:FormBuilder){
    this.getList()
    this.getAllWC()
    this.getAllDryingYard()
  }
  ngOnInit() {
    this.service.getAllDryingYard().subscribe(
      data => {
        this.compostdryingResponse = data
        this.compostdryingList = this.compostdryingResponse
        console.log(this.compostdryingList)
      }
    );
    this.getAllWC()
  }
  form = new FormGroup({
    compostdryingTrnsId: new FormControl,
    wcId: new FormControl,
    dryingyardId: new FormControl,
    vehicleId: new FormControl,
    driverId: new FormControl,
    npkRatio: new FormControl,
    description: new FormControl,
    wetCompostWt: new FormControl,
    wc: new FormControl,
    dryingyard: new FormControl,
    vehicle : new FormControl,
    driver : new FormControl,
    isActive: new FormControl,
    date: new FormControl,
    dryCompostId: new FormControl
  });
  editForm = new FormGroup({
    wcId: new FormControl,
    dryingyardId: new FormControl,
    interMaterial:new FormControl,
    compostdryingDescription: new FormControl,
    quntaum:new FormControl,
    wc: new FormControl,
    dryingyard: new FormControl,
    vehicle: new FormControl,
    driver: new FormControl
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
  // getAllVehicle(){
  //   this.service.getAllActiveVehicle().subscribe(
  //     data=>{
  //       this.vehicleResponse=data
        
  //       this.vehicleList=this.vehicleResponse
  //       console.log(this.vehicleList)
  //     }
  //   );
  // }
  getAllVehicleWcId(){
    this.service.getAllWcVehicle(this.form.value.wcId).subscribe(
      data=>{
        this.vehicleResponse=data
        //console.log(this.subGoodResponse)
        this.vehicleList=this.vehicleResponse
      }
    );
   }
   getAllDriverByvehicleId(){
    this.service.getAllDriverByVehicleId(this.form.value.vehicleId).subscribe(
      data=>{
        this.driverResponse=data
        //console.log(this.subGoodResponse)
        this.driverList=this.driverResponse
      }
    );


   }

  getAllDriver(){
    this.service.getAllDriverList().subscribe(
      data=>{
        this.driverResponse=data
        //console.log(this.subGoodResponse)
        this.driverList=this.driverResponse
      }
    );
  }

  getAllDryingYardByWcId(){
    console.log(this.form.value.wcId)
    this.service.getAllDryingYardByWcId(this.form.value.wcId).subscribe(
            data=>{
                    this.responseData=data
                    this.dryingyardList = this.responseData.data.sort((a: any, b: any) => a.subgoodsName - b.subgoodsName)
                    //this.form.value.goodId=this.responseData.goods.goodId
                    //this.goodsName=this.responseData.goods.goodsName
                    console.log(this.dryingyardId)
            }
    );
}
  async getList() {
    try {
            this.list = await this.service.get(`/inventory/getAllDryingCompost`)

           // this.goodsList = await this.service.get(`/zone/getAllGoods`)
            //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
            console.error(e)
    }
}
  saveCompostDrying(){
    const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
    const dryingyard = this.dryingyardList[this.dryingyardList.findIndex((e: any) => e.dryingyardId == this.form.value.dryingyardId)]
    const vehicle = this.vehicleList[this.vehicleList.findIndex((e: any) => e.vehicleId == this.form.value.vehicleId)] //this.form.value.vehicleId
    const driver = this.driverList[this.driverList.findIndex((e: any) => e.driver.driverId == this.form.value.driverId)]
    console.log(driver.driver)
    const data = {
      "dryCompostId": this.form.value.compostdryingTrnsId,
      "wc": wc,
      "wetCompostWt": this.form.value.wetCompostWt,
      "description": this.form.value.description,
      //"npkRatio": this.form.value.npkRatio,

      "dryingyard": dryingyard,
      "vehicle": vehicle,
      "driver": driver.driver,
      "date": this.form.value.date
   }
   console.log(data)
   this.service.saveCompostDrying(data).subscribe(
    data=>{
      window.alert("Compost Drying data saved successfully")
      this.getList()
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
  console.log(item.dryingyardId)
  this.form.patchValue({
          wcId: item.wc.wcId,
          dryingyardId: item.dryingyard.dryingyardId,
          compostdryingTrnsId:item.compostdryingTrnsId,
          npkRatio: item.npkRatio,
          description: item.description,

          wetCompostWt: item.wetCompostWt,
          dryCompostId:item.dryCompostId,
          wc : item.wc,
          dryingyard: item.dryingyard,
          vehicle: item.vehicle,
          driver: item.driver,
          isActive: true
  })
  this.dryingyardId=item.goodssubId
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


updateCompostDrying() {

  console.log("Form Value"+this.form.value)
  this.service.updateDryingCompost(this.form.value).subscribe(
          data => {
                  window.alert("Compost Drying data updated successfully!!")
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


