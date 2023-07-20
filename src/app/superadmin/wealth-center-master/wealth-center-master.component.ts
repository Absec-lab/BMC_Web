import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-wealth-center-master',
        templateUrl: './wealth-center-master.component.html',
        styleUrls: ['../../common.css', './wealth-center-master.component.css']
})
export class WealthCenterMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        zoneName:any
        wcId:any
        zoneId:any
        responseData:any
        role:any
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.role =  localStorage.getItem('role');
                // this.getList()
                this.getZones()
        }
        ngOnInit(){
               this.isAdd=true
               this.isUpdate=false
               this.service.getAllWcData().subscribe(
                data=>{
                        this.list=data
                }
               );
        }

        form = new FormGroup({
                zoneId: new FormControl('', [Validators.required]),
                zoneName:new FormControl,
                wcName: new FormControl('', [Validators.required]),
                wcDesc: new FormControl,
                wcId: new FormControl
        });

        editForm = new FormGroup({
                zoneId: new FormControl('', [Validators.required]),
                zoneName: new FormControl,
                wcName: new FormControl('', [Validators.required]),
                wcDesc: new FormControl,
                wcId: new FormControl
        })

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
                if (this.form.status === 'INVALID') {
                        const zone = this.form.value.zoneId?.trim();
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const wcName = this.form.value.wcName?.trim();
                        if (!wcName) {
                                this.toastService.showWarning('WC name is required.');
                                return;
                        }
                        return;
                }
                try {
                        var zone = this.zoneList[this.zoneList.findIndex((e: any) => e.zoneId == this.form.value.zoneId)]
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

        deactivateWc(id: any) {
                this.service.deactivateWc(id).subscribe(
                        data => {
                                window.alert("Wealth Centre deleted successfully")
                                this.service.getAllWcData().subscribe(
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

        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.wcId=item.wcId
                this.zoneName=item.zone.zoneName
                console.log(item.zone.zoneName)

                this.form.patchValue({
                        zoneId: item.zoneId,
                        zoneName: item.zoneName,
                        wcName: item.wcName,
                        wcDesc: item.wcDesc,
                        wcId: item.wcId
                })
                this.service.getZoneAllData().subscribe(
                        data=>{
                                this.zoneList=data
                        }
                );

        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
                this.form.reset()
        }

        updateWcc() {
                if (this.form.status === 'INVALID') {
                        const zone = this.form.value.zoneId?.trim();
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const wcName = this.form.value.wcName?.trim();
                        if (!wcName) {
                                this.toastService.showWarning('WC name is required.');
                                return;
                        }
                        return;
                }
                this.service.updateWc(this.form.value).subscribe(
                        data => {
                                this.toastService.showSuccess("Wcc data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.service.getAllWcData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                        },
                        error => {
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
