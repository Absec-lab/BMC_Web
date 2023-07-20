import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-edit-dy-active-trip-modal',
  templateUrl: './edit-dy-active-trip-modal.component.html',
  styleUrls: ['../../../common.css', './edit-dy-active-trip-modal.component.css']
})
export class EditDyActiveTripModalComponent {

  @Input() data: any;
  vehicleresponse:any
  activeTripsEditForm = new FormGroup({
    vehicle_no: new FormControl('', [Validators.required]),
    gross_weight: new FormControl,
    tare_weight: new FormControl,
    total_weight: new FormControl
    });

  constructor(public activeModal: NgbActiveModal,private service:CommonService, private toastService:ToastService) {}

  ngOnInit() {
    this.activeTripsEditForm.patchValue({
      vehicle_no: this.data.vehicle_vehicleNo,
      gross_weight: this.data.gross_weight,
      tare_weight: this.data.tare_weight,
      total_weight: ''
    });
    this.service.getVehicleByVehicleNumber(this.activeTripsEditForm.value.vehicle_no).subscribe(
      data=>{
        this.vehicleresponse=data
        console.log(this.vehicleresponse,"vehicleResponse")
        this.activeTripsEditForm.controls.tare_weight.setValue(this.vehicleresponse.data.vehicleWt)
      }
    );
  }
  updateTripData(){
    const data={
      "vehicleNumber":this.activeTripsEditForm.value.vehicle_no,
      "tarewt":this.activeTripsEditForm.value.tare_weight,
      "grosswt":this.activeTripsEditForm.value.gross_weight,
      "totalwt":this.activeTripsEditForm.value.total_weight
    }
    this.service.upateCompostDataInDryingYard(data).subscribe(
      data=>{
        this.toastService.showSuccess("Data updated sucessfully.")
        location.reload()
      }
    );
    
  }
  totalWeightCal(){
    const temp=this.activeTripsEditForm.value.gross_weight;
    const temp1=this.activeTripsEditForm.value.tare_weight;
    this.activeTripsEditForm.controls.total_weight.setValue(temp-temp1);
  }
}
