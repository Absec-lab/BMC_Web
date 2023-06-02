import { Component } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-helper-master',
  templateUrl: './helper-master.component.html',
  styleUrls: ['../../common.css','./helper-master.component.css']
})
export class HelperMasterComponent {
        isAdd: boolean = true
        isUpdate: boolean = false
        helperId:any
        helperIdProof:any
        wcId: any
        isActive: boolean = false
        constructor(private service: CommonService, private formBuilder: FormBuilder) {
                this.getList()
                this.getWCList()
        }

        form = new FormGroup({
                helperId:new FormControl,
                helperName: new FormControl,
                helperIdProof: new FormControl,
                helperPhoto: new FormControl,
                phoneNo: new FormControl,
                address: new FormControl,
                helperDesc: new FormControl,
                isActive: new  FormControl,
              });
        editForm =new FormGroup({
                helperId:new FormControl,
                helperName: new FormControl(''),
                helperIdProof: new FormControl(''),
                helperPhoto: new FormControl(''),
                phoneNo: new FormControl(''),
                address: new FormControl(''),
                helperDesc: new FormControl(''),
                isActive: new FormControl(''),
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
                        this.list = await this.service.get(`/zone/getAllHelper`)
                        this.list = this.list.sort((a: any, b: any) => a.helperName - b.helperName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                try {
                        const data = {
                                ...this.form.value,
                                "wc":{"wcId":1},
                                "isActive": false
                        }
                        console.log(data)
                        await this.service.post(`/zone/addHelper`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteHelper/${id}`)
                        //this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.helperId = item.helperId
                this.form = this.formBuilder.group({
                        helperId:item.helperId,
                        helperName: item.helperName,
                        helperIdProof: item.helperIdProof,
                        helperPhoto: item.helperPhoto,
                        phoneNo: item.phoneNo,
                        address: item.address,
                        helperDesc: item.helperDesc,
                        isActive: false
                })
               

        }
        cancel() {
                this.isAdd = true
                this.isUpdate = false
                this.form.reset()
        }

        updateHelper() {
                console.log(this.form.value)
                this.service.updateHelper(this.form.value).subscribe(
                        data => {
                                window.alert("Helper data updated successfully!!")
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
