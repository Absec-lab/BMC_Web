import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-ward-master',
  templateUrl: './ward-master.component.html',
  styleUrls: ['../../common.css', './ward-master.component.css']
})
export class WardMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
                this.getZones()
                this.getWCList()
        }

        form = new FormGroup({
                zoneId: new FormControl(''),
                wcId: new FormControl(''),
                wardName: new FormControl(''),
                wardDesc: new FormControl('')
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
                        this.list = await this.service.get(`/zone/getAllWard`)
                        this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const zone = this.zoneList[this.zoneList.findIndex((e: any) => e.zoneId == this.form.value.zoneId)]
                        const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
                        const data = {
                                "wardDesc": this.form.value.wardDesc,
                                "wardName": this.form.value.wardName,
                                "zone": zone,
                                "wc": wc
                        }
                        console.log(data)
                        await this.service.post(`/zone/addWard`, data)
                        window.alert("Ward data adeed successfully!!")
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteWard/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        deactivateWard(id:any){
                this.service.deactivateWard(id).subscribe(
                        data=>{
                                window.alert("Ward deleted successfully")
                                this.service.getAllWardData().subscribe(
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
