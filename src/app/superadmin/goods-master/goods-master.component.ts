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
        constructor(private service: CommonService, private formBuilder:FormBuilder, private toastService: ToastService) {
                this.getList()
        }
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getAllGoods().subscribe(
                        data => {
                                this.list = data
                        }
                );
        }
        form = new FormGroup({
                goodsId: new FormControl,
                goodsName: new FormControl('', [Validators.required]),
                goodsPerKg: new FormControl('', [Validators.required]),
                goodsDesc: new FormControl
              });

        editFormData = new FormGroup({
                goodsId: new FormControl,
                goodsName: new FormControl,
                goodsPerKg: new FormControl,
                goodsDesc: new FormControl
        })
        list: any = []
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllGoods`)
                        this.list = this.list.sort((a: any, b: any) => a.goodsName - b.goodsName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                if (this.form.status === 'INVALID') {
                        const goodsName = this.form.value.goodsName?.trim();
                        if (!goodsName) {
                                this.toastService.showWarning('Goods name is required.');
                                return;
                        }
                        const goodsPerKg = this.form.value.goodsPerKg?.trim();
                        if (!goodsPerKg) {
                                this.toastService.showWarning('Goods per kg is required.');
                                return;
                        }
                        return;
                }
                try {
                        await this.service.post(`/zone/addGoods`, this.form.value)
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
                goodsPerKg: item.goodsPerKg,
                goodsDesc: item.goodsDesc
                })
               
         }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
        }

        updateGoods(){
                if (this.form.status === 'INVALID') {
                        const goodsName = this.form.value.goodsName?.trim();
                        if (!goodsName) {
                                this.toastService.showWarning('Goods name is required.');
                                return;
                        }
                        const goodsPerKg = this.form.value.goodsPerKg?.trim();
                        if (!goodsPerKg) {
                                this.toastService.showWarning('Goods per kg is required.');
                                return;
                        }
                        return;
                }
                this.service.updateGoods(this.form.value).subscribe(
                        data=>{
                                this.toastService.showSuccess("Goods data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getAllGoods().subscribe(
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
