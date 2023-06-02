import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

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
        constructor(private service: CommonService, private formBuilder: FormBuilder) {
                this.getList()
                this.getZones()
        }
        ngOnInit(){
               this.isAdd=true
               this.isUpdate=false
        }

        form = new FormGroup({
                zoneId: new FormControl,
                zoneName:new FormControl,
                wcName: new FormControl,
                wcDesc: new FormControl,
                wcId: new FormControl
        });

        editForm = new FormGroup({
                zoneId: new FormControl,
                zoneName: new FormControl,
                wcName: new FormControl,
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

                this.form = this.formBuilder.group({
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
                console.log(this.form.value)
                this.service.updateWc(this.form.value).subscribe(
                        data => {
                                window.alert("Wcc data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.service.getAllWcData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                        },
                        error => {
                                window.alert("something went wrong")
                        }
                );

        }
}
