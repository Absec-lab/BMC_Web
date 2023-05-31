import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DeactivationDto } from 'src/app/service/common.service';

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
        constructor(private service: CommonService, private route: Router, private formBuilder: FormBuilder) {
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
                itemId:new FormControl,
                itemCategoryId:new FormControl,
                categoryName: new FormControl,
                description: new FormControl
        });

        editFormData = new FormGroup({
                itemId: new FormControl,
                itemCategoryId: new FormControl,
                categoryName: new FormControl,
                description: new FormControl
        })
        async getItemCategory() {
                try {
                        this.categoryList = await this.service.get(`/zone/getAllItemCategory`)
                        this.categoryList = this.categoryList.sort((a: any, b: any) => a.categoryName - b.categoryName)
                } catch (e) {
                        console.error(e)
                }
        }
        addCategory() {
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
                this.service.addItemCategory(this.form.value).subscribe(
                        data => {
                                window.alert("Category data saved sucessfully")
                                this.form.reset()
                                this.service.getAllItemCategory().subscribe(
                                        data => {
                                                this.categoryList = data
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

                this.form = this.formBuilder.group({
                        itemId:item.itemId,
                        itemCategoryId: item.categoryId,
                        categoryName: item.categoryName,
                        description: item.categoryDesc
                })
               
        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
        }

        updateCategory(){
                console.log(this.form.value)
                this.service.updateZone(this.form.value).subscribe(
                        data=>{
                                window.alert("Category data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getZoneAllData().subscribe(
                                        data => {
                                                this.categoryList = data
                                        }
                                );
                        },
                        error=>{
                                window.alert("something went wrong")
                        }
                );

        }
}
