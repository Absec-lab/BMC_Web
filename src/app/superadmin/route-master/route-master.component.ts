import { Component } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.component.html',
  styleUrls: ['../../common.css','./route-master.component.css']
})
export class RouteMasterComponent {
        isAdd: boolean = true
        isUpdate: boolean = false
        responseData:any
        zoneId:any
        wealthCentreName:any
        zoneName:any
        wcId:any
        constructor(private service: CommonService, private formBuilder:FormBuilder) {
                this.getList()
                // this.getZones()
                this.getWCList()
        }

        form = new FormGroup({
                zoneId: new FormControl,
                wcId: new FormControl,
                routeName: new FormControl,
                routeDesc: new FormControl,
                zone:new FormControl,
                wc:new FormControl,
                routeId:new FormControl
              });
        editForm = new FormGroup({
                zone: new FormControl(''),
                wc: new FormControl(''),
                routeName: new FormControl(''),
                routeDesc: new FormControl('')
              });
        list: any = []
        zoneList: any = []
        wcList: any = []

        // async getZones() {
        //         try {
        //                 this.zoneList = await this.service.get(`/zone/getAllZone`)
        //                 this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
        //         } catch (e) {
        //                 console.error(e)
        //         }
        // }
        async getWCList() {
                try {
                        this.wcList = await this.service.get(`/zone/getAllWc`)
                        this.wcList = this.wcList.sort((a: any, b: any) => a.wcName - b.wcName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllRoute`)
                        this.list = this.list.sort((a: any, b: any) => a.routeName - b.routeName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const zone = this.responseData.zone
                        const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
                        const data = {
                                "routeDesc": this.form.value.routeDesc,
                                "routeName": this.form.value.routeName,
                                "zone": zone,
                                "wc": wc
                        }
                        await this.service.post(`/zone/addRoute`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteRoute/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateRoute(id:any){
                this.service.deactivateRoute(id).subscribe(
                        data=>{
                                window.alert("Route deleted successfully")
                                this.service.getAllRouteData().subscribe(
                                        data=>{
                                                this.list=data
                                        }
                                );
                        },
                        error=>{
                                window.alert("Something went wrong!!")
                        }
                );
        }
        getWcById(){
                console.log(this.form.value.wcId)
                this.service.getWcById(this.form.value.wcId).subscribe(
                        data=>{
                                this.responseData=data
                                this.form.value.zoneId=this.responseData.zone.zoneId
                                this.zoneName=this.responseData.zone.zoneName
                                console.log(this.zoneName)
                        }
                );
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.zoneName=item.zone.zoneName
                this.wealthCentreName=item.wc.wcName
                // this.zoneId = item.zoneId
                this.form = this.formBuilder.group({
                        zoneId: item.zone.zoneId,
                        wcId: item.wc.wcId,
                        routeName: item.routeName,
                        routeDesc: item.routeDesc,
                        zone:item.zone,
                        wc:item.wc,
                        routeId:item.routeId                               
                })
                
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

        updateRoute() {
                console.log(this.form.value)
                this.service.updateRoute(this.form.value).subscribe(
                        data => {
                                window.alert("Route data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        },
                        error => {
                                window.alert("Route data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        }
                );

        }
}
