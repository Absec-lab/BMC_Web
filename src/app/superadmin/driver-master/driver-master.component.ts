import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-driver-master',
  templateUrl: './driver-master.component.html',
  styleUrls: ['../../common.css','./driver-master.component.css']
})
export class DriverMasterComponent {
        isAdd: boolean = false
        isUpdate: boolean = false
        driverId:any
        wcId: any
        constructor(private service: CommonService, private formBuilder: FormBuilder) {
                this.getList()
                this.getWCList()
        }

        form = new FormGroup({
                driverName: new FormControl,
                driverPhoto: new FormControl,
                phoneNo: new FormControl,
                dlNo: new FormControl,
                dlExpiry: new FormControl,
                dlPhoto: new FormControl,
                address: new FormControl,
                dlDesc: new FormControl
              });
        editForm =new FormGroup({
                driverName: new FormControl(''),
                driverPhoto: new FormControl(''),
                phoneNo: new FormControl(''),
                dlNo: new FormControl(''),
                dlExpiry: new FormControl(''),
                dlPhoto: new FormControl(''),
                address: new FormControl(''),
                dlDesc: new FormControl('')
              });
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
                        this.list = await this.service.get(`/zone/getAllDriver`)
                        this.list = this.list.sort((a: any, b: any) => a.driverName - b.driverName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const data = {
                                ...this.form.value,
                                "status": true
                        }
                        console.log(data)
                        await this.service.post(`/zone/addDriver`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteDriver/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.driverId = item.driverId
                this.form = this.formBuilder.group({
                        driverName: item.driverName,
                        driverPhoto: item.driverPhoto,
                        phoneNo: item.phoneNo,
                        dlNo: item.dlNo,
                        dlExpiry: item.dlExpiry,
                        dlPhoto: item.dlPhoto,
                        address: item.address,
                        dlDesc: item.dlDesc
                })
                this.wcId=this.wcList.wcId
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

        updateDriver() {
                console.log(this.form.value)
                this.service.updateDriver(this.form.value).subscribe(
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
