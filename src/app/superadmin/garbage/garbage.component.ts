import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule, Validators} from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ImageCellRendererComponent } from '../image-cell-renderer/image-cell-renderer.component';
import { ActiveTripActionRendererComponent } from './active-trip-action-renderer/active-trip-action-renderer.component';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['../../common.css', './garbage.component.css']
})
export class GarbageComponent implements OnInit {

  constructor(private service: CommonService, private formBuilder: FormBuilder, private httpClient: HttpClient, private toastService: ToastService) {
    this.wcId = localStorage.getItem("wcId");
    this.getRouteList()
    this.getCompletedTrip()

  }
  isAdd: boolean = true
  isUpdate: boolean = false
  isDisableBov: boolean = true
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
  loginResponse:any
  driverList:any=[]
  form = new FormGroup({
    vehicleNumber: new FormControl,
    driverDlNo: new FormControl,
    driverName: new FormControl,
    driverId: new FormControl,
    routeName: new FormControl,
    tripStartReading: new FormControl,
    tripEndReading: new FormControl,
    grossWeightValue: new FormControl,
    dryWeightValue: new FormControl,
    wetWeightValue: new FormControl,
    tareWeightValue: new FormControl,
    unloadwetWeightValue: new FormControl,
    routeId: new FormControl,
    helperId:new FormControl,
    move_tts:new FormControl,
    vehicleType: new FormControl
  });
  wcId: any = 0;
  ngOnInit() {
    // this.setVehicleNumber()
    this.service.getAllHelperByWcId().subscribe((data) => {
      this.loginResponse = data;
      this.helperList = this.loginResponse.data;
    });
    this.service.getAllDriverList().subscribe((data) => {
      this.driverList = data;
    });
    this.service.getActiveTrip().subscribe(
      data => {
        this.activeTripResponse = data
        this.activeTripList = this.activeTripResponse.data
        const rowData =   this.activeTripList.map((item: any) => {  
          const isBOV:boolean = item?.vehicle?.vehicleType === "BOV" ? true : false;    
          return {
            wc_name: item.wc?.wcName,
            vehicle_vehicleNo: item.vehicleNo,
            vehicle_type: item?.vehicle?.vehicleType,
            driver_driverName: item.driver.driverName,
            helper_name: item.helper.helperName,
            route_routeName: item.route.routeName,
            tripStartReading: item.tripStartReading,
            vehicle_starttime: item.createdDate,
            trip_start_reading_image: (item.tripStartReadingImg && !isBOV) ? item.tripStartReadingImg : null,
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
        this.inActiveTripList = this.inActiveTripResponse.data;
        
        const rowDataComp = this.inActiveTripList.map((item: any) => { 
          const isBOV:boolean = item?.vehicle?.vehicleType === "BOV" ? true : false;   
          return {
            wc_name: item.wc.wcName,
            vehicle_vehicleNo: item.vehicleNo,
            vehicle_type: item?.vehicle?.vehicleType,
            driver_driverName: item.driver.driverName,
            helper_name: item.helper.helperName,
            route_routeName: item.route.routeName,
            tripStartReading: item.tripStartReading,
            tripEndReading: item.tripEndReading,
            vehicle_starttime: item.createdDate,
            updatedDate:item.updatedDate,
            grossWt: item.grossWt,
            wetWt: item.wetWt,
            dryWt: item.dryWt,
            trip_start_reading_image: (item.tripStartReadingImg && !isBOV) ? item.tripStartReadingImg: null,
            trip_end_reading_image: (item.tripEndReadingImg && !isBOV) ? item.tripEndReadingImg : null
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

    const vehicleNumber: any = this.form.value.vehicleNumber?.trim();
    if (!vehicleNumber) {
      this.toastService.showWarning(`Please enter a vehicle number.`);
      return;
    }

    this.form.reset();

    this.form.patchValue({
      vehicleNumber: vehicleNumber
    });

    this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
      data => {
        this.vehcileDataResponse = data
        // console.log("vehcileDataResponse", this.vehcileDataResponse);
        this.isDisableBov = this.vehcileDataResponse.data.vehicleType === "BOV" ? false : true;
        this.form.patchValue({
          vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
          driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
          driverId:this.vehcileDataResponse.data.driver.driverId,
          routeName: this.vehcileDataResponse.data.route.routeName,
          tripStartReading: this.vehcileDataResponse.data.tripStartReading,
          tripEndReading:  this.vehcileDataResponse.data.tripEndReading,
          grossWeightValue:this.vehcileDataResponse.data.grossWt,
          dryWeightValue:this.vehcileDataResponse.data.dryWt,
          wetWeightValue:this.vehcileDataResponse.data.wetWt,
          tareWeightValue:this.vehcileDataResponse.data.tareWt,
          routeId: this.vehcileDataResponse.data.route.routeId,
          unloadwetWeightValue: (this.vehcileDataResponse.data.grossWt && this.vehcileDataResponse.data.wetWt) ? this.vehcileDataResponse.data.grossWt - this.vehcileDataResponse.data.wetWt : "",
          vehicleType: this.vehcileDataResponse.data.vehicleType

        })
      },
      error => {
        this.toastService.showError(error.error.message);
      }
    );
    this.service.getTripByVehicleNumber(this.form.value.vehicleNumber).subscribe(
      data => {
        this.tripResponse = data
        // console.log("tripResponse Data", this.tripResponse);
        this.form.patchValue({
          vehicleNumber: this.vehcileDataResponse.data.vehicleNo,
          driverDlNo: this.vehcileDataResponse.data.driver.dlNo,
          driverName: this.tripResponse.data.driver.driverName,
          driverId:this.tripResponse.data.driver.driverId,
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

          document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
          !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 2){
          this.tripStartButton = false
          this.tripEndButton = false
          this.dryButton = false
          this.wetWeightCapturedButton = true
          this.grossWeightCapturedButton = false

          document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
          !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.unloadWetWeightDiv span') && document.querySelector('.unloadWetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.wetWeightDiv span') && document.querySelector('.wetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 3){
          this.tripStartButton = false
          this.tripEndButton = false
          this.dryButton = true
          this.wetWeightCapturedButton = false
          this.grossWeightCapturedButton = false

          document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
          !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.unloadWetWeightDiv span') && document.querySelector('.unloadWetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.wetWeightDiv span') && document.querySelector('.wetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.tareWeightDiv span') && document.querySelector('.tareWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.dryWeightDiv span') && document.querySelector('.dryWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        }
        else if(this.tripResponse.data.tripStatusEntity.id == 4){
          this.tripStartButton = false
          this.tripEndButton = true
          this.dryButton = false
          this.wetWeightCapturedButton = false
          this.grossWeightCapturedButton = false

          document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
          !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.unloadWetWeightDiv span') && document.querySelector('.unloadWetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.wetWeightDiv span') && document.querySelector('.wetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.tareWeightDiv span') && document.querySelector('.tareWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.dryWeightDiv span') && document.querySelector('.dryWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.tripEndReadingDiv span') && document.querySelector('.tripEndReadingDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
          !document.querySelector('.tripEndReadingPictureDiv span') && document.querySelector('.tripEndReadingPictureDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
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

  getMimeType(header: string): string {
    switch (header) {
      case '89504e47':
        return 'image/png';
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
        return 'image/jpeg';
      default:
        return '';
    }
  }

  async createTrip(){

    const vehicleNumberElement = document.querySelector('#vehicleNumber') as HTMLInputElement;
    const vehicleNumber = vehicleNumberElement.value.trim();
    if (vehicleNumber === '') {
      this.toastService.showWarning('Vehicle number is required.');
      return;
    }

    const tripStartReadingElement = document.querySelector('#tripStartReading') as HTMLInputElement;
    const tripStartReading = tripStartReadingElement?.value?.trim();
    if (tripStartReading === '' && this.isDisableBov) {
      this.toastService.showWarning('Trip start reading is required.');
      return;
    }

    if (!this.tripStartReadingImgFile && this.isDisableBov) {
      this.toastService.showWarning("Please select an image for trip start reading.");
      return;
    }

    const tripStartFileInputElement = document.getElementById('tripStartReadingPictureInput') as HTMLInputElement;

    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    const fileType = this.tripStartReadingImgFile?.name?.substring(this.tripStartReadingImgFile?.name?.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileType) && this.isDisableBov) {
      this.toastService.showWarning('Unsupported file type. Only PNG and JPEG files are allowed.');
      tripStartFileInputElement.value = '';
      return;
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      const mimeType = this.getMimeType(header);
      if (!allowedMimeTypes.includes(mimeType) && this.isDisableBov) {
        this.toastService.showWarning('Unsupported file type. Only PNG and JPEG files are allowed.');
        tripStartFileInputElement.value = '';
        return;
      }
    };
    
    this.isDisableBov && await reader.readAsArrayBuffer(this.tripStartReadingImgFile);

    if (this.isDisableBov && this.tripStartReadingImgFile?.size > 15 * 1024 * 1024) {
      this.toastService.showWarning('Max file size allowed is: 15 MB');
      tripStartFileInputElement.value = '';
      return;
    }
    
    const driverDlNoElement = document.querySelector('#driverDlNo') as HTMLInputElement;
    const driverDlNo = driverDlNoElement.value.trim();
    if (driverDlNo === '') {
      this.toastService.showWarning('DL number is required.');
      return;
    }
    
    const driverIdElement = document.querySelector('#driverId') as HTMLInputElement;
    const driverId = driverIdElement.value.trim();
    if (driverId === '') {
      this.toastService.showWarning('Driver name is required.');
      return;
    }
    
    const helperIdElement = document.querySelector('#helperId') as HTMLInputElement;
    const helperId = helperIdElement.value.trim();
    if (helperId === '') {
      this.toastService.showWarning('Helper name is required.');
      return;
    }
    
    // const routeIdElement = document.querySelector('#routeId') as HTMLInputElement;
    // const routeId = routeIdElement.value.trim();
    // if (routeId === '') {
    //   this.toastService.showWarning('Route is required.');
    //   return;
    // }

    let tripStartReadingImgUrl:string = "";
    const formData = new FormData();
    formData.set("file", this.tripStartReadingImgFile);
    // Common Method  handleStartTripSubmit for LCV or BOV
    const handleStartTripSubmit = () => {      
      const data={
        "driver": {
          "driverId":this.form.value.driverId
        },
        "route": this.vehcileDataResponse.data.route,
        "tripStartReading": this.isDisableBov ? this.form.value.tripStartReading : 0,
        "tripStartReadingImg": tripStartReadingImgUrl,
        "vehicleNo": this.vehcileDataResponse.data.vehicleNo,
        "vehicleType": this.vehcileDataResponse.data.vehicleType,
        "helper": {
          "helperId":this.form.value.helperId
        },
        "wc": {
                "wcId":localStorage.getItem('wcId')
              },
        "tts": "No"
      }
      //console.log("Create Trip Data", data);
      this.service.createTrip(data).subscribe(
        data=>{
          //console.log("Create Trip Data start tripStartReadingImgUrl", tripStartReadingImgUrl);
          this.toastService.showSuccess("Trip Created Successfully")
          // this.setVehicleNumber();
          this.service.getVehicleByVehicleNumber(this.form.value.vehicleNumber).subscribe(
            data => {
              this.vehcileDataResponse = data
              //console.log("vehcileDataResponse",this.vehcileDataResponse)
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
                helperId: this.vehcileDataResponse?.data?.helper?.helperId,
                vehicleType: this.vehcileDataResponse.data.vehicleType
              })
              this.service.getActiveTrip().subscribe(
                data => {
                  this.activeTripResponse = data
                  this.activeTripList = this.activeTripResponse.data
                  const rowData =   this.activeTripList.map((item: any) => {                       
                    return {
                      wc_name: item.wc?.wcName,
                      vehicle_vehicleNo: item.vehicleNo, 
                      vehicle_type: item?.vehicle?.vehicleType,                     
                      driver_driverName: item.driver.driverName,
                      helper_name: item.helper.helperName,
                      route_routeName: item.route.routeName,
                      tripStartReading: item?.tripStartReading,
                      vehicle_starttime: item.createdDate,
                      trip_start_reading_image: item?.tripStartReadingImg,
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
                      vehicle_type: item?.vehicle?.vehicleType,                     
                      driver_driverName: item.driver.driverName,
                      helper_name: item.helper.helperName,
                      route_routeName: item.route.routeName,
                      tripStartReading: item?.tripStartReading,
                      tripEndReading:item?.tripEndReading,
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
              //console.log("this.vehcileDataResponse.datasss", this.vehcileDataResponse.data);
              //console.log("this.tripResponswwwww", this.tripResponse);
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

                document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
                !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
                
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
          tripStartReadingImgUrl = "";
        },
        error=>{
          tripStartReadingImgUrl = ""
          this.errorResponse=error
          this.toastService.showError(this.errorResponse?.error?.message)
        }
      );  
    };

    
    this.isDisableBov && this.httpClient.post(this.service.endpoint+":9091/v1/uploadFile", formData)
      .subscribe(
        (response: any) => {
          tripStartReadingImgUrl = response.data;          
          
          if (!this.isURL(tripStartReadingImgUrl)) {           
            this.toastService.showError("Invalid file link detected.");
            return;
          }
          const fileUrlItems: any = tripStartReadingImgUrl.split("/");
          const fileName = fileUrlItems[fileUrlItems.length - 1];

          handleStartTripSubmit();

        }, (error) => {
          tripStartReadingImgUrl = "";
          this.toastService.showError('Error occured while uploading file.');
      });        
      
      !this.isDisableBov && handleStartTripSubmit();
      
  }

  setGrossWtValue(){

    const vehicleNumberElement = document.querySelector('#vehicleNumber') as HTMLInputElement;
    const vehicleNumber = vehicleNumberElement.value.trim();
    if (vehicleNumber === '') {
      this.toastService.showWarning('Vehicle number is required.');
      return;
    }

    const tripStartReadingElement = document.querySelector('#tripStartReading') as HTMLInputElement;
    const tripStartReading = tripStartReadingElement?.value?.trim();
    if (tripStartReading === '' && this.isDisableBov) {
      this.toastService.showWarning('Trip start reading is required.');
      return;
    }

    const driverDlNoElement = document.querySelector('#driverDlNo') as HTMLInputElement;
    const driverDlNo = driverDlNoElement.value.trim();
    if (driverDlNo === '') {
      this.toastService.showWarning('DL number is required.');
      return;
    }
    
    const driverIdElement = document.querySelector('#driverId') as HTMLInputElement;
    const driverId = driverIdElement.value.trim();
    if (driverId === '') {
      this.toastService.showWarning('Driver name is required.');
      return;
    }
    
    const helperIdElement = document.querySelector('#helperId') as HTMLInputElement;
    const helperId = helperIdElement.value.trim();
    if (helperId === '') {
      this.toastService.showWarning('Helper name is required.');
      return;
    }
    
    const grossWeightValueElement = document.querySelector('#grossWeightValue') as HTMLInputElement;
    const grossWeightValue = grossWeightValueElement.value.trim();
    if (grossWeightValue === '') {
      this.toastService.showWarning('Gross weight is required.');
      return;
    }

    const data={
      "grossWt": this.form.value.grossWeightValue,
      "statusEntity": {
        "id": 2
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        this.toastService.showSuccess("Gross Weight captured successfully");
        
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

            document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
            !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
            !document.querySelector('.unloadWetWeightDiv span') && document.querySelector('.unloadWetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
            !document.querySelector('.wetWeightDiv span') && document.querySelector('.wetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');

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
        this.toastService.showError(this.errorResponse.error.message)
      }
    );        
  }

  setDryWtValue(){

    const vehicleNumberElement = document.querySelector('#vehicleNumber') as HTMLInputElement;
    const vehicleNumber = vehicleNumberElement.value.trim();
    if (vehicleNumber === '') {
      this.toastService.showWarning('Vehicle number is required.');
      return;
    }

    const tripStartReadingElement = document.querySelector('#tripStartReading') as HTMLInputElement;
    const tripStartReading = tripStartReadingElement?.value?.trim();
    if (tripStartReading === '' && this.isDisableBov) {
      this.toastService.showWarning('Trip start reading is required.');
      return;
    }

    const driverDlNoElement = document.querySelector('#driverDlNo') as HTMLInputElement;
    const driverDlNo = driverDlNoElement.value.trim();
    if (driverDlNo === '') {
      this.toastService.showWarning('DL number is required.');
      return;
    }
    
    const driverIdElement = document.querySelector('#driverId') as HTMLInputElement;
    const driverId = driverIdElement.value.trim();
    if (driverId === '') {
      this.toastService.showWarning('Driver name is required.');
      return;
    }
    
    const helperIdElement = document.querySelector('#helperId') as HTMLInputElement;
    const helperId = helperIdElement.value.trim();
    if (helperId === '') {
      this.toastService.showWarning('Helper name is required.');
      return;
    }

    const grossWeightValueElement = document.querySelector('#grossWeightValue') as HTMLInputElement;
    const grossWeightValue = grossWeightValueElement.value.trim();
    if (grossWeightValue === '') {
      this.toastService.showWarning('Gross weight is required.');
      return;
    }
    
    const unloadIdElement = document.querySelector('#unloadId') as HTMLInputElement;
    const unloadId = unloadIdElement.value.trim();
    if (unloadId === '') {
      this.toastService.showWarning('Unload wet weight is required.');
      return;
    }
    
    const wetWeightValueElement = document.querySelector('#wetWeightValue') as HTMLInputElement;
    const wetWeightValue = wetWeightValueElement.value.trim();
    if (wetWeightValue === '') {
      this.toastService.showWarning('Wet weight is required.');
      return;
    }
    
    const tareWeightValueElement = document.querySelector('#tareWeightValue') as HTMLInputElement;
    const tareWeightValue = tareWeightValueElement.value.trim();
    if (tareWeightValue === '') {
      this.toastService.showWarning('Tare weight is required.');
      return;
    }
    
    // const dryWeightValueElement = document.querySelector('#dryWeightValue') as HTMLInputElement;
    // const dryWeightValue = dryWeightValueElement.value.trim();
    // if (dryWeightValue === '') {
    //   this.toastService.showWarning('Dry weight is required.');
    //   return;
    // }

    const data={
      "tareWt": this.form.value.tareWeightValue,
      "statusEntity": {
        "id": 4
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        this.toastService.showSuccess("Dry weight captured successfully");

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

        document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
        !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        !document.querySelector('.unloadWetWeightDiv span') && document.querySelector('.unloadWetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        !document.querySelector('.wetWeightDiv span') && document.querySelector('.wetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        !document.querySelector('.tareWeightDiv span') && document.querySelector('.tareWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        !document.querySelector('.dryWeightDiv span') && document.querySelector('.dryWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        !document.querySelector('.tripEndReadingDiv span') && document.querySelector('.tripEndReadingDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
        !document.querySelector('.tripEndReadingPictureDiv span') && document.querySelector('.tripEndReadingPictureDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');

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
        this.toastService.showError(this.errorResponse.error.message)
      }
    );        
  }

  setWetWtValue(){

    const vehicleNumberElement = document.querySelector('#vehicleNumber') as HTMLInputElement;
    const vehicleNumber = vehicleNumberElement.value.trim();
    if (vehicleNumber === '') {
      this.toastService.showWarning('Vehicle number is required.');
      return;
    }

    const tripStartReadingElement = document.querySelector('#tripStartReading') as HTMLInputElement;
    const tripStartReading = tripStartReadingElement?.value?.trim();
    if (tripStartReading === ''  && this.isDisableBov) {
      this.toastService.showWarning('Trip start reading is required.');
      return;
    }

    const driverDlNoElement = document.querySelector('#driverDlNo') as HTMLInputElement;
    const driverDlNo = driverDlNoElement.value.trim();
    if (driverDlNo === '') {
      this.toastService.showWarning('DL number is required.');
      return;
    }
    
    const driverIdElement = document.querySelector('#driverId') as HTMLInputElement;
    const driverId = driverIdElement.value.trim();
    if (driverId === '') {
      this.toastService.showWarning('Driver name is required.');
      return;
    }
    
    const helperIdElement = document.querySelector('#helperId') as HTMLInputElement;
    const helperId = helperIdElement.value.trim();
    if (helperId === '') {
      this.toastService.showWarning('Helper name is required.');
      return;
    }

    const grossWeightValueElement = document.querySelector('#grossWeightValue') as HTMLInputElement;
    const grossWeightValue = grossWeightValueElement.value.trim();
    if (grossWeightValue === '') {
      this.toastService.showWarning('Gross weight is required.');
      return;
    }
    
    const unloadIdElement = document.querySelector('#unloadId') as HTMLInputElement;
    const unloadId = unloadIdElement.value.trim();
    if (unloadId === '') {
      this.toastService.showWarning('Unload wet weight is required.');
      return;
    }
    
    const wetWeightValueElement = document.querySelector('#wetWeightValue') as HTMLInputElement;
    const wetWeightValue = wetWeightValueElement.value.trim();
    if (wetWeightValue === '') {
      this.toastService.showWarning('Wet weight is required.');
      return;
    }

    const data={
      "wetWt": this.form.value.wetWeightValue,
      "statusEntity": {
        "id": 3
      },
      "vehicleNo":this.form.value.vehicleNumber
    }
    
    this.service.updateTrip(data).subscribe(
      data=>{
        this.toastService.showSuccess("Wet weight captured successfully")
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

            document.querySelector('.tripStartReadingPictureDiv .text-danger')?.remove();
            !document.querySelector('.grossWeightDiv .label span') && document.querySelector('.grossWeightDiv .label')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
            !document.querySelector('.unloadWetWeightDiv span') && document.querySelector('.unloadWetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
            !document.querySelector('.wetWeightDiv span') && document.querySelector('.wetWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
            !document.querySelector('.tareWeightDiv span') && document.querySelector('.tareWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');
            !document.querySelector('.dryWeightDiv span') && document.querySelector('.dryWeightDiv')?.insertAdjacentHTML('beforeend', '<span class="text-danger">*</span>');

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
        this.toastService.showError(this.errorResponse.error.message)
      }
    );
    
    
  }

  tripEndReadingImgFile: any;

  onTripEndFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.tripEndReadingImgFile = file;
  }

  async endTrip(){

    const vehicleNumberElement = document.querySelector('#vehicleNumber') as HTMLInputElement;
    const vehicleNumber = vehicleNumberElement.value.trim();
    if (vehicleNumber === '') {
      this.toastService.showWarning('Vehicle number is required.');
      return;
    }

    const tripStartReadingElement = document.querySelector('#tripStartReading') as HTMLInputElement;
    const tripStartReading = tripStartReadingElement?.value?.trim();
    if (tripStartReading === '' && this.isDisableBov) {
      this.toastService.showWarning('Trip start reading is required.');
      return;
    }

    const driverDlNoElement = document.querySelector('#driverDlNo') as HTMLInputElement;
    const driverDlNo = driverDlNoElement.value.trim();
    if (driverDlNo === '') {
      this.toastService.showWarning('DL number is required.');
      return;
    }
    
    const driverIdElement = document.querySelector('#driverId') as HTMLInputElement;
    const driverId = driverIdElement.value.trim();
    if (driverId === '') {
      this.toastService.showWarning('Driver name is required.');
      return;
    }
    
    const helperIdElement = document.querySelector('#helperId') as HTMLInputElement;
    const helperId = helperIdElement.value.trim();
    if (helperId === '') {
      this.toastService.showWarning('Helper name is required.');
      return;
    }
    
    const tripEndReadingElement = document.querySelector('#tripEndReading') as HTMLInputElement;
    const tripEndReading = tripEndReadingElement?.value?.trim();
    if (tripEndReading === '' && this.isDisableBov) {
      this.toastService.showWarning('Trip end reading is required.');
      return;
    }

    if (!this.tripEndReadingImgFile && this.isDisableBov) {
      this.toastService.showWarning("Please select an image for trip end reading.");
      return;
    }

    const tripEndFileInputElement = document.getElementById('tripEndReadingPictureInput') as HTMLInputElement;

    const allowedTypes = ['.jpg', '.jpeg', '.png'];
    const fileType = this.tripEndReadingImgFile?.name?.substring(this.tripEndReadingImgFile?.name?.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(fileType)  && this.isDisableBov) {
      this.toastService.showWarning('Unsupported file type. Only PNG and JPEG files are allowed.');
      tripEndFileInputElement.value = '';
      return;
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      const mimeType = this.getMimeType(header);
      if (!allowedMimeTypes.includes(mimeType)) {
        this.toastService.showWarning('Unsupported file type. Only PNG and JPEG files are allowed.');
        tripEndFileInputElement.value = '';
        return;
      }
    };
    
    this.isDisableBov && await reader.readAsArrayBuffer(this.tripEndReadingImgFile);

    if (this.isDisableBov && this.tripEndReadingImgFile.size > 15 * 1024 * 1024) {
      this.toastService.showWarning('Max file size allowed is: 15 MB');
      tripEndFileInputElement.value = '';
      return;
    }

    const grossWeightValueElement = document.querySelector('#grossWeightValue') as HTMLInputElement;
    const grossWeightValue = grossWeightValueElement.value.trim();
    if (grossWeightValue === '') {
      this.toastService.showWarning('Gross weight is required.');
      return;
    }
    
    const unloadIdElement = document.querySelector('#unloadId') as HTMLInputElement;
    const unloadId = unloadIdElement.value.trim();
    if (unloadId === '') {
      this.toastService.showWarning('Unload wet weight is required.');
      return;
    }
    
    const wetWeightValueElement = document.querySelector('#wetWeightValue') as HTMLInputElement;
    const wetWeightValue = wetWeightValueElement.value.trim();
    if (wetWeightValue === '') {
      this.toastService.showWarning('Wet weight is required.');
      return;
    }
    
    const tareWeightValueElement = document.querySelector('#tareWeightValue') as HTMLInputElement;
    const tareWeightValue = tareWeightValueElement.value.trim();
    if (tareWeightValue === '') {
      this.toastService.showWarning('Tare weight is required.');
      return;
    }
    
    const dryWeightValueElement = document.querySelector('#dryWeightValue') as HTMLInputElement;
    const dryWeightValue = dryWeightValueElement.value.trim();
    if (dryWeightValue === '') {
      this.toastService.showWarning('Dry weight is required.');
      return;
    }

    const formData = new FormData();
    formData.append("file", this.tripEndReadingImgFile);
    let tripEndReadingImgUrl:string = "";

    //Commom method End trip Submit for LCV & BOV
    const handleEndTripSubmit = () => {
      const data={
        "tripEndReading": this.isDisableBov ? this.form.value.tripEndReading : 0,
        "statusEntity": {
          "id": 5
        },
        "vehicleNo":this.form.value.vehicleNumber,
        "tripEndReadingImg": tripEndReadingImgUrl
      }
      this.service.updateTrip(data).subscribe(
        data=>{
          this.toastService.showSuccess("Trip completed")
          this.form.reset()
          location.reload()
          
          this.service.getActiveTrip().subscribe(
            data => {
              this.activeTripResponse = data
              this.activeTripList = this.activeTripResponse.data
              const rowData =   this.activeTripList.map((item: any) => {                   
                return {
                  vehicle_vehicleNo: item.vehicleNo, 
                  vehicle_type: item?.vehicle?.vehicleType,                 
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
              const rowDataComp = this.inActiveTripList.map((item: any) => {                   
                return {
                  vehicle_vehicleNo: item.vehicleNo, 
                  vehicle_type: item?.vehicle?.vehicleType,                 
                  driver_driverName: item.driver.driverName,
                  helper_name: item.helper.helperName,
                  route_routeName: item.route.routeName,
                  tripStartReading: item.tripStartReading,
                  tripEndReading: item.tripEndReading,
                  vehicle_starttime: item.createdDate,
                  vehicle_endtime:item.updateDate,
                  trip_start_reading_image: item.tripStartReadingImg,
                  trip_end_reading_image: (item.tripEndReadingImg) ? item.tripEndReadingImg : null
                };
              });
              //console.log("InActiveList",this.inActiveTripList)
              //console.log("rowData",rowDataComp)
              this.rowDataComp=rowDataComp;                  
            }
          );
        },
        error=>{
          this.errorResponse=error
          this.toastService.showError(this.errorResponse.error.message)
        }
      )      
    };           

    //Submit End trip for LCV
    this.isDisableBov && this.httpClient.post(this.service.endpoint+":9091/v1/uploadFile", formData)
      .subscribe(
        (response: any) => {
          tripEndReadingImgUrl = response.data;

          if (!this.isURL(tripEndReadingImgUrl)) {
            this.toastService.showError("Invalid file link detected.");
            return;
          }
          const fileUrlItems: any = tripEndReadingImgUrl.split('/');
          const fileName = fileUrlItems[fileUrlItems.length - 1];
          handleEndTripSubmit();
        }, (error) => {
          tripEndReadingImgUrl = "";
          this.toastService.showError('Error occured while uploading file.');
        });

        //Submit End trip for BOV
        !this.isDisableBov && handleEndTripSubmit();
        
  }

  async getRouteList() {
    try {
        this.routeList = await this.service.get(`/zone/getAllRoute/`+this.wcId)
        this.routeList = this.routeList.sort((a: any, b: any) => a.routeName - b.routeName)
    } catch (e) {
        console.error(e)
    }
}

updateData(item: any) {
  this.isUpdate = true
  this.isAdd = false
  //console.log(item)
  this.vehicleNo=item?.vehicle?.vehicleNo  
}

columnDefs: ColDef[] = [
  { field: 'wc_name', headerName: 'Wc Name', unSortIcon: true,resizable: true},
  { field: 'vehicle_vehicleNo', headerName: 'Vehicle No.', unSortIcon: true,resizable: true},
  { field: 'vehicle_type', headerName: 'Vehicle Type', unSortIcon: true,resizable: true},
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
  paginationPageSize: 25,
  rowStyle: { background: '#e2e8f0' },
  copyHeadersToClipboard:true,
  enableRangeSelection:true,
  frameworkComponents: {
    imageCellRenderer: ImageCellRendererComponent,
    activeTripActionRenderer: ActiveTripActionRendererComponent
  }
}
rowData = [
  { vehicle_vehicleNo: 'Vechile 2023051', vehicle_type: 'LCV', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5',tripEndReading: '120.6', vehicle_starttime: '2023-05-19 06:00:00', trip_start_reading_image : "" }
];

columnDefsComp: ColDef[] = [
  { field: 'wc_name', headerName: 'Wc Name', unSortIcon: true,resizable: true},
  { field: 'vehicle_vehicleNo', headerName: 'Vehicle No.', unSortIcon: true,resizable: true,},
  { field: 'vehicle_type', headerName: 'Vehicle Type', unSortIcon: true,resizable: true},
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
  paginationPageSize: 25,
  rowStyle: { background: '#e2e8f0' },
  frameworkComponents: {
    imageCellRenderer: ImageCellRendererComponent,
    activeTripActionRenderer: ActiveTripActionRendererComponent
  }
}
rowDataComp = [
  { vehicle_vehicleNo: 'Vechile 2023051',vehicle_type:'LCV',driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5', vehicle_starttime: '2023-05-19 06:00:00', updatedDate: '2023-05-19 06:00:00', trip_start_reading_image : "", trip_end_reading_image: ""}
];
wetWeightCal(){
  const temp= this.form.value.grossWeightValue
  const temp1= this.form.value.unloadwetWeightValue
  this.form.controls.wetWeightValue.setValue(temp-temp1)  ;
  }

  allVehicleNos : any = []
  allVehicleResponse : any = []
  lastkeydown1: number = 0;
  getAllWcVehicle(){
    this.allVehicleNos = []
    this.allVehicleResponse = []
    let wcId:any = 0;
    if(localStorage.getItem('role') == 'wcuser'){
        wcId = localStorage.getItem('wcId')
    }
    this.service.getAllWcVehicle(wcId).subscribe( response => {
      this.allVehicleResponse = response     
    })
  }


  getVehicleNumberAuto($event:any){
    let vehicleShortNo = (<HTMLInputElement>document.getElementById('vehicleNumber')).value;
    if (vehicleShortNo.length > 2) {
      if ($event.timeStamp - this.lastkeydown1 > 200) {
        this.allVehicleNos = this.searchFromArray(this.allVehicleResponse, vehicleShortNo);
      }
    }
  }
  searchFromArray(arr:any[], regex:string) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
  };

}

