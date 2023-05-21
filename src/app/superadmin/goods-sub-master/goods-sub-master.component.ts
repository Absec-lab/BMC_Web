import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

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
        constructor(private service: CommonService, private formBuilder: FormBuilder) {
                this.getList()
                this.getGoodsList()
        }

        form = new FormGroup({
                goodssubId: new FormControl,
                goodsId: new FormControl,
                subgoodsName: new FormControl,
                subGoodsPerKg: new FormControl,
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
                        this.goodsList = await this.service.get(`/zone/getAllGoods`)
                        this.goodsList = this.goodsList.sort((a: any, b: any) => a.goodsName - b.goodsName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllGoodssub`)
                        this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const goods = this.goodsList[this.goodsList.findIndex((e: any) => e.goodsId == this.form.value.goodsId)]
                        const data = {
                                "subGoodsDesc": this.form.value.subGoodsDesc,
                                "subGoodsPerKg": this.form.value.subGoodsPerKg,
                                "subgoodsName": this.form.value.subgoodsName,
                                "goods": goods
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
                this.form = this.formBuilder.group({
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
                console.log(this.form.value)
                this.service.updateSubGood(this.form.value,this.subGoodsId).subscribe(
                        data => {
                                window.alert("SubGood data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        },
                        error => {
                                window.alert("something went wrong")
                        }
                );

        }
}
