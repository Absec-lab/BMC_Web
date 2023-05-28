import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

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
        responseData:any
        constructor(private service: CommonService, private formBuilder: FormBuilder) {
                this.getList()
                this.getCategories()
        }
        ngOnInit(){
               this.isAdd=true
               this.isUpdate=false
        }

        form = new FormGroup({
                categoryId: new FormControl,
                categoryName:new FormControl,
                itemId: new FormControl,
                itemName: new FormControl
        });

        editForm = new FormGroup({
                categoryId: new FormControl,
                categoryName:new FormControl,
                itemId: new FormControl,
                itemName: new FormControl
        })

        list: any = []
        categoryList: any = []

        async getCategories() {
                try {
                        this.categoryList = await this.service.get(`/zone//zone/getAllItemCategory`)
                        this.categoryList = this.categoryList.sort((a: any, b: any) => a.categoryName - b.categoryName)
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
                        var category = this.categoryList[this.categoryList.findIndex((e: any) => e.categoryId == this.form.value.categoryId)]
                        const data = {
                                "itemName": this.form.value.itemName,
                                "itemDesc": this.form.value.itemName,
                                "category": category
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
                //.wcId=item.wcId
                //this.zoneName=item.zone.zoneName
                console.log(item.zone.zoneName)

                this.form = this.formBuilder.group({
                        categoryId: item.categoryId,
                        itemId: item.itemId,
                        itemName: item.itemDesc,
                        categoryName: item.categoryName,
                        
                })
                this.service.getZoneAllData().subscribe(
                        data=>{
                                this.categoryList=data
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
