import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-item-name-master',
        templateUrl: './item-name-master.component.html',
        styleUrls: ['../../common.css', './item-name-master.component.css']
})
export class ItemNameMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        categoryId:any
        categoryName:any
        itemName:any
        itemCategoryId:any
        itemId:any
        category:any
        responseData:any
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.getList()
                this.getCategories()
        }
        ngOnInit(){
               this.isAdd=true
               this.isUpdate=false
               this.service.getAllItemCategory().subscribe(
                data=>{
                        this.categoryList=data
                }
               );
               this.service.getAllItemName().subscribe(
                data=>{
                        this.list=data
                }
               );
        }

        form = new FormGroup({
                itemCategoryId: new FormControl('', [Validators.required]),
                categoryName: new FormControl,
                itemId: new FormControl,
                itemName: new FormControl('', [Validators.required]),
                itemcategory: new FormControl,
                description: new FormControl
        });

        editForm = new FormGroup({
                itemCategoryId: new FormControl,
                categoryName: new FormControl,
                itemId: new FormControl,
                itemName: new FormControl,
                itemcategory: new FormControl,
                description: new FormControl
        })

        list: any = []
        categoryList: any = []

        async getCategories() {
                try {
                        this.categoryList = await this.service.getAllItemCategory()
                        this.categoryList = this.categoryList.sort((a: any, b: any) => a.categoryName - b.categoryName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/inventory/getAllItemName`)
                        this.list = this.list.sort((a: any, b: any) => a.itemName - b.itemName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                if (this.form.status === 'INVALID') {
                        const category = this.form.value.itemCategoryId?.trim();
                        if (!category) {
                                this.toastService.showWarning('Category is required.');
                                return;
                        }
                        const itemName = this.form.value.itemName?.trim();
                        if (!itemName) {
                                this.toastService.showWarning('Item name is required.');
                                return;
                        }
                        return;
                }
                try {
                        const category = this.categoryList[this.categoryList.findIndex((e: any) => e.itemCategoryId == this.form.value.itemCategoryId)]
                        const data = {
                                "itemId":this.form.value.itemId,
                                "itemname": this.form.value.itemName,
                                "description": this.form.value.description,
                                "itemcatrgory": category,
                                "wcEntity":{
                                        "wcId":localStorage.getItem("wcId")
                                }
                        }
                        this.service.addItemName(data).subscribe(
                                data=>{
                                        this.responseData=data
                                        this.toastService.showSuccess(this.responseData.message)
                                },
                                error=>{
                                        this.responseData=error
                                        this.toastService.showError(this.responseData.error.message)
                                }
                        );
                        this.form.reset()
                        this.service.getAllItemName().subscribe(
                                data=>{
                                        this.list=data
                                }
                               );
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

        deactivateItemName(id: any) {
                this.service.deactivateItemName(id).subscribe(
                        data => {
                                window.alert("Item deleted successfully")
                                this.service.getAllItemNameData().subscribe(
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

                this.form.patchValue({
                        itemCategoryId: item.itemcatrgory.itemCategoryId,
                        itemId: item.itemId,
                        itemName: item.itemname,
                        categoryName: item.categoryName,
                        itemcategory: item.category,
                        description: item.description
                });

                // this.service.getZoneAllData().subscribe(
                //         data=>{
                //                 this.categoryList=data
                //         }
                // );

        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
                this.form.reset()
        }

        updateWcc() {
                if (this.form.status === 'INVALID') {
                        const category = this.form.value.itemCategoryId?.trim();
                        if (!category) {
                                this.toastService.showWarning('Category is required.');
                                return;
                        }
                        const itemName = this.form.value.itemName?.trim();
                        if (!itemName) {
                                this.toastService.showWarning('Item name is required.');
                                return;
                        }
                        return;
                }
                this.service.updateWc(this.form.value).subscribe(
                        data => {
                                this.toastService.showSuccess("Item updated successfully!!")
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
