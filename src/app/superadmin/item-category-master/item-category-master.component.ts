import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DeactivationDto } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-item-category-master',
        templateUrl: './item-category-master.component.html',
        styleUrls: ['../../common.css', './item-category-master.component.css']
})
export class ItemCategoryMasterComponent implements OnInit { 
        [x: string]: any;
        isAdd: boolean = false
        isUpdate: boolean = false
        categoryResponseById: any
        deactivationDto: DeactivationDto = new DeactivationDto
        constructor(private service: CommonService, private route: Router, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.getItemCategory();
        }
        categoryList: any = []
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getAllItemCategory().subscribe(
                        data => {
                                this.categoryList = data
                        }
                );
                
        }

        form = new FormGroup({
                itemCategoryId:new FormControl,
                categoryName: new FormControl('', [Validators.required]),
                description: new FormControl
        });

        editFormData = new FormGroup({
                itemCategoryId: new FormControl,
                categoryName: new FormControl,
                description: new FormControl
        })
        async getItemCategory() {
                try {
                        this.categoryList = await this.service.get(`/inventory/getAllItemCategory`)
                        this.categoryList = this.categoryList.sort((a: any, b: any) => a.categoryName - b.categoryName)
                } catch (e) {
                        console.error(e)
                }
        }
        addCategory() {
                if (this.form.status === 'INVALID') {
                        const categoryName = this.form.value.categoryName?.trim();
                        if (!categoryName) {
                                this.toastService.showWarning('Category name is required.');
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
                const data={
                       "categoryName":this.form.value.categoryName,
                       "description": this.form.value.description,
                       "wcEntity":{
                        "wcId":localStorage.getItem("wcId")
                       } 
                }
                this.service.addItemCategory(data).subscribe(
                        data => {
                                this.toastService.showSuccess("Category data saved sucessfully")
                                this.form.reset()
                                this.service.getAllItemCategory().subscribe(
                                        data => {
                                                this.categoryList = data
                                        }
                                );
                                this.getItemCategory();
                        },
                        error => {
                                this.toastService.showError("Something went wrong")
                        }
                );
        }
        async removeZone(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteZone/${id}`)
                        this.getItemCategory()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateCategory(id: any) {
                this.service.deactivateCategory(id).subscribe(
                        data => {
                                window.alert("Item Category deleted successfully")
                                this.service.getAllItemCategory().subscribe(
                                        data => {
                                                this.categoryList = data
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

                this.form.patchValue({
                        itemCategoryId: item.itemCategoryId,
                        categoryName: item.categoryName,
                        description: item.description
                })
               
        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
        }

        updateCategory(){

                if (this.form.status === 'INVALID') {
                        const categoryName = this.form.value.categoryName?.trim();
                        if (!categoryName) {
                                this.toastService.showWarning('Category name is required.');
                                return;
                        }
                        return;
                }

                this.service.updateItemCategory(this.form.value).subscribe(
                        data=>{
                                this.toastService.showSuccess("Category data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getAllItemCategory().subscribe(
                                        data => {
                                                this.categoryList = data
                                        }
                                );
                                this.getItemCategory();
                        },
                        error=>{
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
