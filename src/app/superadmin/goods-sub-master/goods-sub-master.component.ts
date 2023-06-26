import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-goods-sub-master',
        templateUrl: './goods-sub-master.component.html',
        styleUrls: ['../../common.css', './goods-sub-master.component.css']
})
export class GoodsSubMasterComponent {
        isAdd: boolean = true
        isUpdate: boolean = false
        goodsName: any
        subGoodsId:any
        goodsId:any
        goods: any
        wcId : any = 0;
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                this.wcId = localStorage.getItem('wcId');
                this.getList()
                this.getGoodsList()
        }

        form = new FormGroup({
                goodssubId: new FormControl,
                goodsId: new FormControl('', [Validators.required]),
                wcId: new FormControl(0, [Validators.required]),
                subgoodsName: new FormControl('', [Validators.required]),
                subGoodsPerKg: new FormControl('', [Validators.required]),
                subGoodsDesc: new FormControl,
                goods: new FormControl
        });
        editForm = new FormGroup({
                //goodsId: new FormControl,
                goodssubId: new FormControl,
                subgoodsName: new FormControl,
                subGoodsPerKg: new FormControl,
                subGoodsDesc: new FormControl,
                goods: new FormControl
        })
        list: any = []
        goodsList: any = []

        async getGoodsList() {
                try {
                        this.goodsList = await this.service.get(`/zone/getAllGoods/`+this.wcId)
                        this.goodsList = this.goodsList.sort((a: any, b: any) => a.goodsName - b.goodsName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllGoodssub/`+this.wcId)
                        this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                if (this.form.status === 'INVALID') {
                        const goods = this.form.value.goodsId?.trim();
                        if (!goods) {
                                this.toastService.showWarning('Goods is required.');
                                return;
                        }
                        const subGoodsName = this.form.value.subgoodsName?.trim();
                        if (!subGoodsName) {
                                this.toastService.showWarning('Sub-goods name is required.');
                                return;
                        }
                        const subGoodsPerKg = this.form.value.subGoodsPerKg;
                        if (!subGoodsPerKg) {
                                this.toastService.showWarning('Sub-goods per kg is required.');
                                return;
                        }
                        return;

                }
                try {
                        const goods = this.goodsList[this.goodsList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
                        const data = {
                                "subGoodsDesc": this.form.value.subGoodsDesc,
                                "subGoodsPerKg": this.form.value.subGoodsPerKg,
                                "subgoodsName": this.form.value.subgoodsName,
                                "goods": goods,
                                "wcId":parseInt(this.wcId)
                        }
                        console.log(data)
                        await this.service.post(`/zone/addGoodssub`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteGoodssub/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                console.log(item.goodssubId)
                this.goodsName = item.goods.goodsName
                this.form.patchValue({
                        goodsId: item.goods.goodsId,
                        goodssubId: item.goodssubId,
                        subgoodsName: item.subgoodsName,
                        subGoodsPerKg: item.subGoodsPerKg,
                        subGoodsDesc: item.subGoodsDesc,
                        goods: item.goods
                })
                this.subGoodsId=item.goodssubId
                // this.service.getZoneAllData().subscribe(
                //         async data => {
                //                 this.goodsList = await this.service.get(`/zone/getAllGoods`)
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
                        const goods = this.form.value.goodsId;
                        if (!goods) {
                                this.toastService.showWarning('Goods is required.');
                                return;
                        }
                        const subGoodsName = this.form.value.subgoodsName?.trim();
                        if (!subGoodsName) {
                                this.toastService.showWarning('Sub-goods name is required.');
                                return;
                        }
                        const subGoodsPerKg = this.form.value.subGoodsPerKg;
                        if (!subGoodsPerKg) {
                                this.toastService.showWarning('Sub-goods per kg is required.');
                                return;
                        }
                        return;
                }
                this.form.value.wcId = parseInt(this.wcId);
                this.service.updateSubGood(this.form.value,this.subGoodsId).subscribe(
                        data => {
                                this.toastService.showSuccess("Sub-goods data updated successfully")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        },
                        error => {
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
