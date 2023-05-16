import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-goods-master',
  templateUrl: './goods-master.component.html',
  styleUrls: ['../../common.css','./goods-master.component.css']
})
export class GoodsMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
        }

        form = new FormGroup({
                goodsName: new FormControl(''),
                goodsPerKg: new FormControl(''),
                goodsDesc: new FormControl('')
              });
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
}
