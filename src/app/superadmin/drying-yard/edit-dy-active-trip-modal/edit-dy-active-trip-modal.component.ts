import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-edit-dy-active-trip-modal',
  templateUrl: './edit-dy-active-trip-modal.component.html',
  styleUrls: ['../../../common.css', './edit-dy-active-trip-modal.component.css']
})
export class EditDyActiveTripModalComponent {

  @Input() data: any;

  activeTripsEditForm = new FormGroup({
    vehicle_no: new FormControl('', [Validators.required]),
    gross_weight: new FormControl('', [Validators.required]),
    tare_weight: new FormControl('', [Validators.required]),
    total_weight: new FormControl('', [Validators.required])
  });

  constructor(public activeModal: NgbActiveModal,private service:CommonService) {}

  ngOnInit() {
    this.activeTripsEditForm.patchValue({
      vehicle_no: this.data.vehicle_vehicleNo,
      gross_weight: this.data.gross_weight,
      tare_weight: this.data.tare_weight,
      total_weight: ''
    });
  }
  updateTripData(){
    
  }

}
