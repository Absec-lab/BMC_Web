import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-pit-master',
        templateUrl: './pit-master.component.html',
        styleUrls: ['../../common.css', './pit-master.component.css']
})
export class PitMasterComponent {
        mccDataById: any
        wccByIdData: any
        zoneName: any
        constructor(private service: CommonService, private toastService: ToastService) {
                this.getList()
                // this.getZones()
                this.getWCList()
                // this.getMccList()
        }

        form = new FormGroup({
                zoneId: new FormControl('', [Validators.required]),
                wcId: new FormControl('', [Validators.required]),
                mccId: new FormControl('', [Validators.required]),
                pitName: new FormControl('', [Validators.required]),
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
                if (this.form.status === 'INVALID') {
                        const wealthCenter = this.form.value.wcId?.trim();
                        if (!wealthCenter) {
                                this.toastService.showWarning('Wealth center is required.');
                                return;
                        }
                        const zone = this.form.value.zoneId?.trim();
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const mcc = this.form.value.mccId?.trim();
                        if (!mcc) {
                                this.toastService.showWarning('MCC is required.');
                                return;
                        }
                        const pitName = this.form.value.pitName?.trim();
                        if (!pitName) {
                                this.toastService.showWarning('Pit name is required.');
                                return;
                        }
                        return;
                }
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
                                this.toastService.showSuccess("Pit deleted successfully")
                                this.service.getAllPitData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                        },
                        error => {
                                this.toastService.showError("Something went wrong!!")
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
