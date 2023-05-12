import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
        selector: 'app-pit-master',
        templateUrl: './pit-master.component.html',
        styleUrls: ['../../common.css', './pit-master.component.css']
})
export class PitMasterComponent {
        mccDataById: any
        wccByIdData: any
        zoneName: any
        constructor(private service: CommonService) {
                this.getList()
                // this.getZones()
                this.getWCList()
                // this.getMccList()
        }

        form = new FormGroup({
                zoneId: new FormControl(''),
                wcId: new FormControl(''),
                mccId: new FormControl(''),
                pitName: new FormControl(''),
                pitDesc: new FormControl('')
        });
        list: any = []
        zoneList: any = []
        wcList: any = []
        mccList: any = []

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
        // async getMccList() {
        //         try {
        //                 this.mccList = await this.service.get(`/zone/getAllMcc`)
        //                 this.mccList = this.mccList.sort((a: any, b: any) => a.mccName - b.mccName)
        //         } catch (e) {
        //                 console.error(e)
        //         }
        // }
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllPit`)
                        this.list = this.list.sort((a: any, b: any) => a.pitName - b.pitName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const zone = this.mccDataById.data.zone
                        const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
                        const mcc = this.mccList[this.mccList.findIndex((e: any) => e.mccId == this.form.value.mccId)]
                        const data = {
                                "pitDesc": this.form.value.pitDesc,
                                "pitName": this.form.value.pitName,
                                "mcc": mcc,
                                "zone": zone,
                                "wc": wc
                        }
                        console.log(data)
                        await this.service.post(`/zone/addPit`, data)
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
        deactivatePit(id: any) {
                this.service.deactivatePit(id).subscribe(
                        data => {
                                window.alert("Pit deleted successfully")
                                this.service.getAllPitData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                        },
                        error => {
                                window.alert("Something went wrong!!")
                        }
                );
        }

        getMccDataByWcId() {

                this.service.getWcById(this.form.value.wcId).subscribe(
                        data => {

                                this.wccByIdData = data
                                this.form.value.zoneId = this.wccByIdData.zone.zoneId
                                this.zoneName = this.wccByIdData.zone.zoneName
                                console.log(this.zoneName)
                        }
                );

                this.service.getAllMccByWcId(this.form.value.wcId).subscribe(
                        data => {

                                this.mccDataById = data
                                // this.zoneName=this.mccDataById.data.zone
                                this.mccList = this.mccDataById.data
                                console.log(this.mccDataById)
                        }
                );
        }


}
