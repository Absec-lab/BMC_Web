import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-agency-master',
  templateUrl: './agency-master.component.html',
  styleUrls: ['../../common.css', './agency-master.component.css']
})
export class AgencyMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        zoneName:any
        wcId:any
        wardId:any
        responseData:any
        wealthCentreName:any
        wcName:any
        role:any
        agencyId:any
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.role =  localStorage.getItem('role');
                this.wcId =  localStorage.getItem('wcId');
                this.getList();
        }
        ngOnInit(){
                this.isAdd=true
                this.isUpdate=false
                this.service.getAllAgency().subscribe(
                        data=>{
                                this.wcList=data
                        }
                );

         }
        form = new FormGroup({
                agencyId: new FormControl,
                agencyName:new FormControl('', [Validators.required]),
                agencyPhone:new FormControl('', [Validators.required]),
                agencyAddr:new FormControl('', [Validators.required]),
                zoneId: new FormControl('', [Validators.required]),
                wcId: new FormControl('', [Validators.required]),
                wardId: new FormControl,
                agencyDescription: new FormControl                
              });
        editForm = new FormGroup({
                agencyId: new FormControl,
                agencyName : new FormControl,
                agencyPhone : new FormControl,
                agencyAddr : new FormControl,
                zoneId: new FormControl,
                wcId: new FormControl,
                wardId: new FormControl,
                agencyDescription: new FormControl
                           
        })
        list: any = []
        zoneList: any = []
        wcList: any = []
        async getList() {
                try {
                        //let wcId = localStorage.getItem('role') != 'bmcadmin' ? this.wcId : 0
                        this.list = await this.service.get(`/agency/getAllAgency`)
                        //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        
        async addNew() {
                // if (this.form.status === 'INVALID') {
                //         const weathCentre = this.form.value.wcId?.trim();
                //         if (!weathCentre) {
                //                 this.toastService.showWarning('Wealth centre is required.');
                //                 return;
                //         }
                //         const zone = this.form.value.zoneId?.trim();
                //         if (!zone) {
                //                 this.toastService.showWarning('Zone is required.');
                //                 return;
                //         }
                //         const wardName = this.form.value.wardName?.trim();
                //         if (!wardName) {
                //                 this.toastService.showWarning('Ward name is required.');
                //                 return;
                //         }
                //         return;
                // }
                try {
                        const data = {
                                "agencyId":this.form.value.agencyId,
                                "agencyName": this.form.value.agencyName,
                                "agencyPhoneNo": this.form.value.agencyPhone,
                                 "agencyAddress": this.form.value.agencyAddr,
                                "agencyDesc": this.form.value.agencyDescription
                                 }
                        console.log(data)
                        await this.service.post(`/agency/addAgency`, data)
                        this.service.getAllAgency().subscribe(
                                data=>{
                                        this.wcList=data
                                }
                        );
                        this.toastService.showSuccess("Agency data adeed successfully!!")
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                        this.toastService.showError('Some error occured.');
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/agency/deleteWard/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        
        deactivateAgency(id:any){
                this.service.deactivateAgency(id).subscribe(
                        data=>{
                                window.alert("Agency deleted successfully")
                                this.service.getAllAgency().subscribe(
                                        data=>{
                                                this.wcList=data
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
                        agencyId:item.agencyId,
                        agencyName: item.agencyName,
                        agencyPhone: item.agencyPhone,
                        agencyAddr: item.agencyAddr,
                        agencyDescription: item.agencyDescription             
                        
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
                // if (this.form.status === 'INVALID') {
                //         const weathCentre = this.form.value.wcId?.trim();
                //         if (!weathCentre) {
                //                 this.toastService.showWarning('Wealth centre is required.');
                //                 return;
                //         }
                //         const zone = this.form.value.zoneId?.trim();
                //         if (!zone) {
                //                 this.toastService.showWarning('Zone is required.');
                //                 return;
                //         }
                //         const wardName = this.form.value.wardName?.trim();
                //         if (!wardName) {
                //                 this.toastService.showWarning('Ward name is required.');
                //                 return;
                //         }
                //         return;
                // }
                this.service.updateWard(this.form.value).subscribe(
                        data => {
                                this.toastService.showSuccess("Agency data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.service.getAllWcData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                                this.form.reset()
                                //this.getList()
                        },
                        error => {
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
