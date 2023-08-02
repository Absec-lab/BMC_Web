import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-goods-master',
  templateUrl: './goods-master.component.html',
  styleUrls: ['../../common.css','./goods-master.component.css']
})
export class GoodsMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        wcId : any = 0;
        constructor(private service: CommonService, private formBuilder:FormBuilder, private toastService: ToastService) {
                this.getWCList();
                this.wcId = localStorage.getItem('wcId');
                this.getList()
        }
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getAllGoods(this.wcId).subscribe(
                        data => {
                                this.list = data
                        }
                );
        }
        form = new FormGroup({
                goodsId: new FormControl,
                wcId: new FormControl(0, [Validators.required]),
                goodsName: new FormControl('', [Validators.required]),
                //goodsPerKg: new FormControl('',),
                goodsDesc: new FormControl
              });

        editFormData = new FormGroup({
                goodsId: new FormControl,
                wcId: new FormControl,
                goodsName: new FormControl,
                //goodsPerKg: new FormControl,
                goodsDesc: new FormControl
        })
        list: any = []
        wcList: any = []
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
                        this.list = await this.service.get(`/zone/getAllGoods/`+this.wcId)
                        this.list = this.list.sort((a: any, b: any) => a.goodsName - b.goodsName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                if (this.form.status === 'INVALID') {
                        if (!this.wcId) {
                                this.toastService.showWarning('Wealth center is required. Please login again. ');
                                return;
                        }
                        const goodsName = this.form.value.goodsName?.trim();
                        if (!goodsName) {
                                this.toastService.showWarning('Goods name is required.');
                                return;
                        }
                        // const goodsPerKg = this.form.value.goodsPerKg;
                        // if (!goodsPerKg) {
                        //         this.toastService.showWarning('Goods per kg is required.');
                        //         return;
                        // }
                }
                this.form.value.wcId = parseInt(this.wcId);
                const data={
                        "goodsName":this.form.value.goodsName,
                        // "goodsPerKg":this.form.value.goodsPerKg,
                        "goodsDesc":this.form.value.goodsDesc,
                        "wcId":{
                                "wcId":this.form.value.wcId
                        }
                }
                try {
                        await this.service.post(`/zone/addGoods`, data)
                        this.service.getAllGoods(this.wcId).subscribe(
                                data => {
                                        this.list = data
                                }
                        );
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteGoods/${id}`)
                        window.alert("Good Deleted Successfully!!")
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
                updateData(item: any) {
                        this.isUpdate = true
                        this.isAdd = false
                        console.log(item)

                this.form.patchValue({
                        goodsId: item.goodsId,
                        goodsName: item.goodsName,
                        //: item.goodsPerKg,
                        goodsDesc: item.goodsDesc
                        })
                
                }
                cancel() {
                        this.isAdd = true
                        this.isUpdate = false
                }

        updateGoods(){
                if (this.form.status === 'INVALID') {
                        if (!this.wcId) {
                                this.toastService.showWarning('Wealth center is required. Please login again. ');
                                return;
                        }
                        const goodsName = this.form.value.goodsName?.trim();
                        if (!goodsName) {
                                this.toastService.showWarning('Goods name is required.');
                                return;
                        }
                        // const goodsPerKg = this.form.value.goodsPerKg;
                        // if (!goodsPerKg) {
                        //         this.toastService.showWarning('Goods per kg is required.');
                        //         return;
                        // }
                        // return;
                }
                this.form.value.wcId = parseInt(this.wcId);
                const data={
                        
                                "goodsId": this.form.value.goodsId,
                                "wcId": {
                                        "wcId":this.form.value.wcId
                                },
                                "goodsName": this.form.value.goodsName,
                                "goodsDesc": this.form.value.goodsDesc
                            
                }
                this.service.updateGoods(data).subscribe(
                        data=>{
                                this.toastService.showSuccess("Goods data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getAllGoods(this.wcId).subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                                this.form.reset();
                        },
                        error=>{
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
