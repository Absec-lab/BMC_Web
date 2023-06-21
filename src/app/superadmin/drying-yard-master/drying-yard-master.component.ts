import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DeactivationDto } from 'src/app/service/common.service'; 
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-drying-yard-master',
        templateUrl: './drying-yard-master.component.html',
        styleUrls: ['../../common.css', './drying-yard-master.component.css']
})
export class DryingYardMasterComponent implements OnInit {
        [x: string]: any;
        isAdd: boolean = false
        isUpdate: boolean = false
        dryingYardResponseById: any
        deactivationDto: DeactivationDto = new DeactivationDto
        constructor(private service: CommonService, private route: Router, private formBuilder: FormBuilder, private toastService: ToastService) {
        }
        dryingYardList: any = []
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getDryingYardAllData().subscribe(
                        data => {
                                this.dryingYardList = data
                        }
                );
        }

        form = new FormGroup({
                dryyardId:new FormControl,
                centerName: new FormControl('', [Validators.required]),
                description: new FormControl
        });

        editFormData = new FormGroup({
                dryyardId: new FormControl,
                centerName: new FormControl,
                description: new FormControl
        })
        async getDryingYard() {
                try {
                        this.dryingYardList = await this.service.get(`/inventory/getAllDryingyard`)
                        this.dryingYardList = this.dryingYardList.sort((a: any, b: any) => a.centerName - b.centerName)
                } catch (e) {
                        console.error(e)
                }
        }
        addDryingYard() {

                if (this.form.status === 'INVALID') {
                        const centerName = this.form.value.centerName?.trim();
                        if (!centerName) {
                                this.toastService.showWarning('Center name is required.');
                                return;
                        }
                        return;
                }
                
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
                this.service.addDryingYard(this.form.value).subscribe(
                        data => {
                                
                                this.toastService.showSuccess("Drying Yard data saved sucessfully")
                                this.form.reset()
                                this.service.getDryingYardAllData().subscribe(
                                        data => {
                                                this.dryingYardList = data
                                        }
                                );
                        },
                        error => {
                                this.toastService.showError("Something went wrong")
                        }
                );
        }
        async removeZone(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteZone/${id}`)
                        this.getDryingYard()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateDryingYard(id: any) {
                this.service.deactivateDryingYard(id).subscribe(
                        data => {
                                window.alert("Drying Yard deleted successfully")
                                this.service.getDryingYardAllData().subscribe(
                                        data => {
                                                this.dryingYardList = data
                                        }
                                );
                                this.form.reset()
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

                this.form.patchValue({
                        dryyardId: item.dryyardId,
                        centerName: item.centerName,
                        description: item.description
                })
               
        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
        }

        updateDryingYard(){
                if (this.form.status === 'INVALID') {
                        const centerName = this.form.value.centerName?.trim();
                        if (!centerName) {
                                this.toastService.showWarning('Center name is required.');
                                return;
                        }
                        return;
                }
                this.service.updateDryingYard(this.form.value).subscribe(
                        data=>{
                                this.toastService.showSuccess("Drying Yard data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getDryingYardAllData().subscribe(
                                        data => {
                                                this.dryingYardList = data
                                        }
                                );
                                this.form.reset()
                        },
                        error=>{
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
