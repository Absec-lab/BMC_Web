import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['../../common.css','./vehicle-master.component.css']
})
export class VehicleMasterComponent implements OnInit{
        isAdd: boolean = true
        isUpdate: boolean = false
        responseData:any
        zoneId:any
        wealthCentreName:any
        zoneName:any
        wcId:any
        vehicleResponse:any
        driverList:any=[]
        helperList:any=[]
        constructor(private service: CommonService, private formBuilder :FormBuilder, private toastService: ToastService) {
                // this.getList()
                this.getZones()
                // this.getWCList()
                // this.getRouteList()
        }
        ngOnInit(){
                this.service.getAllDriverList().subscribe(
                        data=>{
                              this.driverList=data
                              console.log(this.driverList)
                        }
                      );
                this.service.getAllHelperByWcId().subscribe( // need to add helper list
                data=>{
                        this.responseData=data
                        this.helperList=this.responseData.data
                        console.log(this.helperList)
                }
                );
                this.service.getAllWcData().subscribe(
                        data=>{
                                this.wcList=data
                        }
                );
                this.service.getAllRouteData().subscribe(
                        data=>{
                                this.routeList=data
                        }
                );
                this.service.getAllDriverList().subscribe(
                        data=>{
                                this.driverList=data
                        }
                );
                this.service.getVehicleListByWcId().subscribe(
                        data=>{
                                this.responseData=data
                                this.list=this.responseData.data
                               
                        }
                );
        }

        form = new FormGroup({
                vehicleNo: new FormControl('', [Validators.required]),
                driverId: new FormControl('', [Validators.required]),
                helperId: new FormControl('', [Validators.required]),
                helperId2: new FormControl('', [Validators.required]),
                vehicleType: new FormControl('', [Validators.required]),
                helperIDProof: new FormControl(''),
                rcNo: new FormControl('', [Validators.required]),
                rcPhoto: new FormControl('', [Validators.required]),
                vehicleImage: new FormControl('', [Validators.required]),
                insurance: new FormControl('', [Validators.required]),
                vehiclePassingWt: new FormControl('', [Validators.required]),
                vehicleWt: new FormControl('', [Validators.required]),
                vehicleDesc: new FormControl(''),
                zoneId: new FormControl('', [Validators.required]),
                routeId: new FormControl('', [Validators.required]),
                wcId: new FormControl('', [Validators.required])
              });
        list: any = []
        zoneList: any = []
        wcList: any = []
        routeList: any = []

        async getZones() {
                try {
                        this.zoneList = await this.service.get(`/zone/getAllZone`)
                        this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getWCList() {
                try {
                        this.wcList = await this.service.get(`/zone/getAllWc`)
                        this.wcList = this.wcList.sort((a: any, b: any) => a.wcName - b.wcName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getRouteList() {
                try {
                        this.routeList = await this.service.get(`/zone/getAllRoute`)
                        this.routeList = this.routeList.sort((a: any, b: any) => a.routeName - b.routeName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/getAll/vehicle/`+localStorage.getItem('wcId'))
                        this.list = this.list.data
                        this.list = this.list.sort((a: any, b: any) => a.vehicleNo - b.vehicleNo)
                } catch (e) {
                        console.error(e)
                }
        }

        rcPhoto: any = null;
        vehiclePhoto: any = null;

        handleFileSelectRcPhoto(event: any): void {
                const selectedFiles: any = event.target.files[0];
                this.rcPhoto = selectedFiles;
        }

        handleFileSelectVehiclePhoto(event: any): void {
                const selectedFiles: any = event.target.files[0];
                this.vehiclePhoto = selectedFiles;
        }

        async addNew() {
                if (this.form.status === 'INVALID') {
                        const vehicleNo = this.form.value.vehicleNo?.trim();
                        if (!vehicleNo) {
                                this.toastService.showWarning('Vehicle number is required.');
                                return;
                        }
                        const zoneId = this.form.value.zoneId?.trim();
                        if (!zoneId) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const wcId = this.form.value.wcId?.trim();
                        if (!wcId) {
                                this.toastService.showWarning('Wealth center is required.');
                                return;
                        }
                        const routeId = this.form.value.routeId?.trim();
                        if (!routeId) {
                                this.toastService.showWarning('Route is required.');
                                return;
                        }
                        const driverId = this.form.value.driverId?.trim();
                        if (!driverId) {
                                this.toastService.showWarning('Driver is required.');
                                return;
                        }
                        const vehicleType = this.form.value.vehicleType?.trim();
                        if (!vehicleType) {
                                this.toastService.showWarning('vehicleType is required.');
                                return;
                        }
                        const rcNumber = this.form.value.rcNo?.trim();
                        if (!rcNumber) {
                                this.toastService.showWarning('RC number is required.');
                                return;
                        }
                        if (!this.rcPhoto) {
                                this.toastService.showWarning('RC photo is required.');
                                return;
                        }
                        if (!this.vehiclePhoto) {
                                this.toastService.showWarning('Vehicle photo is required.');
                                return;
                        }
                        const insurance = this.form.value.insurance?.trim();
                        if (!insurance) {
                                this.toastService.showWarning('Insurance is required.');
                                return;
                        }
                        const vehiclePassingWeight = this.form.value.vehiclePassingWt?.toString().trim();
                        if (!vehiclePassingWeight) {
                                this.toastService.showWarning('Vehicle passing weight is required.');
                                return;
                        }
                        const helperId = this.form.value.helperId?.trim();
                        if (!helperId) {
                                this.toastService.showWarning('Helper is required.');
                                return;
                        }
                        const helperId2 = this.form.value.helperId2?.trim();
                        if (!helperId2) {
                                this.toastService.showWarning('Helper2 is required.');
                                return;
                        }
                        const vehicleWeight = this.form.value.vehicleWt?.trim();
                        if (!vehicleWeight) {
                                this.toastService.showWarning('Vehicle weight is required.');
                                return;
                        }
                        return;
                }
                try {
                        const data = {
                                vehicleNo: this.form.value.vehicleNo,
                                rcNo: this.form.value.rcNo,
                                rcPhoto: this.form.value.rcPhoto,
                                vehicleImage: this.form.value.vehicleImage,
                                insurance: this.form.value.insurance,
                                vehiclePassingWt: this.form.value.vehiclePassingWt,
                                vehicleWt: this.form.value.vehicleWt,
                                vehicleType: this.form.value.vehicleWt,
                                vehicleDesc: this.form.value.vehicleDesc,
                                zone: {
                                        zoneId: this.form.value.zoneId
                                },
                                wc: {
                                        wcId: this.form.value.wcId
                                },
                                route: {
                                        routeId: this.form.value.routeId
                                },
                                driver: {
                                        driverId: this.form.value.driverId
                                },
                                helper: {
                                        helperId: this.form.value.helperId
                                },
                                helper2: {
                                        helperId: this.form.value.helperId
                                }
                        }
                        console.log(data)
                        await this.service.post(`/vehicle/add`, data)
                        this.service.getVehicleListByWcId().subscribe(
                                data=>{
                                        this.responseData=data
                                        this.list=this.responseData.data
                                       
                                },
                                error=>{
                                        this.responseData=error
                                        this.toastService.showError(this.responseData.error.message)
                                }
                        );
                         window.alert("Vehicle Added successfully")
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
                        const res = await this.service.delete(`/vehicle/delete/${id}`)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.zoneName=item.zone.zoneName
                this.wealthCentreName=item.wc.wcName
                // this.zoneId = item.zoneId
                // this.form = this.formBuilder.group({
                //         vehicleNo: item.vehicleNo,
                //         driverId: item.vehicleNo,
                //         rcNo: item.vehicleNo,
                //         rcPhoto: item.vehicleNo,
                //         vehicleImage: item.vehicleNo,
                //         insurance: item.vehicleNo,
                //         vehiclePassingWt: item.vehicleNo,
                //         vehicleWt: item.vehicleNo,
                //         vehicleDesc: item.vehicleNo,
                //         zone:item.zone,                        
                //         routeId:item.routeId, 
                //         wc:item.wc                           
                // })
                
                this.wcId=item.wcId
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

        updateVehicle() {
                if (this.form.status === 'INVALID') {
                        const vehicleNo = this.form.value.vehicleNo?.trim();
                        if (!vehicleNo) {
                                this.toastService.showWarning('Vehicle number is required.');
                                return;
                        }
                        const zoneId = this.form.value.zoneId?.trim();
                        if (!zoneId) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const wcId = this.form.value.wcId?.trim();
                        if (!wcId) {
                                this.toastService.showWarning('Wealth center is required.');
                                return;
                        }
                        const routeId = this.form.value.routeId?.trim();
                        if (!routeId) {
                                this.toastService.showWarning('Route is required.');
                                return;
                        }
                        const driverId = this.form.value.driverId?.trim();
                        if (!driverId) {
                                this.toastService.showWarning('Driver is required.');
                                return;
                        }
                        const vehicleType = this.form.value.vehicleType?.trim();
                        if (!vehicleType) {
                                this.toastService.showWarning('vehicleType is required.');
                                return;
                        }
                        const rcNumber = this.form.value.rcNo?.trim();
                        if (!rcNumber) {
                                this.toastService.showWarning('RC number is required.');
                                return;
                        }
                        if (!this.rcPhoto) {
                                this.toastService.showWarning('RC photo is required.');
                                return;
                        }
                        if (!this.vehiclePhoto) {
                                this.toastService.showWarning('Vehicle photo is required.');
                                return;
                        }
                        const insurance = this.form.value.insurance?.trim();
                        if (!insurance) {
                                this.toastService.showWarning('Insurance is required.');
                                return;
                        }
                        const vehiclePassingWeight = this.form.value.vehiclePassingWt?.toString().trim();
                        if (!vehiclePassingWeight) {
                                this.toastService.showWarning('Vehicle passing weight is required.');
                                return;
                        }
                        const helperId = this.form.value.helperId?.trim();
                        if (!helperId) {
                                this.toastService.showWarning('Helper is required.');
                                return;
                        }
                        const helperId2 = this.form.value.helperId?.trim();
                        if (!helperId) {
                                this.toastService.showWarning('Helper2 is required.');
                                return;
                        }
                        const vehicleWeight = this.form.value.vehicleWt?.trim();
                        if (!vehicleWeight) {
                                this.toastService.showWarning('Vehicle weight is required.');
                                return;
                        }
                        return;
                }
                this.service.updateVehicle(this.form.value).subscribe(
                        data => {
                                this.toastService.showSuccess("Vehicle data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        },
                        error => {
                                this.toastService.showError("Vehicle data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        }
                );

        }
        deactivateVehicle(id: any) {
                this.service.deactivateVehicle(id).subscribe(
                        data => {
                                window.alert("Vehicle deleted successfully")
                                this.service.getVehicleListByWcId().subscribe(
                                        data=>{
                                                this.responseData=data
                                                this.list=this.responseData.data
                                               
                                        }
                                );
                        },
                        error => {
                                window.alert("Something went wrong!!")
                        }
                );
        }

        getAllDrivers(){
                this.service.getAllDriverList().subscribe(
                  data=>{
                        this.driverList=data
                  }
                );
        }
        getAllHelpers(){
                this.service.getAllHelper().subscribe( 
                  data=>{
                        this.helperList=data
                  }
                );
        }
}
