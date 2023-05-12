import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.component.html',
  styleUrls: ['../../common.css','./route-master.component.css']
})
export class RouteMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
                this.getZones()
                this.getWCList()
        }

        form = new FormGroup({
                zoneId: new FormControl(''),
                wcId: new FormControl(''),
                routeName: new FormControl(''),
                routeDesc: new FormControl('')
              });
        list: any = []
        zoneList: any = []
        wcList: any = []

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
                        const zone = this.zoneList[this.zoneList.findIndex((e: any) => e.zoneId == this.form.value.zoneId)]
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
}
