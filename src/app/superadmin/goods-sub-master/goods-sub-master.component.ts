import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-goods-sub-master',
  templateUrl: './goods-sub-master.component.html',
  styleUrls: ['../../common.css','./goods-sub-master.component.css']
})
export class GoodsSubMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
                this.getGoodsList()
        }

        form = new FormGroup({
                goodsId: new FormControl(''),
                subgoodsName: new FormControl(''),
                subGoodsPerKg: new FormControl(''),
                subGoodsDesc: new FormControl('')
              });
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
}
