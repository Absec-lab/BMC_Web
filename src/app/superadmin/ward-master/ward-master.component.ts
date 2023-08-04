import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-ward-master',
  templateUrl: './ward-master.component.html',
  styleUrls: ['../../common.css', './ward-master.component.css']
})
export class WardMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        zoneName:any
        wcId:any
        wardId:any
        responseData:any
        wealthCentreName:any
        wcName:any
        role:any
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.role =  localStorage.getItem('role');
                this.wcId =  localStorage.getItem('wcId');
                this.getList()
                this.getZones()
                // this.getWCList()
        }
        ngOnInit(){
                this.isAdd=true
                this.isUpdate=false
                this.service.getAllWcData().subscribe(
                        data=>{
                                this.wcList=data
                        }
                );

         }
        form = new FormGroup({
                zoneId: new FormControl('', [Validators.required]),
                wcId: new FormControl('', [Validators.required]),
                wardId: new FormControl,
                wardName: new FormControl('', [Validators.required]),
                wardDesc: new FormControl                
              });
        editForm = new FormGroup({
                zoneId: new FormControl,
                wcId: new FormControl,
                wardId: new FormControl,
                wardName: new FormControl,
                wardDesc: new FormControl, 
                wc:new FormControl,
                zone:new FormControl             
        })
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
                        let wcId = localStorage.getItem('role') != 'bmcadmin' ? this.wcId : 0
                        this.list = await this.service.get(`/zone/getAllWard/`+wcId)
                        this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
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
        async addNew() {
                if (this.form.status === 'INVALID') {
                        const weathCentre = this.form.value.wcId?.trim();
                        if (!weathCentre) {
                                this.toastService.showWarning('Wealth centre is required.');
                                return;
                        }
                        const zone = this.form.value.zoneId?.trim();
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const wardName = this.form.value.wardName?.trim();
                        if (!wardName) {
                                this.toastService.showWarning('Ward name is required.');
                                return;
                        }
                        return;
                }
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
                        this.service.getAllWcData().subscribe(
                                data=>{
                                        this.wcList=data
                                }
                        );
                        this.toastService.showSuccess("Ward data adeed successfully!!")
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                        this.toastService.showError('Some error occured.');
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
        getWccListByZoneId(){
                console.log(this.form.value.zoneId)
                this.service.getWcListByZoneId(this.form.value.zoneId).subscribe(
                        data=>{
                                this.responseData=data
                                this.wcList = this.responseData.data.sort((a: any, b: any) => a.wcName - b.wcName)
                        }
                );
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.wcId=item.wcId
                this.wardId=item.wardId
                this.zoneName=item.zone.zoneName
                this.wealthCentreName=item.wc.wcName
                console.log(item.zone.zoneName)

                this.form.patchValue({
                        zoneId: item.zone.zoneId,
                        wcId: item.wc.wcId,
                        wardId: item.wardId,
                        wardName: item.wardName,
                        wardDesc: item.wardDesc             
                        
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

        updateWard() {
                if (this.form.status === 'INVALID') {
                        const weathCentre = this.form.value.wcId?.trim();
                        if (!weathCentre) {
                                this.toastService.showWarning('Wealth centre is required.');
                                return;
                        }
                        const zone = this.form.value.zoneId?.trim();
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const wardName = this.form.value.wardName?.trim();
                        if (!wardName) {
                                this.toastService.showWarning('Ward name is required.');
                                return;
                        }
                        return;
                }
                this.service.updateWard(this.form.value).subscribe(
                        data => {
                                this.toastService.showSuccess("Ward data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.service.getAllWcData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                                this.form.reset()
                                this.getList()
                        },
                        error => {
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
