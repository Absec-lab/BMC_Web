import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-wealth-center-master',
  templateUrl: './wealth-center-master.component.html',
  styleUrls: ['../../common.css', './wealth-center-master.component.css']
})
export class WealthCenterMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
                this.getZones()
        }

        form = new FormGroup({
                zoneId: new FormControl(''),
                wcName: new FormControl(''),
                wcDesc: new FormControl('')
              });
        list: any = []
        zoneList: any = []

        async getZones() {
                try {
                        this.zoneList = await this.service.get(`/zone/getAllZone`)
                        this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllWc`)
                        this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const zone = this.zoneList[this.zoneList.findIndex((e: any) => e.zoneId == this.form.value.zoneId)]
                        const data = {
                                "wcDesc": this.form.value.wcDesc,
                                "wcName": this.form.value.wcName,
                                "zone": zone
                        }
                        await this.service.post(`/zone/addWc`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteWc/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateWc(id:any){
                this.service.deactivateWc(id).subscribe(
                        data=>{
                                window.alert("Wealth Centre deleted successfully")
                                this.service.getAllWcData().subscribe(
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
