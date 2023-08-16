import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-tts-master',
  templateUrl: './tts-master.component.html',
  styleUrls: ['../../common.css', './tts-master.component.css']
})
export class TtsMasterComponent implements OnInit{
        isAdd: boolean = false
        isUpdate: boolean = false
        responseData: any;
    
        
        constructor(private service: CommonService, private formBuilder:FormBuilder, private toastService: ToastService) {
                this.getList()
        }
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getTtsAllData().subscribe(
                        data => {
                                this.list = data
                        }
                );
        }
        form = new FormGroup({
                ttsId: new FormControl,
                ttsName: new FormControl('', [Validators.required]),
                description: new FormControl
              });

        editFormData = new FormGroup({
          ttsId: new FormControl,
          ttsName: new FormControl('', [Validators.required]),
          description: new FormControl
        })
        list: any = []
       
        async getList() {
                try {
                        this.list = await this.service.get(`/getAllTts`)
                        this.list = this.list.sort((a: any, b: any) => a.ttsName - b.ttsName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                if (this.form.status === 'INVALID') {
                  const ttsName = this.form.value.ttsName?.trim(); 
                        if (!ttsName) {
                                this.toastService.showWarning('Tts name is required.');
                                return;
                        }
                        
                }
               
                const data={
                        "ttsName":this.form.value.ttsName,
                        "description":this.form.value.description,
                       
                }
                try {
                        await this.service.post(`/addTts`, data)
                        this.service.getTtsAllData().subscribe(
                          data => {
                                  this.list = data
                          },
                                error=>{
                                        this.responseData=error
                                        this.toastService.showError(this.responseData.error.message)
                                }
                        );
                        window.alert("Tts Added Successfully!!")
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        this.responseData=e
                        this.toastService.showError(this.responseData.error.message)
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
        deactivateGoods(id:any){
                this.service.deactivateGoods(id).subscribe(
                        data=>{
                                window.alert("Goods deleted successfully")
                                this.service.getTtsAllData().subscribe(
                                  data => {
                                          this.list = data
                                  },
                                );
                        },
                        error=>{
                                window.alert("Something went wrong!!")
                        }
                );
        }
                updateData(item: any) {
                        this.isUpdate = true
                        this.isAdd = false
                        console.log(item)

                this.form.patchValue({
                        ttsId: item.ttsId,
                        ttsName: item.ttsName,
                        // goodsPerKg: item.goodsPerKg,
                        description: item.description
                        })
                
                }
                cancel() {
                        this.isAdd = true
                        this.isUpdate = false
                }

        updateTts(){
                if (this.form.status === 'INVALID') {
                    
                        const ttsName = this.form.value.ttsName?.trim();
                        if (!ttsName) {
                                this.toastService.showWarning('tts name is required.');
                                return;
                        }
                       
                        return;
                }
                const data={
                        
                                "ttsId": this.form.value.ttsId,
                                
                                "ttsName": this.form.value.ttsName,
                                "description": this.form.value.description
                            
                }
                this.service.updateGoods(data).subscribe(
                        data=>{
                                this.toastService.showSuccess("Goods data updated successfully!!")
                                this.isAdd=true
                                this.isUpdate=false
                                this.service.getTtsAllData().subscribe(
                                  data => {
                                          this.list = data
                                  }
                                );
                                this.form.reset();
                                this.getList()
                        },
                        error=>{
                                this.toastService.showError("something went wrong")
                        }
                );

        }
}
