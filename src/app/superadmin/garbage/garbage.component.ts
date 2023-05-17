import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['../../common.css', './garbage.component.css']
})
export class GarbageComponent implements OnInit {

  constructor(private service: CommonService, private formBuilder: FormBuilder) { }
  activeTripResponse: any
  activeTripList: any = []
  inActiveTripList: any = []
  inActiveTripResponse: any
  vehcileDataResponse: any
  tripStartButton: boolean = true
  tripEndButton: boolean = false
  grossWeightCapturedButton: boolean = false
  dryButton: boolean = true
  wetWeightCapturedButton: boolean = false
  tripResponse: any
  ngOnInit() {
    this.getActiveTrip()
    this.getCompletedTrip()
  }

  form = new FormGroup({
    vehicleNumber: new FormControl,
    driverDlNo: new FormControl,
    driverName: new FormControl,
    routeName: new FormControl,
    tripStartReading: new FormControl,
    tripEndReading: new FormControl,
    grossWeightValue: new FormControl,
    dryWeightValue: new FormControl,
    wetWeightValue: new FormControl,
    tareWeightValue: new FormControl
  });

  getActiveTrip() {
    this.service.getActiveTrip().subscribe(
      data => {
        this.activeTripResponse = data
        this.activeTripList = this.activeTripResponse.data
        // console.log(this.activeTripList)
      }
    );
  }
  getCompletedTrip() {
    this.service.getCompletedTrips().subscribe(
      data => {
        this.inActiveTripResponse = data
        this.inActiveTripList = this.inActiveTripResponse.data
      }
    );
  }

  setVehicleNumber() {
    console.log(this.form.value.vehicleNumber)
    this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
      data => {
        this.vehcileDataResponse = data
        console.log(this.vehcileDataResponse)
        this.form = this.formBuilder.group({
          vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
          driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
          driverName: this.vehcileDataResponse.data.driver.driverName,
          routeName: this.vehcileDataResponse.data.route.routeName,
          tripStartReading: null,
          tripEndReading: null,
          grossWeightValue:null,
          dryWeightValue:null,
          wetWeightValue:null,
          tareWeightValue:null
        })
      },
      error => {
      }
    );
    this.service.getTripByVehicleNumber(this.form.value.vehicleNumber).subscribe(
      data => {
        this.tripResponse = data
        console.log(this.tripResponse)
        this.form = this.formBuilder.group({
          vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
          driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
          driverName: this.vehcileDataResponse.data.driver.driverName,
          routeName: this.vehcileDataResponse.data.route.routeName,
          tripStartReading: this.tripResponse.data.tripStartReading,
          tripEndReading: this.tripResponse.data.tripEndReading,
          grossWeightValue: this.tripResponse.data.grossWt,
          dryWeightValue:this.tripResponse.data.dryWt,
          wetWeightValue:this.tripResponse.data.wetWt,
          tareWeightValue:this.tripResponse.data.tareWt
        })
        if (this.tripResponse.data.tripStatusEntity.id == 1) {
          this.tripStartButton = false
          this.tripEndButton = false
          this.dryButton = false
          this.wetWeightCapturedButton = false
          this.grossWeightCapturedButton = true
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 2){
          this.tripStartButton = false
          this.tripEndButton = false
          this.dryButton = true
          this.wetWeightCapturedButton = false
          this.grossWeightCapturedButton = false
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 3){
          this.tripStartButton = false
          this.tripEndButton = false
          this.dryButton = false
          this.wetWeightCapturedButton = true
          this.grossWeightCapturedButton = false
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 4){
          this.tripStartButton = false
          this.tripEndButton = true
          this.dryButton = false
          this.wetWeightCapturedButton = false
          this.grossWeightCapturedButton = false
        }
      },
      error=>{
        this.tripStartButton = true
          this.tripEndButton = false
          this.dryButton = false
          this.wetWeightCapturedButton = false
          this.grossWeightCapturedButton = false
      }
    );
    
   
  }

  createTrip(){
    const data={
      "driver":this.vehcileDataResponse.data.driver,
      "route": this.vehcileDataResponse.data.route,
      "tripStartReading": this.form.value.tripStartReading,
      "tripStartReadingImg": null,
      "vehicleNo": this.vehcileDataResponse.data.vehicleNo
    }
    console.log(data)
    this.service.createTrip(data).subscribe(
      data=>{
        window.alert("Trip Created Successfully")
        this.service.getActiveTrip().subscribe(
          data => {
            this.activeTripResponse = data
            this.activeTripList = this.activeTripResponse.data
            // console.log(this.activeTripList)
          }
        );
        this.service.getCompletedTrips().subscribe(
          data => {
            this.inActiveTripResponse = data
            this.inActiveTripList = this.inActiveTripResponse.data
          }
        );
      },
      error=>{
        console.log(error)
        window.alert("Something went wrong")
      }
    );
  }

  setGrossWtValue(){
    const data={
      "grossWt": this.form.value.grossWeightValue,
      "statusEntity": {
        "id": 2
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        window.alert("Gross Weight captured successfully")
      },
      error=>{
        console.log("Please provide the gross weight value")
      }
    );
    
    
  }

  setDryWtValue(){
    const data={
      "dryWt": this.form.value.dryWeightValue,
      "statusEntity": {
        "id": 3
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        window.alert("Dry Weight captured successfully")
      },
      error=>{
        console.log("Please provide the dry weight value")
      }
    );
    
    
  }
  setWetWtValue(){
    const data={
      "wetWt": this.form.value.wetWeightValue,
      "statusEntity": {
        "id": 4
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        window.alert("Wet Weight captured successfully")
      },
      error=>{
        console.log("Please provide the wet weight value")
      }
    );
    
    
  }
  endTrip(){
    const data={
      "tripEndReading": this.form.value.tripEndReading,
      "statusEntity": {
        "id": 5
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    this.service.updateTrip(data).subscribe(
      data=>{
        window.alert("Trip completed")
      },
      error=>{
        window.alert("Please provide the trip end reading value")
      }
    );
  }
}
