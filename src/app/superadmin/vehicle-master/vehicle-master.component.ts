import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['../../common.css','./vehicle-master.component.css']
})
export class VehicleMasterComponent implements OnInit{
        isAdd: boolean = true
        isUpdate: boolean = false
        responseData:any
        zoneId:any
        wealthCentreName:any
        zoneName:any
        wcId:any
        vehicleResponse:any
        driverList:any=[]
        constructor(private service: CommonService, private formBuilder :FormBuilder) {
                this.getList()
                this.getZones()
                this.getWCList()
                this.getRouteList()
        }
        ngOnInit(){
                this.service.getAllDriverList().subscribe(
                        data=>{
                              this.driverList=data
                              console.log(this.driverList)
                        }
                      );
        }

        form = new FormGroup({
                vehicleNo: new FormControl(''),
                driverId: new FormControl(''),
                rcNo: new FormControl(''),
                rcPhoto: new FormControl(''),
                vehicleImage: new FormControl(''),
                insurance: new FormControl(''),
                vehiclePassingWt: new FormControl(''),
                vehicleWt: new FormControl(''),
                vehicleDesc: new FormControl(''),
                zoneId: new FormControl(''),
                routeId: new FormControl(''),
                wcId: new FormControl('')
              });
        list: any = []
        zoneList: any = []
        wcList: any = []
        routeList: any = []

        async getZones() {
                try {
                        this.zoneList = await this.service.get(`/zone/getAllZone`)
                        this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getWCList() {
                try {
                        this.wcList = await this.service.get(`/zone/getAllWc`)
                        this.wcList = this.wcList.sort((a: any, b: any) => a.wcName - b.wcName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getRouteList() {
                try {
                        this.routeList = await this.service.get(`/zone/getAllRoute`)
                        this.routeList = this.routeList.sort((a: any, b: any) => a.routeName - b.routeName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/getAll/vehicle`)
                        this.list = this.list.data
                        this.list = this.list.sort((a: any, b: any) => a.vehicleNo - b.vehicleNo)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const data = {
                                vehicleNo: this.form.value.vehicleNo,
                                rcNo: this.form.value.rcNo,
                                rcPhoto: this.form.value.rcPhoto,
                                vehicleImage: this.form.value.vehicleImage,
                                insurance: this.form.value.insurance,
                                vehiclePassingWt: this.form.value.vehiclePassingWt,
                                vehicleWt: this.form.value.vehicleWt,
                                vehicleDesc: this.form.value.vehicleDesc,
                                zone: {
                                        zoneId: this.form.value.zoneId
                                },
                                wc: {
                                        wcId: this.form.value.wcId
                                },
                                route: {
                                        routeId: this.form.value.routeId
                                },
                                driver: {
                                        driverId: this.form.value.driverId
                                },
                                "status":true
                        }
                        console.log(data)
                        await this.service.post(`/vehicle/add`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/vehicle/delete/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.zoneName=item.zone.zoneName
                this.wealthCentreName=item.wc.wcName
                // this.zoneId = item.zoneId
                // this.form = this.formBuilder.group({
                //         vehicleNo: item.vehicleNo,
                //         driverId: item.vehicleNo,
                //         rcNo: item.vehicleNo,
                //         rcPhoto: item.vehicleNo,
                //         vehicleImage: item.vehicleNo,
                //         insurance: item.vehicleNo,
                //         vehiclePassingWt: item.vehicleNo,
                //         vehicleWt: item.vehicleNo,
                //         vehicleDesc: item.vehicleNo,
                //         zone:item.zone,                        
                //         routeId:item.routeId, 
                //         wc:item.wc                           
                // })
                
                this.wcId=item.wcId
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

        updateVehicle() {
                console.log(this.form.value)
                this.service.updateVehicle(this.form.value).subscribe(
                        data => {
                                window.alert("Vehicle data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        },
                        error => {
                                window.alert("Vehicle data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        }
                );

        }
        deactivateVehicle(id: any) {
                this.service.deactivateVehicle(id).subscribe(
                        data => {
                                window.alert("Vehicle deleted successfully")
                                this.service.getAllActiveVehicle().subscribe(
                                        data => {
                                                this.vehicleResponse = data
                                                this.list=this.vehicleResponse.data
                                        }
                                );
                        },
                        error => {
                                window.alert("Something went wrong!!")
                        }
                );
        }

        getAllDrivers(){
                this.service.getAllDriverList().subscribe(
                  data=>{
                        this.driverList=data
                  }
                );
        }
}
