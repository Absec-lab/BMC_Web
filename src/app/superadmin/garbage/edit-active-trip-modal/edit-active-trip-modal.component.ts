import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-active-trip-modal.component.html',
  styleUrls: ['../../../common.css']
})
export class EditActiveTripModalComponent implements OnInit {

  @Input() data: any;

  activeTripsEditForm = new FormGroup({
    vehicle_no: new FormControl('', [Validators.required]),
    dry_weight: new FormControl('', [Validators.required]),
    wet_weight: new FormControl('', [Validators.required]),
    gross_weight: new FormControl('', [Validators.required]),
    tare_weight: new FormControl('', [Validators.required]),
    trip_start_reading: new FormControl('', [Validators.required]),
    trip_start_reading_image: new FormControl(''),
    trip_end_reading: new FormControl('', [Validators.required]),
    trip_end_reading_image: new FormControl(''),
    trip_end_reading_date: new FormControl('', [Validators.required]),
  });

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.activeTripsEditForm.patchValue({
      vehicle_no: this.data.vehicle_vehicleNo,
      dry_weight: this.data.dry_weight,
      wet_weight: this.data.wet_weight,
      gross_weight: this.data.gross_weight,
      tare_weight: this.data.tare_weight,
      trip_start_reading: this.data.tripStartReading,
      trip_end_reading: "",
    });
  }
}
