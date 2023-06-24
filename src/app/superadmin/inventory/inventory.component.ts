import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup,FormsModule} from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['../../common.css', './inventory.component.css'],
  providers: [DatePipe]
})
export class InventoryComponent implements OnInit {

  constructor(private service: CommonService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.getItemName()
    this.getItemcategory()
   //this.getList()
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
  responseData:any
  categoryName:any
  inventoryList: any = []
  itemIssueList: any = []
  itemIssueResponse: any
  itemStockList: any = []
  itemStockResponse: any
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
    unitId: new FormControl,
    uploadBill: new FormControl,
    issueDate: new FormControl,
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
 unitList:any=[]
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
            itemQuantity: item.itemQuantity+" "+item.unit.unit,
            itemCost: '₹ '+item.itemCost,
            uploadBill:item.uploadBill,
            purchaseDate:  this.datePipe.transform(item.purchaseDate, 'yyyy-MM-dd HH:MM:ss'),//formatDate(item.createdDate, 'yyyy/MM/dd HH:MM:ss', 'en'),
            description:item.description
          };
        });
       console.log("itemPurchaseList",this.itemPurchaseList) 
       console.log("rowDataPurchase",rowDataPurchase)
       this.rowDataPurchase=rowDataPurchase;
        
      }
    );
    this.service.getAllItemIssue().subscribe(
      data => {
        this.itemIssueResponse = data
        this.itemIssueList = this.itemIssueResponse
        const rowDataIssue =   this.itemIssueList.map((item: { itemName: any; unit: any; issueQuantity: any; issueDate: any; createdDate: any; updateDate:any; }) => {
         
          return {
            itemName: item.itemName.itemname,
            //unit: 0,
            itemQuantity: item.issueQuantity+" "+item.unit.unit,
            createdDate: item.createdDate
            
          };
        });
       console.log("itemIssueList",this.itemIssueList)
       console.log("rowData",rowDataIssue)
       this.rowDataIssue=rowDataIssue;
        
      }
    );   
    this.service.getAllItemIssue().subscribe(
      data => {
        this.itemStockResponse = data
        this.itemStockList = this.itemIssueResponse
        const rowDataStock =   this.itemStockList.map((item: { itemName: any; unit: any; issueQuantity: any; issueDate: any; createdDate: any; updateDate:any; }) => {
         
          return {
            itemName: item.itemName.itemname,
            //unit: 0,
            itemQuantity: item.issueQuantity+" "+item.unit.unit       
            
          };
        });
       console.log("itemStockList",this.itemStockList)
       console.log("rowDataStock",rowDataStock)
       this.rowDataStock=rowDataStock;
     
      }
    );   
    this.service.getAllUnit().subscribe(
      data=>{
        this.unitList=data
      }
    );
    }
  itemCategoryList: any = []
  itemNameList: any= []
 

 
  async getItemPurchaseList() {
    try {
            this.inventoryList = await this.service.get(`/inventory/getAllItemPurchase`)
            this.inventoryList = this.inventoryList.sort((a: any, b: any) => a.itemCategoryName - b.itemCategoryName)
    } catch (e) {
            console.error(e)
    }
}
async getItemIssueList() {
  try {
          this.itemIssueList = await this.service.get(`/inventory/getAllItemIssuse`)
          this.itemIssueList = this.itemIssueList.sort((a: any, b: any) => a.itemname - b.itemname)
  } catch (e) {
          console.error(e)
  }
}
  async addItemPurchase() {
   try {
     const category = this.itemCategoryList[this.itemCategoryList.findIndex((e: any) => e.itemCategoryId == this.form.value.itemCategoryId)]  //this.form.value.itemCategoryId
     const item = this.itemNameList[this.itemNameList.findIndex((e: any) => e.itemId == this.form.value.itemId)]
     const unit= this.unitList[this.unitList.findIndex((e:any)=>e.unitId==this.form.value.unitId)]
     console.log(this.form.value.itemId)
     console.log(this.form.value.unitId)
      const data = {
                        //"itemCategoryId":this.form.value.itemCategoryId,
                        //"itemId":this.form.value.itemId,
                       // "itemname": this.form.value.itemName,
                        "itemQuantity":this.form.value.itemQuantity,
                        "description": this.form.value.description,
                        "itemCategory": category,
                        "itemName": item,
                         "unit": unit,
                         "itemCost": this.form.value.itemCost,
                         "purchaseDate": this.datePipe.transform(this.form.value.itemPurchaseDate, 'yyyy-MM-dd HH:MM'),          //this.form.value.itemPurchaseDate,
                         "uploadBill": this.form.value.uploadBill
             
                      }
                      
                      
                      console.log(data)
                      // await this.service.post(`/inventory/addItemPurchase`, data)
                      this.service.addItemPurchase(data).subscribe(
                        data=>{
                          window.alert("Item purchase data saved successfully!!")
                          this.service.getAllItemPurchase().subscribe(
                            data => {
                              this.itemPurchaseResponse = data
                              this.itemPurchaseList = this.itemPurchaseResponse
                              const rowDataPurchase =   this.itemPurchaseList.map((item: { itemCategory: any; itemName: any; unit: any; itemQuantity: any; purchaseDate: any; itemCost:any;uploadBill:any;description:any; createdDate: any; updateDate:any; }) => {
                               
                                return {
                                  itemCategoryName: item.itemCategory.categoryName,
                                  itemName: item.itemName.itemname,
                                  unit: 0,
                                  itemQuantity: item.itemQuantity+" "+item.unit.unit,
                                  itemCost: item.itemCost,
                                  uploadBill:item.uploadBill,
                                  purchaseDate:  this.datePipe.transform(item.purchaseDate, 'yyyy-MM-dd HH:MM:ss'),//formatDate(item.createdDate, 'yyyy/MM/dd HH:MM:ss', 'en'),
                                  description:item.description
                                };
                              });
                             console.log("itemPurchaseList",this.itemPurchaseList) 
                             console.log("rowDataPurchase",rowDataPurchase)
                             this.rowDataPurchase=rowDataPurchase;
                              
                            }
                          );
                        }
                      );
                      this.form.reset()
                      this.getItemPurchaseList()
                    } catch (e) {
                      console.error(e)
                    }

    }

    async addItemIssue() {
      try {
        //const category = this.itemCategoryList[this.itemCategoryList.findIndex((e: any) => e.itemCategoryId == 3)]  //this.form.value.itemCategoryId
        const item = this.itemNameList[this.itemNameList.findIndex((e: any) => e.itemId == this.form.value.itemId)]
        const unit= this.unitList[this.unitList.findIndex((e:any)=>e.unitId==this.form.value.unitId)]
         const data = {
                           //"itemCategoryId":this.form.value.itemCategoryId,
                           //"itemId":this.form.value.itemId,
                          // "itemname": this.form.value.itemName,
                           "issueQuantity":this.form.value.itemQuantity,
                           //"description": this.form.value.description,
                           //"itemCategory": category,
                           "itemName": item,
                            "unit": unit,
                           // "itemCost": this.form.value.itemCost,
                            "issueDate": this.datePipe.transform(this.form.value.issueDate, 'yyyy-MM-dd HH:MM'), //this.form.value.issueDate,
                            //"uploadBill": this.form.value.uploadBill
                
                         }
                         console.log(data)
                        //  await this.service.post(`/inventory/addItemIssuse`, data)
                        this.service.addItemIssue(data).subscribe(
                          data=>{
                            window.alert("Item issued successfully!!")
                            this.service.getAllItemIssue().subscribe(
                              data => {
                                this.itemIssueResponse = data
                                this.itemIssueList = this.itemIssueResponse
                                const rowDataIssue =   this.itemIssueList.map((item: { itemName: any; unit: any; issueQuantity: any; issueDate: any; createdDate: any; updateDate:any; }) => {
                                 
                                  return {
                                    itemName: item.itemName.itemname,
                                    //unit: 0,
                                    itemQuantity: item.issueQuantity+" "+item.unit.unit,
                                    createdDate: item.createdDate
                                    
                                  };
                                });
                               console.log("itemIssueList",this.itemIssueList)
                               console.log("rowData",rowDataIssue)
                               this.rowDataIssue=rowDataIssue;
                                
                              }
                            );
                          }
                        );
                         
                         this.form.reset()
                         this.getItemIssueList()
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

getItemNameyByCategoryId(){
  console.log(this.form.value.itemId)
  this.service.getWcById(this.form.value.itemId).subscribe(
          data=>{
                  this.responseData=data
                  this.form.value.itemCategoryId=this.responseData.itemCategory.itemCategoryId
                  this.categoryName=this.responseData.itemCategory.categoryName
                  console.log(this.categoryName)
          }
  );
}

getAllItemNameyByCategoryId(){
  console.log(this.form.value.itemCategoryId)
  this.service.getAllItemNameyByCategoryId(this.form.value.itemCategoryId).subscribe(
    data=>{
      this.responseData=data
      this.itemNameList=this.responseData
    }
  );
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
  { field: 'purchaseDate', headerName: 'Purchase Date', unSortIcon: true,resizable: true,},
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


columnDefsIssue: ColDef[] = [
 // { field: 'vehicle_starttime', headerName: 'SL. No', unSortIcon: true},
  { field: 'itemName', headerName: 'Item Name', unSortIcon: true},
  { field: 'itemQuantity', headerName: 'Item Quantity', unSortIcon: true},
  { field: 'createdDate', headerName: 'Created Date', unSortIcon: true},
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



columnDefsStock: ColDef[] = [
  { field: 'itemName', headerName: 'Stock List', unSortIcon: true,resizable: true,},
  { },
  { },
  { },
  { field: 'itemQuantity', headerName: 'Quantity', unSortIcon: true,resizable: true,},
  
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
rowDataIssue = [];
rowDataStock = [];

}
