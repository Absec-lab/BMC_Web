import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-mokhata-move-to-godown',
  templateUrl: './mokhata-move-to-godown.component.html',
  styleUrls: ['../../../common.css', './mokhata-move-to-godown.component.css']
})

export class MokhataMoveToGodownComponent implements OnInit{
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
  godownResponse:any
  godownList:any=[]
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
  materialType:any=[]
  constructor(private service:CommonService, private formBuilder:FormBuilder,private toastService:ToastService){
    this.getList()
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
    this.service.getAllWcData().subscribe(
      data=>{
       this.wcList=data
       this.form.value.wcId=this.wcList[0].wcId
       console.log(this.form.value.wcId)
      //  this.wcList=this.wcResponse
       //console.log(this.goodList)
      }
     );
    this.service.getAllMaterialType().subscribe(
      data=>{
        this.materialType=data
      }
    );
    this.service.getVehicleListByWcId().subscribe(
      data=>{
        this.responseData=data
        this.vehicleList=this.responseData.data
      }
    );
    this.service.getAllDriverList().subscribe(
      data=>{
        this.driverList=data
      }
    );
    this.service.getAllGodownList().subscribe(
      data=>{
        this.godownList=data
      }
    );
  }
  form = new FormGroup({
    mokhatGodownTrnsId: new FormControl,
    wcId: new FormControl,
    dryingyardId: new FormControl,
    vehicleId: new FormControl,
    driverId: new FormControl,
    godownId: new FormControl,
    noOfPacket: new FormControl,
    packetWt: new FormControl,
    packetCost: new FormControl,
    totalCost: new FormControl,
    npkRatio: new FormControl,
    description: new FormControl,
    wetCompostWt: new FormControl,
    wc: new FormControl,
    dryingyard: new FormControl,
    vehicle : new FormControl,
    driver : new FormControl,
    isActive: new FormControl,
    date: new FormControl,
    dryCompostId: new FormControl,
    materialType:new FormControl
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
       this.wcList=data
      //  this.wcList=this.wcResponse
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
    this.service.getAllWcVehicle(localStorage.getItem('wcId')).subscribe(
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
            this.list = await this.service.get(`/inventory/getAllMokhatamovetogodown/`+localStorage.getItem('wcId'))

           // this.goodsList = await this.service.get(`/zone/getAllGoods`)
            //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
            console.error(e)
    }
}
  saveMoKhataToGodown(){
    const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
    const dryingyard = this.dryingyardList[this.dryingyardList.findIndex((e: any) => e.dryingyardId == this.form.value.dryingyardId)]
    const vehicle = this.vehicleList[this.vehicleList.findIndex((e: any) => e.vehicleId == this.form.value.vehicleId)] //this.form.value.vehicleId
    const driver = this.driverList[this.driverList.findIndex((e: any) => e.driverId == this.form.value.driverId)]
    const godown = this.godownList[this.godownList.findIndex((e: any) => e.godownId == this.form.value.godownId)]
    
    console.log(driver.driver)
    const data = {
      "godownTrnsId": this.form.value.mokhatGodownTrnsId,
      "wc":{"wcId":localStorage.getItem("wcId")},
      // "wetCompostWt": this.form.value.wetCompostWt,
      "description": this.form.value.description,
      //"npkRatio": this.form.value.npkRatio,
      "noOfPackets":this.form.value.noOfPacket,
      "packageWt":this.form.value.packetWt,
      "packageCost":this.form.value.packetCost,
      "total_cost":this.form.value.totalCost,
      "dryingyard": dryingyard,
      "vehicle": {
        "vehicleId":this.form.value.vehicleId
      },
      "driver": {
        "driverId":this.form.value.driverId
      },
      "godown": {
        "godownId":this.form.value.godownId
      },
      "date": "2023-07-24 15:38"//this.form.value.date
   }
   console.log(data)
   this.service.saveMokathaMoveToGodown(data).subscribe(
    data=>{
      window.alert("Mokhata Move To Godown saved successfully")
      this.getList()
    },
    error=>{
       this.responseData=error
       this.toastService.showError(this.responseData.error.message)
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
          mokhatGodownTrnsId:item.mokhatGodownTrnsId,
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
getFormData(){
  console.log(this.form.value)
}
}


