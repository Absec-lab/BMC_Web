import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-mcc-master',
  templateUrl: './mcc-master.component.html',
  styleUrls: ['../../common.css','./mcc-master.component.css']
})
export class MccMasterComponent {
        responseData:any
        zoneName:any=''
        constructor(private service: CommonService) {
                this.getList()
                // this.getZones()
                this.getWCList()
        }

        form = new FormGroup({
                zoneId: new FormControl(''),
                wcId: new FormControl(''),
                mccName: new FormControl(''),
                mccDesc: new FormControl('')
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
                        this.list = await this.service.get(`/zone/getAllMcc`)
                        this.list = this.list.sort((a: any, b: any) => a.mccName - b.mccName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        // const zone = this.zoneList[this.zoneList.findIndex((e: any) => e.zoneId == this.form.value.zoneId)]
                        const zone=this.responseData.zone
                        const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
                        const data = {
                                "mccDesc": this.form.value.mccDesc,
                                "mccName": this.form.value.mccName,
                                "zone": zone,
                                "wc": wc
                        }
                        console.log(data)
                        await this.service.post(`/zone/addMcc`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteMcc/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        deactivateMcc(id:any){
                this.service.deactivateMcc(id).subscribe(
                        data=>{
                                window.alert("Mcc deleted successfully")
                                this.service.getAllMccData().subscribe(
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
}
