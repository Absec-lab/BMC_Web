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

  form = new FormGroup({
    vehicleStatus: new FormControl(),
    comment: new FormControl(),
  });

  zoneList: any = [];

  vehicleList: VehicleManagementModel[] = [];

  status = [
    { id: 0, label: "Inactive" },
    { id: 1, label: "Active" },
  ];

  constructor(
    private service: CommonService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isAdd = true;
    this.isUpdate = false;

    forkJoin([
      this.service.getZoneAllData(),
      this.service.getVehicleListByWcId(),
    ]).subscribe({
      next: ([zoneData, vehicleListData]) => {
        this.zoneList = zoneData;
        this.vehicleList = (vehicleListData as {data: VehicleManagementModel[]; message:string; responseCode: number;}).data as VehicleManagementModel[];
      },
    });
    this.submitted = false;
  }
  
  updateVehicleStatus(data: any) {
    console.log(data);
  }
}
