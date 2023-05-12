import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['../../common.css','./vehicle-master.component.css']
})
export class VehicleMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
                this.getZones()
                this.getWCList()
                this.getRouteList()
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
}
