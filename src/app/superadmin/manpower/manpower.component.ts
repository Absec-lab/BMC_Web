import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DeactivationDto } from 'src/app/service/common.service';

@Component({
        selector: 'app-manpower',
        templateUrl: './manpower.component.html',
        styleUrls: ['../../common.css', './manpower.component.css']
})
export class ManpowerComponent implements OnInit {
        [x: string]: any;
        isAdd: boolean = false
        isUpdate: boolean = false
        zoneResponseById: any
        deactivationDto: DeactivationDto = new DeactivationDto
        constructor(private service: CommonService, private route: Router, private formBuilder: FormBuilder) {
        }
        zoneList: any = []
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getZoneAllData().subscribe(
                        data => {
                                this.zoneList = data
                        }
                );
        }

        form = new FormGroup({
                zoneId:new FormControl,
                zoneName: new FormControl,
                zoneDesc: new FormControl
        });

        editFormData = new FormGroup({
                zoneId: new FormControl,
                zoneName: new FormControl,
                zoneDesc: new FormControl
        })
        async getZones() {
                try {
                        this.zoneList = await this.service.get(`/zone/getAllZone`)
                        this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        addNewZone() {
                /* Manoj Remove Date 08-05-2023 */
                // try {
                //         console.log(this.form.value)
                //         await this.service.post(`/zone/addZone`, this.form.value)
                //         this.form.reset()
                //         this.getZones()
                // } catch (e) {
                //         console.error(e)
                // }
                /* Manoj added Date 08-05-2023*/
                this.service.addZone(this.form.value).subscribe(
                        data => {
                                window.alert("Zone data saved sucessfully")
                                this.form.reset()
                                this.service.getZoneAllData().subscribe(
                                        data => {
                                                this.zoneList = data
                                        }
                                );
                        },
                        error => {
                                window.alert("Something went wrong")
                        }
                );
        }
        async removeZone(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteZone/${id}`)
                        this.getZones()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateZone(id: any) {
                this.service.deactivateZone(id).subscribe(
                        data => {
                                window.alert("Zone deleted successfully")
                                this.service.getZoneAllData().subscribe(
                                        data => {
                                                this.zoneList = data
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

                this.form = this.formBuilder.group({
                        zoneId: item.zoneId,
                        zoneName: item.zoneName,
                        zoneDesc: item.zoneDesc
                })
               
        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
        }

        updateZone(){
                console.log(this.form.value)
                this.service.updateZone(this.form.value).subscribe(
                        data=>{
                                window.alert("Zone data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getZoneAllData().subscribe(
                                        data => {
                                                this.zoneList = data
                                        }
                                );
                        },
                        error=>{
                                window.alert("something went wrong")
                        }
                );

        }
}
