import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule} from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['../../common.css', './inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private service: CommonService, private formBuilder: FormBuilder) {
    this.getItemName()
    this.getItemcategory()
    this.getList()
   }
   isAdd: boolean = true
   isUpdate: boolean = false
   vehicleNo:any
   searchText: any;
  activeTripResponse: any
  activeTripList: any = []
  itemPurchaseList: any = []
  itemPurchaseResponse: any
  vehcileDataResponse: any
  tripStartButton: boolean = false
  tripEndButton: boolean = false
  grossWeightCapturedButton: boolean = false
  dryButton: boolean = false
  wetWeightCapturedButton: boolean = false
  tripResponse: any
  errorResponse:any
  inventorylist: any = []
  form = new FormGroup({
    itemPurchaseId: new FormControl,
    itemCategoryId: new FormControl,
    itemId: new FormControl,
    itemName: new FormControl,
    itemQuantity: new FormControl,
    itemCost: new FormControl,
    category: new FormControl,
    item : new FormControl,
    description: new FormControl,
    unit: new FormControl,
    uploadBill: new FormControl,
    itemPurchaseDate: new FormControl
});
editForm = new FormGroup({
    itemCategoryId: new FormControl,
    itemId: new FormControl,
    itemName: new FormControl,
    itemQuantity: new FormControl,
    itemCost: new FormControl,
    category: new FormControl,
    item : new FormControl,
    description: new FormControl
  })
 
  ngOnInit() {
   
    this.service.getAllItemPurchase().subscribe(
      data => {
        this.itemPurchaseResponse = data
        this.itemPurchaseList = this.itemPurchaseResponse
        const rowDataPurchase =   this.itemPurchaseList.map((item: { itemCategory: any; itemName: any; unit: any; itemQuantity: any; purchaseDate: any; itemCost:any;uploadBill:any;description:any; createdDate: any; updateDate:any; }) => {
         
          return {
            itemCategoryName: item.itemCategory.categoryName,
            itemName: item.itemName.itemname,
            unit: 0,
            itemQuantity: item.itemQuantity,
            itemCost: item.itemCost,
            uploadBill:item.uploadBill,
            createDate: item.createdDate,
            description:item.description
          };
        });
       console.log("InActiveList",this.itemPurchaseList)
       console.log("rowData",rowDataPurchase)
       this.rowDataPurchase=rowDataPurchase;
        
      }
    );
    // this.setVehicleNumber();    
  }
  itemCategoryList: any = []
  itemNameList: any= []
 

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
        this.itemPurchaseResponse = data
        this.itemPurchaseList = this.itemPurchaseResponse.data
      }
    );
  }
  async getList() {
    try {
            this.inventorylist = await this.service.get(`/inventory/getAllItemPurchase`)
            this.inventorylist = this.inventorylist.sort((a: any, b: any) => a.itemCategoryName - b.itemCategoryName)
    } catch (e) {
            console.error(e)
    }
}
  async addItemPurchase() {
   try {
     const category = this.itemCategoryList[this.itemCategoryList.findIndex((e: any) => e.itemCategoryId == this.form.value.itemCategoryId)]
     const item = this.itemNameList[this.itemNameList.findIndex((e: any) => e.itemId == this.form.value.itemId)]
      const data = {
                        //"itemCategoryId":this.form.value.itemCategoryId,
                        //"itemId":this.form.value.itemId,
                       // "itemname": this.form.value.itemName,
                        "itemQuantity":this.form.value.itemQuantity,
                        "description": this.form.value.description,
                        "itemCategory": category,
                        "itemName": item,
                         "unit": "",
                         "itemCost": this.form.value.itemCost,
                         "purchaseDate": this.form.value.itemPurchaseDate,
                         "uploadBill": this.form.value.uploadBill
             
                      }
                      console.log(data)
                      await this.service.post(`/inventory/addItemPurchase`, data)
                      this.form.reset()
                      this.getList()
                    } catch (e) {
                      console.error(e)
                    }

    }
    cancel() {
      this.isAdd = true
      this.isUpdate = false
      this.form.reset()
}

    updateWcc() {
      console.log(this.form.value)
      // this.service.updateSubGood(this.form.value,this.subGoodsId).subscribe(
      //         data => {
      //                 window.alert("SubGood data updated successfully!!")
      //                 this.isAdd = true
      //                 this.isUpdate = false
      //                 this.getList()
      //                 this.form.reset()
      //         },
      //         error => { 
      //                 window.alert("something went wrong")
      //         }
      // );

}

 


  async getItemcategory() {
    try {
            this.itemCategoryList = await this.service.get(`/inventory/getAllItemCategory`)
            this.itemCategoryList = this.itemCategoryList.sort((a: any, b: any) => a.routeName - b.routeName)
    } catch (e) {
            console.error(e)
    }
}
async getItemName() {
  try {
          this.itemNameList = await this.service.get(`/inventory/getAllItemName`)
          this.itemNameList = this.itemNameList.sort((a: any, b: any) => a.itemName - b.itemName)
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
columnDefsPurchase: ColDef[] = [
  { field: 'itemCategoryName', headerName: 'Item category', unSortIcon: true,resizable: true,},
  { field: 'itemName', headerName: 'Item Name', unSortIcon: true,resizable: true,},
  { field: 'itemQuantity', headerName: 'Item Quantity', unSortIcon: true,resizable: true, },
  { field: 'itemCost', headerName: 'Item Cost', unSortIcon: true,resizable: true, },
  { field: 'uploadBill', headerName: 'Bill', unSortIcon: true,resizable: true, },
  { field: 'description', headerName: 'Description', unSortIcon: true,resizable: true,},
  { field: 'createdDate', headerName: 'Created Date', unSortIcon: true,resizable: true,},
  { headerName: 'Edit', width: 125, sortable: false, filter: false,
    cellRenderer: (data: any) => {
     return `
      <button class="btn btn-primary btn-sm" (click)="updateData(x)">
        <i class="fa-solid fa-edit"></i>
      </button>
      <button class="btn btn-danger btn-sm">
      <i class="fa-solid fa-trash-alt"></i>
    </button>
     `; 
    }
  }
]; 


columnDefs: ColDef[] = [
  { field: 'vehicle_starttime', headerName: 'SL. No', unSortIcon: true},
  { field: 'vehicle_vehicleNo', headerName: 'Item Name', unSortIcon: true},
  { field: 'driver_driverName', headerName: 'Item Quantity', unSortIcon: true},
  { field: 'vehicle_starttime', headerName: 'Created Date', unSortIcon: true},
  { headerName: 'Edit', width: 125, sortable: false, filter: false,
    cellRenderer: (data: any) => {
     return `
      <button class="btn btn-primary btn-sm">
        <i class="fa-solid fa-edit"></i>
      </button>
    
     `; 
    }
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
  enableRangeSelection:true
}
rowData = [
  { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5',tripEndReading: '120.6', vehicle_starttime: '2023-05-19 06:00:00' }
];



columnDefsComp: ColDef[] = [
  { field: 'vehicle_vehicleNo', headerName: 'Stock List', unSortIcon: true,resizable: true,},
  { },
  { },
  { },
  { },
  { field: 'tripEndReading', headerName: 'Quantity', unSortIcon: true,resizable: true,},
  
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
  paginationPageSize: 20,
  rowStyle: { background: '#e2e8f0' }
}
rowDataPurchase = [
  { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5', vehicle_starttime: '2023-05-19 06:00:00' }
];


}
