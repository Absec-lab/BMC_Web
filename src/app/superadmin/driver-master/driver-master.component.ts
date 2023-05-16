import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-driver-master',
  templateUrl: './driver-master.component.html',
  styleUrls: ['../../common.css','./driver-master.component.css']
})
export class DriverMasterComponent {
        constructor(private service: CommonService) {
                this.getList()
                this.getWCList()
        }

        form = new FormGroup({
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
}
