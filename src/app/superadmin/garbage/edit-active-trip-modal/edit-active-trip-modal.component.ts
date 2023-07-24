import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-active-trip-modal.component.html',
  styleUrls: ['../../../common.css']
})
export class EditActiveTripModalComponent implements OnInit {
  ttsUserList:any=[]
  loginResponse:any
  @Input() data: any;
   responseData:any
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
    tripId: new FormControl(),
    move_tts: new FormControl,
    tts_user_id: new FormControl
  });

  constructor(public activeModal: NgbActiveModal,private service:CommonService,private toastService:ToastService) {}

  ngOnInit() {
    this.activeTripsEditForm.patchValue({
      vehicle_no: this.data.vehicle_vehicleNo,
      dry_weight: this.data.dry_weight,
      wet_weight: this.data.wet_weight,
      gross_weight: this.data.gross_weight,
      tare_weight: this.data.tare_weight,
      trip_start_reading: this.data.tripStartReading,
      trip_end_reading: "",
      tripId:this.data.tripId
    });
    this.service.getAllTts().subscribe(
      data=>{
        this.loginResponse=data
        this.ttsUserList=this.loginResponse.data
      }
    );
  }
  updateTripData(){
    const data={
      
        "dryWt": this.activeTripsEditForm.value.dry_weight,
        "grossWt": this.activeTripsEditForm.value.gross_weight,
        "tareWt": this.activeTripsEditForm.value.tare_weight,
        "tripStartReading": this.activeTripsEditForm.value.trip_start_reading,
        "tripTransactionId": this.activeTripsEditForm.value.tripId,
        "vehicleNo": this.activeTripsEditForm.value.vehicle_no,
        "wetWt": this.activeTripsEditForm.value.wet_weight,
        "moveToTts": "Yes",
        "ttsUserId": this.activeTripsEditForm.value.tts_user_id
      
    }
    // console.log(data)
    this.service.updateTripForceFully(data).subscribe(
      data=>{
        window.alert("Trip data updated successfully!!")
        this.activeModal.close()
        location.reload()
        
      },
      error=>{
        this.responseData=error
        this.toastService.showError(this.responseData.error.message)
      }
    );
  }
  moveToTTs(){
    console.log(this.activeTripsEditForm.value.move_tts)
  }
}
