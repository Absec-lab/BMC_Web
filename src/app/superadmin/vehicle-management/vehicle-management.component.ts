import { CommonService, DeactivationDto } from "src/app/service/common.service";

import { withNoXsrfProtection } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { VehicleManagementModel } from "src/app/model/vehicle-management.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-vehicle-management",
  templateUrl: "./vehicle-management.component.html",
  styleUrls: ["../../common.css", "./vehicle-management.component.css"],
})
export class VehicleManagementComponent implements OnInit {
  [x: string]: any;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  zoneResponseById: any;
  deactivationDto: DeactivationDto = new DeactivationDto();
  studentName: any;
  studentEmail: any;
  submitted = false;
  id: any;
  studentBranch: any;

  // form = new FormGroup({
  //   vehicleStatus: new FormControl(),
  //   comment: new FormControl(),
  // });

  zoneList: any = [];

  vehicleList: VehicleManagementModel[] = [];

  vehicleStatus: boolean = false;

  vehicleStatusArr = [{id:0, status:'Active'}, {id:1, status:'Under Maintenance'}];

  constructor(
    private service: CommonService,
    private route: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  vehicleMaintenanceData(){
    forkJoin([
      this.service.getZoneAllData(),
      this.service.getVehicleMainTenanceListByWcId(),
    ]).subscribe({
      next: ([zoneData, vehicleListData]) => {
        this.zoneList = zoneData;
        this.vehicleList = (
          vehicleListData as {
            data: VehicleManagementModel[];
            message: string;
            responseCode: number;
          }
        ).data as VehicleManagementModel[];
      },
    });
    this.submitted = false;
  }

  ngOnInit() {
    this.isAdd = true;
    this.isUpdate = false;
    this.vehicleMaintenanceData();
  }

  onStatusChange(ev: any) {
      this.vehicleStatus = ev.target.value;
  }

  onSubmitUpdateStatus(vehicle:any , i:number) {
   let payload = {
      "activateBy": "",
      "createdBy": "",
      "createdDate": "",
      "id": 0,
      "inactivateBy": "",
      "maintenanceImage1": "",
      "maintenanceImage2": "",
      "maintenanceImage3": "",
      "underMaintenance": false,
      "underMaintenanceDate": "",
      "underMaintenanceReason": "",
      "updatedBy": "",
      "updatedDate": "",
      "vehicleActivateDate": "",
      "vehicleActivateImage": "",
      "vehicleActivateReason": "",
      "vehicleNo": "",
      "wc": {
        "wcId": 0
      },
      "zone": {
        "zoneId": 0
      }
    }
    console.log('Vahicle :  ',vehicle);
    console.log('Index :  ',i);
    var uId : any = localStorage.getItem('userUniqueUserId');
    payload.wc.wcId = vehicle.wc.wcId
    payload.zone.zoneId = vehicle.zone.zoneId
    payload.vehicleNo = vehicle.vehicleNo
    var commentId = "comment"+vehicle.vehicleNo;
    if(this.vehicleStatus){  //
      payload.underMaintenance = true
      payload.underMaintenanceReason = vehicle.undermaintenanceReason
      payload.inactivateBy = uId
    }else {
      payload.underMaintenance = false
      payload.vehicleActivateReason = vehicle.undermaintenanceReason
      payload.vehicleNo = vehicle.vehicleNo
      payload.activateBy = uId
    }

    this.updateVehicleStatus(payload);
  }

  updateVehicleStatus(data: any) {
    console.log('  Update status :::   {} ' , data);
    this.service.updateVehicleMantenanceStatus(data)
          .subscribe({
            next:(response : any)=>{
              console.log('Logged success  ',response);
              this.toastr.success(' Data updataed successfully')
              this.vehicleMaintenanceData();
            },
            error(err:any){
              console.error('Logged error  ',err);
            }
    })
  }


}
