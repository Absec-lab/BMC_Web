import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule, Validators} from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';
import { ActiveTripActionRendererComponent } from './active-trip-action-renderer/active-trip-action-renderer.component';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['../../common.css', './garbage.component.css']
})
export class GarbageComponent implements OnInit {

  wcId : any = 0;

  constructor(private service: CommonService, private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.getRouteList()
   }
   isAdd: boolean = true
   isUpdate: boolean = false
   vehicleNo:any
   searchText: any;
  activeTripResponse: any
  activeTripList: any = []
  inActiveTripList: any = []
  inActiveTripResponse: any
  vehcileDataResponse: any
  tripStartButton: boolean = false
  tripEndButton: boolean = false
  grossWeightCapturedButton: boolean = false
  dryButton: boolean = false
  wetWeightCapturedButton: boolean = false
  tripResponse: any
  errorResponse:any
  helperList:any=[]
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
    tareWeightValue: new FormControl,
    unloadwetWeightValue: new FormControl,
    routeId: new FormControl,
    helperId:new FormControl
  });
  ngOnInit() {
    this.setVehicleNumber()
    this.service.getAllHelper().subscribe(
      data=>{
         this.helperList=data
      }
    );
    this.service.getActiveTrip().subscribe(
      data => {
        this.activeTripResponse = data
        this.activeTripList = this.activeTripResponse.data
        const rowData =   this.activeTripList.map((item: any) => {
         
          return {
            tripId:item.tripTrnsId,
            vehicle_vehicleNo: item.vehicleNo,
            driver_driverName: item.driver.driverName,
            helper_name: item.helper.helperName,
            route_routeName: item.route.routeName,
            tripStartReading: item.tripStartReading,
            vehicle_starttime: item.createdDate,
            trip_start_reading_image: item.tripStartReadingImg,
            driver: item.driver,
            dry_weight: item.dryWt,
            gross_weight: item.grossWt,
            tare_weight: item.tareWt,
            wet_weight: item.wetWt
          };
        });
      //  console.log("ActiveList",this.activeTripList)
      //  console.log("rowData",rowData)
       this.rowData=rowData;
      }
    );
    this.service.getCompletedTrips().subscribe(
      data => {
        this.inActiveTripResponse = data
        this.inActiveTripList = this.inActiveTripResponse.data
        const rowDataComp =   this.inActiveTripList.map((item: any) => {
         
          return {
            vehicle_vehicleNo: item.vehicleNo,
            driver_driverName: item.driver.driverName,
            helper_name: item.helper.helperName,
            route_routeName: item.route.routeName,
            tripStartReading: item.tripStartReading,
            tripEndReading:item.tripEndReading,
            vehicle_starttime: item.createdDate,
            updatedDate:item.updatedDate,
            grossWt: item.grossWt,
            wetWt: item.wetWt,
            dryWt: item.dryWt,
            trip_start_reading_image: item.tripStartReadingImg,
            trip_end_reading_image: (item.tripEndReadingImg) ? item.tripEndReadingImg : null
          };
        });
      //  console.log("InActiveList",this.inActiveTripList)
      //  console.log("rowData",rowDataComp)
       this.rowDataComp=rowDataComp;
        
      }
    );
    // this.setVehicleNumber();
    
    
  }
  routeList: any = []
 

  getActiveTrip() {
    this.service.getActiveTrip().subscribe(
      data => {
        this.activeTripResponse = data
        this.activeTripList = this.activeTripResponse.data
        //  console.log("ActiveList",this.activeTripList)
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

 async setVehicleNumber() {
    console.log(this.form.value.vehicleNumber)
    this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
      data => {
        this.vehcileDataResponse = data
        console.log("vehcileDataResponse",this.vehcileDataResponse)
        this.form.patchValue({
          vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
          driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
          driverName: this.vehcileDataResponse.data.driver.driverName,
          routeName: this.vehcileDataResponse.data.route.routeName,
          tripStartReading: this.vehcileDataResponse.data.tripStartReading,
          tripEndReading:  this.vehcileDataResponse.data.tripEndReading,
          grossWeightValue:this.vehcileDataResponse.data.grossWt,
          dryWeightValue:this.vehcileDataResponse.data.dryWt,
          wetWeightValue:this.vehcileDataResponse.data.wetWt,
          tareWeightValue:this.vehcileDataResponse.data.tareWt,
          routeId: this.vehcileDataResponse.data.route.routeId,
          unloadwetWeightValue: (this.vehcileDataResponse.data.grossWt && this.vehcileDataResponse.data.wetWt) ? this.vehcileDataResponse.data.grossWt - this.vehcileDataResponse.data.wetWt : ""
        })
      },
      error => {
      }
    );
    this.service.getTripByVehicleNumber(this.form.value.vehicleNumber).subscribe(
      data => {
        this.tripResponse = data
        console.log(this.tripResponse)
        this.form.patchValue({
          vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
          driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
          driverName: this.vehcileDataResponse.data.driver.driverName,
          routeName: this.vehcileDataResponse.data.route.routeName,
          tripStartReading: this.tripResponse.data.tripStartReading,
          tripEndReading: this.tripResponse.data.tripEndReading,
          grossWeightValue: this.tripResponse.data.grossWt,
          dryWeightValue:this.tripResponse.data.dryWt,
          wetWeightValue:this.tripResponse.data.wetWt,
          tareWeightValue:this.tripResponse.data.tareWt,
          routeId: this.vehcileDataResponse.data.route.routeId,
          helperId:this.tripResponse.data.helper.helperId,
          unloadwetWeightValue: (this.tripResponse.data.grossWt && this.tripResponse.data.wetWt) ? this.tripResponse.data.grossWt - this.tripResponse.data.wetWt : ""
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
          this.dryButton = false
          this.wetWeightCapturedButton = true
          this.grossWeightCapturedButton = false
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 3){
          this.tripStartButton = false
          this.tripEndButton = false
          this.dryButton = true
          this.wetWeightCapturedButton = false
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

  isURL(str: string) {
    const urlRegex = /^(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(str);
  }

  tripStartReadingImgFile: any = null;

  onTripStartFileSelected(event: any): void {
      const file: File = event.target.files[0];
      this.tripStartReadingImgFile = file;
  }

  createTrip(){

    if (!this.tripStartReadingImgFile) {
      alert("Please select an image for trip start reading.");
      return;
    }

    const formData = new FormData();
    formData.set("file", this.tripStartReadingImgFile);

    this.service.uploadFile(formData)
      .subscribe(
        (response: any) => {
          const fileUrl: string = response.data;

          if (!this.isURL(fileUrl)) {
            alert("Invalid file link detected.");
            return;
          }

          const fileUrlItems: any = fileUrl.split("/");
          const fileName = fileUrlItems[fileUrlItems.length - 1];
          this.wcId = localStorage.getItem('wcId');
          const data={
            "driver":this.vehcileDataResponse.data.driver,
            "route": this.vehcileDataResponse.data.route,
            "tripStartReading": this.form.value.tripStartReading,
            "tripStartReadingImg": fileUrl,
            "vehicleNo": this.vehcileDataResponse.data.vehicleNo,
            "helper": {
              "helperId":this.form.value.helperId
            },
            "wc":{
              "wcId":parseInt(this.wcId)
            }
          }
          console.log(data)
          this.service.createTrip(data).subscribe(
            data=>{
              window.alert("Trip Created Successfully")
              // this.setVehicleNumber();
              this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
                data => {
                  this.vehcileDataResponse = data
                  console.log("vehcileDataResponse",this.vehcileDataResponse)
                  this.form.patchValue({
                    vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
                    driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
                    driverName: this.vehcileDataResponse.data.driver.driverName,
                    routeName: this.vehcileDataResponse.data.route.routeName,
                    tripStartReading: this.vehcileDataResponse.data.tripStartReading,
                    tripEndReading:  this.vehcileDataResponse.data.tripEndReading,
                    grossWeightValue:this.vehcileDataResponse.data.grossWt,
                    dryWeightValue:this.vehcileDataResponse.data.dryWt,
                    wetWeightValue:this.vehcileDataResponse.data.wetWt,
                    tareWeightValue:this.vehcileDataResponse.data.tareWt,
                    routeId: this.vehcileDataResponse.data.route.routeId,
                    helperId: this.vehcileDataResponse.data.helper.helperId
                  })
                  this.service.getActiveTrip().subscribe(
                    data => {
                      this.activeTripResponse = data
                      this.activeTripList = this.activeTripResponse.data
                      const rowData =   this.activeTripList.map((item: any) => {
                       
                        return {
                          vehicle_vehicleNo: item.vehicleNo,
                          driver_driverName: item.driver.driverName,
                          helper_name: item.helper.helperName,
                          route_routeName: item.route.routeName,
                          tripStartReading: item.tripStartReading,
                          vehicle_starttime: item.createdDate,
                          trip_start_reading_image: item.tripStartReadingImg
                        };
                      });
                    //  console.log("ActiveList",this.activeTripList)
                    //  console.log("rowData",rowData)
                     this.rowData=rowData;
                    }
                  );
                  this.service.getCompletedTrips().subscribe(
                    data => {
                      this.inActiveTripResponse = data
                      this.inActiveTripList = this.inActiveTripResponse.data
                      const rowDataComp =   this.inActiveTripList.map((item: any) => {
                       
                        return {
                          vehicle_vehicleNo: item.vehicleNo,
                          driver_driverName: item.driver.driverName,
                          helper_name: item.helper.helperName,
                          route_routeName: item.route.routeName,
                          tripStartReading: item.tripStartReading,
                          tripEndReading:item.tripEndReading,
                          vehicle_starttime: item.createdDate,
                          vehicle_endtime:item.updateDate,
                          trip_start_reading_image: item.tripStartReadingImg,
                          trip_end_reading_image: (item.tripEndReadingImg) ? item.tripEndReadingImg : null
                        };
                      });
                    //  console.log("InActiveList",this.inActiveTripList)
                    //  console.log("rowData",rowDataComp)
                     this.rowDataComp=rowDataComp;
                      
                    }
                  );
                },
                error => {
                }
              );
              this.service.getTripByVehicleNumber(this.form.value.vehicleNumber).subscribe(
                data => {
                  this.tripResponse = data
                  console.log(this.tripResponse)
                  this.form.patchValue({
                    vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
                    driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
                    driverName: this.vehcileDataResponse.data.driver.driverName,
                    routeName: this.vehcileDataResponse.data.route.routeName,
                    tripStartReading: this.tripResponse.data.tripStartReading,
                    tripEndReading: this.tripResponse.data.tripEndReading,
                    grossWeightValue: this.tripResponse.data.grossWt,
                    dryWeightValue:this.tripResponse.data.dryWt,
                    wetWeightValue:this.tripResponse.data.wetWt,
                    tareWeightValue:this.tripResponse.data.tareWt,
                    routeId: this.vehcileDataResponse.data.route.routeId,
                    helperId: this.tripResponse.data.helper.helperId
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
                    this.dryButton = false
                    this.wetWeightCapturedButton = true
                    this.grossWeightCapturedButton = false
                  }
                  else if(this.tripResponse.data.tripStatusEntity.id == 3){
                    this.tripStartButton = false
                    this.tripEndButton = false
                    this.dryButton = true
                    this.wetWeightCapturedButton = false
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
              this.errorResponse=error
              window.alert(this.errorResponse.error.message)
            }
          );

        });
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
        
        // this.setVehicleNumber();
        // this.service.getCompletedTrips().subscribe(
        //   data => {
        //     this.inActiveTripResponse = data
        //     this.inActiveTripList = this.inActiveTripResponse.data
        //   }
        // );
        this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
          data => {
            if (data && data.hasOwnProperty('vehicleNumber')) {
              this.vehcileDataResponse = data;
            }
            // this.form.patchValue({
            //   vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
            //   driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
            //   driverName: this.vehcileDataResponse.data.driver.driverName,
            //   routeName: this.vehcileDataResponse.data.route.routeName,
            //   tripStartReading: this.vehcileDataResponse.data.tripStartReading,
            //   tripEndReading:  this.vehcileDataResponse.data.tripEndReading,
            //   grossWeightValue:this.vehcileDataResponse.data.grossWt,
            //   dryWeightValue:this.vehcileDataResponse.data.dryWt,
            //   wetWeightValue:this.vehcileDataResponse.data.wetWt,
            //   tareWeightValue:this.vehcileDataResponse.data.tareWt,
            //   routeId: this.vehcileDataResponse.data.route.routeId,
            //   helperId: this.vehcileDataResponse.data.helper.helperId
            // })
          },
          error => {
          }
        );

        /**
         * Disable all buttons by default.
         */
        this.tripStartButton = false;
        this.tripEndButton = false;
        this.dryButton = false;
        this.wetWeightCapturedButton = false;
        this.grossWeightCapturedButton = false;

        this.service.getTripByVehicleNumber(this.form.value.vehicleNumber).subscribe(
          data => {
            if (data && data.hasOwnProperty('vehicleNumber')) {
              this.tripResponse = data;
            }

            /**
             * Enable the wet weight capturing button only.
             */
            this.wetWeightCapturedButton = true;

            // this.form.patchValue({
            //   vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
            //   driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
            //   driverName: this.vehcileDataResponse.data.driver.driverName,
            //   routeName: this.vehcileDataResponse.data.route.routeName,
            //   tripStartReading: this.tripResponse.data.tripStartReading,
            //   tripEndReading: this.tripResponse.data.tripEndReading,
            //   grossWeightValue: this.tripResponse.data.grossWt,
            //   dryWeightValue:this.tripResponse.data.dryWt,
            //   wetWeightValue:this.tripResponse.data.wetWt,
            //   tareWeightValue:this.tripResponse.data.tareWt,
            //   routeId: this.vehcileDataResponse.data.route.routeId,
            //   helperId: this.vehcileDataResponse.data.helper.helperId
            // })
            // if (this.tripResponse.data.tripStatusEntity.id == 1) {
            //   this.tripStartButton = false
            //   this.tripEndButton = false
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = true
              
            // }
            // else if(this.tripResponse.data.tripStatusEntity.id == 2){
            //   this.tripStartButton = false
            //   this.tripEndButton = false
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = true
            //   this.grossWeightCapturedButton = false
            // }
            // else if(this.tripResponse.data.tripStatusEntity.id == 3){
            //   this.tripStartButton = false
            //   this.tripEndButton = false
            //   this.dryButton = true
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
            // }
            // else if(this.tripResponse.data.tripStatusEntity.id == 4){
            //   this.tripStartButton = false
            //   this.tripEndButton = true
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
            // }
          },
          error=>{
            // this.tripStartButton = true
            //   this.tripEndButton = false
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
          }
        );
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
        this.errorResponse=error
        window.alert(this.errorResponse.error.message)
      }
    );
    
    
  }

  setDryWtValue(){
    const data={
      "tareWt": this.form.value.tareWeightValue,
      "statusEntity": {
        "id": 4
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        window.alert("Dry Weight captured successfully");

        /**
         * Disable all buttons by default.
         */
        this.tripStartButton = false;
        this.tripEndButton = false;
        this.dryButton = false;
        this.wetWeightCapturedButton = false;
        this.grossWeightCapturedButton = false;

        /**
         * Enable the trip end capture button only.
         */
        this.tripEndButton = true;

        // setTimeout(()=>{this.setVehicleNumber()},1000);
        this.setVehicleNumber()
       
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
        this.errorResponse=error
        window.alert(this.errorResponse.error.message)
      }
    );
    
    
  }

  setWetWtValue(){
    const data={
      "wetWt": this.form.value.wetWeightValue,
      "statusEntity": {
        "id": 3
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        window.alert("Wet Weight captured successfully")
        // this.setVehicleNumber();
        this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
          data => {

            if (data && data.hasOwnProperty('vehicleNumber')) {
              this.vehcileDataResponse = data
            }
            
            // console.log("vehcileDataResponse",this.vehcileDataResponse)
            // this.form.patchValue({
            //   vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
            //   driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
            //   driverName: this.vehcileDataResponse.data.driver.driverName,
            //   routeName: this.vehcileDataResponse.data.route.routeName,
            //   tripStartReading: this.vehcileDataResponse.data.tripStartReading,
            //   tripEndReading:  this.vehcileDataResponse.data.tripEndReading,
            //   grossWeightValue:this.vehcileDataResponse.data.grossWt,
            //   dryWeightValue:this.vehcileDataResponse.data.dryWt,
            //   wetWeightValue:this.vehcileDataResponse.data.wetWt,
            //   tareWeightValue:this.vehcileDataResponse.data.tareWt,
            //   routeId: this.vehcileDataResponse.data.route.routeId,
            //   helperId: this.vehcileDataResponse.data.helper.helperId
            // })
          },
          error => {
          }
        );

        /**
         * Disable all buttons by default.
         */
        this.tripStartButton = false;
        this.tripEndButton = false;
        this.dryButton = false;
        this.wetWeightCapturedButton = false;
        this.grossWeightCapturedButton = false;

        this.service.getTripByVehicleNumber(this.form.value.vehicleNumber).subscribe(
          data => {

            if (data && data.hasOwnProperty('vehicleNumber')) {
              this.tripResponse = data;
            }
          
            /**
             * Enable the dry weight capture button only.
             */
            this.dryButton = true;

            // this.form.patchValue({
            //   vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
            //   driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
            //   driverName: this.vehcileDataResponse.data.driver.driverName,
            //   routeName: this.vehcileDataResponse.data.route.routeName,
            //   tripStartReading: this.tripResponse.data.tripStartReading,
            //   tripEndReading: this.tripResponse.data.tripEndReading,
            //   grossWeightValue: this.tripResponse.data.grossWt,
            //   dryWeightValue:this.tripResponse.data.dryWt,
            //   wetWeightValue:this.tripResponse.data.wetWt,
            //   tareWeightValue:this.tripResponse.data.tareWt,
            //   routeId: this.vehcileDataResponse.data.route.routeId,
            //   helperId: this.vehcileDataResponse.data.helper.helperId
            // })
            // if (this.tripResponse.data.tripStatusEntity.id == 1) {
            //   this.tripStartButton = false
            //   this.tripEndButton = false
            //   this.dryButton = true
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
              
            // }
            // else if(this.tripResponse.data.tripStatusEntity.id == 2){
            //   this.tripStartButton = false
            //   this.tripEndButton = false
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = true
            //   this.grossWeightCapturedButton = false
            // }
            // else if(this.tripResponse.data.tripStatusEntity.id == 3){
            //   this.tripStartButton = false
            //   this.tripEndButton = false
            //   this.dryButton = true
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
            // }
            // else if(this.tripResponse.data.tripStatusEntity.id == 4){
            //   this.tripStartButton = false
            //   this.tripEndButton = true
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
            // }
          },
          error=>{
            // this.tripStartButton = true
            //   this.tripEndButton = false
            //   this.dryButton = false
            //   this.wetWeightCapturedButton = false
            //   this.grossWeightCapturedButton = false
          }
        );
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
        this.errorResponse=error
        window.alert(this.errorResponse.error.message)
      }
    );
    
    
  }

  tripEndReadingImgFile: any;

  onTripEndFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.tripEndReadingImgFile = file;
  }

  endTrip(){

    if (!this.tripEndReadingImgFile) {
      alert("Please select an image for trip end reading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", this.tripEndReadingImgFile);

    this.service.uploadFile(formData)
      .subscribe(
        (response: any) => {
          const fileUrl: string = response.data;

          if (!this.isURL(fileUrl)) {
            alert("Invalid file link detected.");
            return;
          }

          const fileUrlItems: any = fileUrl.split('/');
          const fileName = fileUrlItems[fileUrlItems.length - 1];

          const data={
            "tripEndReading": this.form.value.tripEndReading,
            "statusEntity": {
              "id": 5
            },
            "vehicleNo":this.form.value.vehicleNumber,
            "tripEndReadingImg": fileUrl
          }
          this.service.updateTrip(data).subscribe(
            data=>{
              window.alert("Trip completed")
              this.setVehicleNumber();
              this.service.getActiveTrip().subscribe(
                data => {
                  this.activeTripResponse = data
                  this.activeTripList = this.activeTripResponse.data
                  const rowData =   this.activeTripList.map((item: any) => {
                   
                    return {
                      vehicle_vehicleNo: item.vehicleNo,
                      driver_driverName: item.driver.driverName,
                      helper_name: item.helper.helperName,
                      route_routeName: item.route.routeName,
                      tripStartReading: item.tripStartReading,
                      vehicle_starttime: item.createdDate,
                      trip_start_reading_image: item.tripStartReadingImg
                    };
                  });
                //  console.log("ActiveList",this.activeTripList)
                //  console.log("rowData",rowData)
                 this.rowData=rowData;
                }
              );
              this.service.getCompletedTrips().subscribe(
                data => {
                  this.inActiveTripResponse = data
                  this.inActiveTripList = this.inActiveTripResponse.data
                  const rowDataComp =   this.inActiveTripList.map((item: any) => {
                   
                    return {
                      vehicle_vehicleNo: item.vehicleNo,
                      driver_driverName: item.driver.driverName,
                      helper_name: item.helper.helperName,
                      route_routeName: item.route.routeName,
                      tripStartReading: item.tripStartReading,
                      tripEndReading:item.tripEndReading,
                      vehicle_starttime: item.createdDate,
                      vehicle_endtime:item.updateDate,
                      trip_start_reading_image: item.tripStartReadingImg,
                      trip_end_reading_image: (item.tripEndReadingImg) ? item.tripEndReadingImg : null
                    };
                  });
                //  console.log("InActiveList",this.inActiveTripList)
                //  console.log("rowData",rowDataComp)
                 this.rowDataComp=rowDataComp;
                  
                }
              );
            },
            error=>{
              this.errorResponse=error
              window.alert(this.errorResponse.error.message)
            }
          );

        });
  }

  async getRouteList() {
    try {
            this.routeList = await this.service.get(`/zone/getAllRoute`)
            this.routeList = this.routeList.sort((a: any, b: any) => a.routeName - b.routeName)
    } catch (e) {
            console.error(e)
    }
}

updateData(item: any) {
  this.isUpdate = true
  this.isAdd = false
  console.log(item)
  this.vehicleNo=item.vehicle.vehicleNo

  
}

columnDefs: ColDef[] = [
  { field: 'vehicle_vehicleNo', headerName: 'Vehicle No.', unSortIcon: true,resizable: true},
  { field: 'driver_driverName', headerName: 'Driver Name', unSortIcon: true,resizable: true},
  { field: 'helper_name', headerName: 'Helper Name', unSortIcon: true,resizable: true},
  { field: 'route_routeName', headerName: 'Route', unSortIcon: true,resizable: true},
  { field: 'tripStartReading', headerName: 'Initial Reading', unSortIcon: true,resizable: true},
  { field: 'vehicle_starttime', headerName: 'Vehicle Start Time', unSortIcon: true,resizable: true},
 { field: 'trip_start_reading_image', headerName: 'Trip Start Reading Image', unSortIcon: false,resizable: true, cellRenderer: 'imageCellRenderer', editable: false, width: 240},
  { headerName: 'Edit', width: 125, sortable: false, filter: false, editable: false, colId: 'actions',
    cellRenderer: 'activeTripActionRenderer'
  }
];

editActiveTripData(itemData: any) {
  console.log(itemData);
}

defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  editable:true
};

gridOptions = {
  defaultColDef: {
    ...this.defaultColDef
  },
  pagination: true,
  paginationPageSize: 10,
  rowStyle: { background: '#e2e8f0' },
  copyHeadersToClipboard:true,
  enableRangeSelection:true,
  frameworkComponents: {
    imageCellRenderer: ImageCellRendererComponent,
    activeTripActionRenderer: ActiveTripActionRendererComponent
  }
}
rowData = [
  { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5',tripEndReading: '120.6', vehicle_starttime: '2023-05-19 06:00:00', trip_start_reading_image : "" }
];



columnDefsComp: ColDef[] = [
  { field: 'vehicle_vehicleNo', headerName: 'Vehicle No.', unSortIcon: true,resizable: true,},
  { field: 'driver_driverName', headerName: 'Driver Name', unSortIcon: true,resizable: true,},
  { field: 'helper_name', headerName: 'Helper Name', unSortIcon: true,resizable: true,},
  { field: 'route_routeName', headerName: 'Route', unSortIcon: true,resizable: true,},
  { field: 'tripStartReading', headerName: 'Initial Reading', unSortIcon: true,resizable: true,},
  { field: 'tripEndReading', headerName: 'Final Reading', unSortIcon: true,resizable: true,},
  { field: 'vehicle_starttime', headerName: 'Vehicle Start Time', unSortIcon: true,resizable: true},
  { field: 'updatedDate', headerName: 'Vehicle End Time', unSortIcon: true,resizable: true},
  { field: 'grossWt', headerName: 'Gross Wight', unSortIcon: true,resizable: true},
  { field: 'wetWt', headerName: 'Wet Weight', unSortIcon: true,resizable: true,},
  { field: 'dryWt', headerName: 'Dry Weight', unSortIcon: true,resizable: true},
  // { headerName: 'Edit', width: 125, sortable: false, filter: false,
  //   cellRenderer: (data: any) => {
  //    return `
  //     <button class="btn btn-primary btn-sm" (click)="updateData(x)">
  //       <i class="fa-solid fa-edit"></i>
  //     </button>
  //     <button class="btn btn-danger btn-sm">
  //     <i class="fa-solid fa-trash-alt"></i>
  //   </button>
  //    `; 
  //   }
  // }
  { field: 'trip_start_reading_image', headerName: 'Trip Start Reading Image', unSortIcon: false,resizable: true, cellRenderer: 'imageCellRenderer', editable: false, width: 240},
  { field: 'trip_end_reading_image', headerName: 'Trip End Reading Image', unSortIcon: false,resizable: true, cellRenderer: 'imageCellRenderer', editable: false, width: 240},
];

defaultColDefComp: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
};

gridOptionsComp = {
  defaultColDef: {
    ...this.defaultColDefComp 
  },
  pagination: true,
  paginationPageSize: 10,
  rowStyle: { background: '#e2e8f0' },
  frameworkComponents: {
    imageCellRenderer: ImageCellRendererComponent
  }
}
rowDataComp = [
  { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5', vehicle_starttime: '2023-05-19 06:00:00', updatedDate: '2023-05-19 06:00:00', trip_start_reading_image : "", trip_end_reading_image: ""}
];
wetWeightCal(){
  const temp= this.form.value.grossWeightValue
  const temp1= this.form.value.unloadwetWeightValue
  this.form.controls.wetWeightValue.setValue(temp-temp1)  ;
  }

}
