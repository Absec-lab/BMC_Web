import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-mcc-master',
  templateUrl: './mcc-master.component.html',
  styleUrls: ['../../common.css','./mcc-master.component.css']
})
export class MccMasterComponent {
        isAdd: boolean = true
        isUpdate: boolean = false
        responseData:any
        zoneId:any
        zoneName:any
        wealthCentreName:any
        wcId:any
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.getList()
                // this.getZones()
                this.getWCList()
        }

        form = new FormGroup({
                zoneId: new FormControl('', [Validators.required]),
                wcId: new FormControl('', [Validators.required]),
                mccName: new FormControl('', [Validators.required]),
                mccDesc: new FormControl,
                zone: new FormControl,
                wc: new FormControl,
                mccId: new FormControl
              });
        editForm = new FormGroup({
                zone: new FormControl(''),
                wc: new FormControl(''),
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
                        const mccName = this.form.value.mccName?.trim();
                        if (!mccName) {
                                this.toastService.showWarning('MCC name is required.');
                                return;
                        }
                        return;
                }
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
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.zoneName=item.zone.zoneName
                this.wealthCentreName=item.wc.wcName
                this.form.patchValue({
                        zoneId: item.zone.zoneId,
                        wcId: item.wc.wcId,
                        mccName: item.mccName,
                        mccDesc: item.mccDesc,
                        zone :item.zone,
                        wc:item.wc,
                        mccId:item.mccId
                })
                

        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
                this.form.reset()
        }

        updateMcc() {
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
                        const mccName = this.form.value.mccName?.trim();
                        if (!mccName) {
                                this.toastService.showWarning('MCC name is required.');
                                return;
                        }
                        return;
                }
                this.service.updateMcc(this.form.value).subscribe(
                        data => {
                                window.alert("SubGood data updated successfully!!")
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
}
