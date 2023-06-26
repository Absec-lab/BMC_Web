import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
        selector: 'app-route-master',
        templateUrl: './route-master.component.html',
        styleUrls: ['../../common.css', './route-master.component.css']
})
export class RouteMasterComponent implements OnInit {
        isAdd: boolean = true
        isUpdate: boolean = false
        responseData: any
        zoneId: any
        wealthCentreName: any
        zoneName: any
        wcId: any
        constructor(private service: CommonService, private formBuilder: FormBuilder, private toastService: ToastService) {
                // this.getList()
                // this.getZones()
                // this.getWCList()
        }
        ngOnInit() {
                this.service.getAllWcData().subscribe(
                        data => {
                                this.wcList = data
                        }
                );
                this.service.getAllRouteData().subscribe(
                        data => {
                                this.list = data
                        }
                );
        }

        form = new FormGroup({
                zoneId: new FormControl('', [Validators.required]),
                wcId: new FormControl('', [Validators.required]),
                routeName: new FormControl('', [Validators.required]),
                routeDesc: new FormControl,
                zone: new FormControl,
                wc: new FormControl,
                routeId: new FormControl
        });
        editForm = new FormGroup({
                zone: new FormControl(''),
                wc: new FormControl(''),
                routeName: new FormControl(''),
                routeDesc: new FormControl('')
        });
        list: any = []
        zoneList: any = []
        wcList: any = []

        // async getZones() {
        //         try {
        //                 this.zoneList = await this.service.get(`/zone/getAllZone`)
        //                 this.zoneList = this.zoneList.sort((a: any, b: any) => a.zoneName - b.zoneName)
        //         } catch (e) {
        //                 console.error(e)
        //         }
        // }
        async getWCList() {
                try {
                        this.wcList = await this.service.getAllWcData()
                        this.wcList = this.wcList.sort((a: any, b: any) => a.wcName - b.wcName)
                } catch (e) {
                        console.error(e)
                }
        }
        async getList() {
                try {
                        this.list = await this.service.get(`/zone/getAllRoute`)
                        this.list = this.list.sort((a: any, b: any) => a.routeName - b.routeName)
                } catch (e) {
                        console.error(e)
                }
        }
        async addNew() {
                if (this.form.status === 'INVALID') {
                        const wealthCenter = this.form.value.wcId?.trim();
                        if (!wealthCenter) {
                                this.toastService.showWarning('Wealth center is required.');
                                return;
                        }
                        const zone = this.form.value.zoneId?.trim();
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const routeName = this.form.value.routeName?.trim();
                        if (!routeName) {
                                this.toastService.showWarning('Route name is required.');
                                return;
                        }
                        return;
                }
                try {
                        const zone = this.responseData.zone
                        const wc = this.wcList[this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)]
                        const data = {
                                "routeDesc": this.form.value.routeDesc,
                                "routeName": this.form.value.routeName,
                                "zone": zone,
                                "wc": wc
                        }
                        await this.service.post(`/zone/addRoute`, data)
                        this.form.reset()
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }
        async remove(id: string) {
                try {
                        const res = await this.service.delete(`/zone/deleteRoute/${id}`)
                        this.getList()
                } catch (e) {
                        console.error(e)
                }
        }

        deactivateRoute(id: any) {
                this.service.deactivateRoute(id).subscribe(
                        data => {
                                window.alert("Route deleted successfully")
                                this.service.getAllRouteData().subscribe(
                                        data => {
                                                this.list = data
                                        }
                                );
                        },
                        error => {
                                window.alert("Something went wrong!!")
                        }
                );
        }
        getWcById() {
                console.log(this.form.value.wcId)
                this.service.getWcById(this.form.value.wcId).subscribe(
                        data => {
                                this.responseData = data
                                this.form.value.zoneId = this.responseData.zone.zoneId
                                this.zoneName = this.responseData.zone.zoneName
                                console.log(this.zoneName)
                        }
                );
        }
        updateData(item: any) {
                this.isUpdate = true
                this.isAdd = false
                console.log(item)
                this.zoneName = item.zone.zoneName
                this.wealthCentreName = item.wc.wcName
                // this.zoneId = item.zoneId
                this.form.patchValue({
                        zoneId: item.zone.zoneId,
                        wcId: item.wc.wcId,
                        routeName: item.routeName,
                        routeDesc: item.routeDesc,
                        zone: item.zone,
                        wc: item.wc,
                        routeId: item.routeId
                })

                this.wcId = item.wcId
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

        updateRoute() {
                if (this.form.status === 'INVALID') {
                        const wealthCenter = this.form.value.wcId;
                        if (!wealthCenter) {
                                this.toastService.showWarning('Wealth center is required.');
                                return;
                        }
                        const zone = this.form.value.zoneId;
                        if (!zone) {
                                this.toastService.showWarning('Zone is required.');
                                return;
                        }
                        const routeName = this.form.value.routeName?.trim();
                        if (!routeName) {
                                this.toastService.showWarning('Route name is required.');
                                return;
                        }
                        return;
                }
                this.service.updateRoute(this.form.value).subscribe(
                        data => {
                                this.toastService.showSuccess("Route data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        },
                        error => {
                                this.toastService.showError("Route data updated successfully!!")
                                this.isAdd = true
                                this.isUpdate = false
                                this.getList()
                                this.form.reset()
                        }
                );

        }
}
