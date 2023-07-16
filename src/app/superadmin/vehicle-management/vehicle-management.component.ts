import { withNoXsrfProtection } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DeactivationDto } from 'src/app/service/common.service';

@Component({
        selector: 'app-vehicle-management',
        templateUrl: './vehicle-management.component.html',
        styleUrls: ['../../common.css', './vehicle-management.component.css']
})
export class VehicleManagementComponent implements OnInit {
        
        [x: string]: any;
        isAdd: boolean = false
        isUpdate: boolean = false
        zoneResponseById: any
        deactivationDto: DeactivationDto = new DeactivationDto
        studentName:any
        studentEmail:any
        submitted = false;  
  
        id:any
        studentBranch:any
        constructor(private service: CommonService, private route: Router, private formBuilder: FormBuilder) {
        }
        zoneList: any = []
        ngOnInit() {
                this.isAdd = true
                this.isUpdate = false
                this.service.getZoneAllData().subscribe(
                        data => {
                                this.zoneList = data
                        }
                );
                this.submitted=false;  
        }

        form = new FormGroup({
                vehicleStatus:new FormControl,
                comment: new FormControl
        });

        


        tabledata = [
                {"sl":1,
                "zonename": 'south west zone',
                "wcname":'pokhoriput',
                "vehicleno":'VEH0001',
                "routename":'Route 1',
                "rc": 'OD 33AC7021',
                "vehiclestatus":'Active',
                "comment":'',

                },
                {"sl":2,
                "zonename": 'easr west zone',
                "wcname":'pokhoriput',
                "vehicleno":'VEH0001',
                "routename":'Route 2',
                "rc": 'OD 33AC8021',
                "vehiclestatus":'Inactive',
                "comment":'',
                
                }
        ]

        status = [ "Active","Inactive"
        ]
        updateVehicleStatus(data:any){
           console.log(data)
        }
        
}
