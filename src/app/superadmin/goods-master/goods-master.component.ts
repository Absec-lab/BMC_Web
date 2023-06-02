import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormControl,FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-goods-master',
  templateUrl: './goods-master.component.html',
  styleUrls: ['../../common.css','./goods-master.component.css']
})
export class GoodsMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        constructor(private service: CommonService, private formBuilder:FormBuilder) {
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
                goodsName: new FormControl,
                goodsPerKg: new FormControl,
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

        this.form = this.formBuilder.group({
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
                console.log(this.form.value)
                this.service.updateGoods(this.form.value).subscribe(
                        data=>{
                                window.alert("Goods data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getAllGoods().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                        },
                        error=>{
                                window.alert("something went wrong")
                        }
                );

        }
}
