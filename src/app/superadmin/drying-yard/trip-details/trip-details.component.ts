import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule} from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ImageCellRendererComponent } from '../../image-cell-renderer/image-cell-renderer.component';
import { ModalService } from 'src/app/service/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDyActiveTripActionRendererComponent } from '../edit-dy-active-trip-action-renderer/edit-dy-active-trip-action-renderer.component';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['../../../common.css', './trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(private service: CommonService, private formBuilder: FormBuilder, private httpClient: HttpClient, private modalService: NgbModal) {
  
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
   
    // this.service.getAllHelper().subscribe(
    //   data=>{
    //      this.helperList=data
    //   }
    // );
    this.service.getAllActiveTripInGraveYard().subscribe(
      data => {
        this.activeTripResponse = data
        this.activeTripList = this.activeTripResponse.data
        console.log(this.activeTripList)
        const rowData =   this.activeTripList.map((item: any) => {
         
          return {
            vehicle_vehicleNo: item.vehicle.vehicleNo , 
            driver_driverName: item.driver.driverName,
            wetCompostWt: item.wetCompostWt,            
            vehicle_starttime: item.createdDate,
            wc_name:item.wc.wcName
          };
        });
       console.log("ActiveList",this.activeTripList)
       console.log("rowData",rowData)
       this.rowData=rowData;
      }
    );
    this.service.getAllCompletedTripInGraveYard().subscribe(
      data => {
        this.inActiveTripResponse = data
        this.inActiveTripList = this.inActiveTripResponse.data
        const rowDataComp =   this.inActiveTripList.map((item: any) => {
         
          return {
            vehicle_vehicleNo: item.vehicle.vehicleNo,
            driver_driverName: item.driver.driverName,
            wcName: item.wc.wcName,
            wetCompostWt: item.totalWt,
            watCompostWtInDryingYard: item.watCompostWtInDryingYard,
            updateDate: item.date
          };
        });
       console.log("Completed",this.inActiveTripList)
       console.log("rowData",rowDataComp)
       this.rowDataComp=rowDataComp;
        
      }
    );
    
    
  }
  routeList: any = []
 

  getActiveTrip() {
    this.service.getActiveTrip().subscribe(
      data => {
        this.activeTripResponse = data
        this.activeTripList = this.activeTripResponse.data
         console.log("ActiveList",this.activeTripList)
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

 

columnDefs: ColDef[] = [
  { field: 'wc_name', headerName: 'WC Name.', unSortIcon: true,resizable: true},
  { field: 'vehicle_vehicleNo', headerName: 'Vehicle No.', unSortIcon: true,resizable: true},
  { field: 'driver_driverName', headerName: 'Driver Name', unSortIcon: true,resizable: true},
  // { field: 'wetCompostWt', headerName: 'Wet Compost Wt', unSortIcon: true,resizable: true},
  { field: 'vehicle_starttime', headerName: 'Date', unSortIcon: true,resizable: true},
  { headerName: 'Edit', width: 125, sortable: false, filter: false, editable: false, colId: 'actions',
    cellRenderer: 'editDyActiveTripActionRenderer'
  }
];

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
    // imageCellRenderer: ImageCellRendererComponent,
    editDyActiveTripActionRenderer: EditDyActiveTripActionRendererComponent
  }
}
rowData = [
  { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry',  vehicle_starttime: '2023-05-19 06:00:00',wetCompostWt:'125.3' ,wc_name:"Pokhariput" }
];



columnDefsComp: ColDef[] = [
  { field: 'wcName', headerName: 'WC Name.', unSortIcon: true,resizable: true},
  { field: 'vehicle_vehicleNo', headerName: 'Vehicle No.', unSortIcon: true,resizable: true},
  { field: 'driver_driverName', headerName: 'Driver Name', unSortIcon: true,resizable: true},
  { field: 'wetCompostWt', headerName: 'Wet Compost Wt', unSortIcon: true,resizable: true},
  // { field: 'watCompostWtInDryingYard', headerName: 'Wet Compost Wt In Drying Yard', unSortIcon: true,resizable: true},
  { field: 'updateDate', headerName: 'Date', unSortIcon: true,resizable: true},
//  { headerName: 'Edit', width: 125, sortable: false, filter: false,
//     cellRenderer: (data: any) => {
//      return `
//       <button class="btn btn-primary btn-sm" (click)="updateData(x)">
//         <i class="fa-solid fa-edit"></i>
//       </button>
//       <button class="btn btn-danger btn-sm">
//       <i class="fa-solid fa-trash-alt"></i>
//     </button>
//      `; 
//     }
//   }
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
  { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', updatedDate: '2023-05-19 06:00:00', wetCompostWt:'125.3' ,wcName:"Pokhariput", watCompostWtInDryingYard:'102.3' }
];
wetWeightCal(){
  const temp= this.form.value.grossWeightValue
  const temp1= this.form.value.unloadwetWeightValue
  this.form.controls.wetWeightValue.setValue(temp-temp1)  ;
  }

 
 
 }
