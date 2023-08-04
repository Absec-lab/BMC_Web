import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-godown',
  templateUrl: './godown.component.html',
  styleUrls: ['../../common.css', './godown.component.css']
})
export class GodownComponent {
  constructor(private service: CommonService, private formBuilder: FormBuilder, private datePipe: DatePipe, private toastService: ToastService) {
    this.getStockData();
  }

  isAdd: boolean = true
  isUpdate: boolean = false
  goodList: any = []
  goodResponse: any
  subGoodResponse: any
  subgoodList: any = []
  mrfGridList: any = []
  mrfGridResponse: any
  soldGridList: any = []
  soldGridResponse: any
  godownStockList: any = []
  soldList:any=[]
  goodsList: any = []
  goodsName: any
  subGoodsId: any
  mrfTrnsId: any
  mrfResponse: any
  mrfList: any
  isActive: any
  selectionMode = "multiple";
  wcId: any = 0;
  id: any = 0;
  vehicleNo: any
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
  errorResponse: any
  responseData: any
  categoryName: any
  inventoryList: any = []
  itemIssueList: any = []
  itemIssueResponse: any
  itemStockList: any = []
  totalCostP:any;
  itemStockResponse: any
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
    move_tts:new FormControl
  });


  stockData: any = [
    {
      item_name: '25 KG Packets',
      stock_count: 25,
      cost_per_kg: 50,
      total_cost: 1250
    },
    {
      item_name: '30 KG Packets',
      stock_count: 25,
      cost_per_kg: 50,
      total_cost: 1250
    },
    {
      item_name: '40 KG Packets',
      stock_count: 25,
      cost_per_kg: 50,
      total_cost: 1250
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true,
  };

  gridOptions = {
    defaultColDef: {
      ...this.defaultColDef,
    },
    pagination: true,
    paginationPageSize: 25,
    rowStyle: { background: "#e2e8f0" },
    copyHeadersToClipboard: true,
    enableRangeSelection: true,
    frameworkComponents: {
      actionRenderer: null,
    },
  };

  async getStockData() {
    try {
      let wcId = localStorage.getItem('role') != 'bmcadmin' ? this.wcId : 0
      this.godownStockList = await this.service.get(`/inventory/getAll/moKhata/stock/` + wcId)
      // this.goodsList = await this.service.get(`/zone/getAllGoods`)
      //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)

    } catch (e) {
      console.error(e)
    }
  }
  
  cancel() {
    this.isAdd = true
    this.isUpdate = false
    //this.form.reset()
  }
  columnDefs: ColDef[] = [
    { field: 'wc_name', headerName: 'WC/Drying Area Name', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'godown_name', headerName: 'Godown Name', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'vehicle_no', headerName: 'Vehicle No', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'driver_name', headerName: 'Driver Name', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'package_weight', headerName: 'Package Weight', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'package_cost', headerName: 'Package Cost', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'no_package', headerName: 'No Package', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'total_cost', headerName: 'Total Cost', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'check_no_packages', headerName: 'Check No. Packages', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'description', headerName: 'Description', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'created_date', headerName: 'Created Date', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'action', headerName: 'Action', unSortIcon: false, resizable: true, filter: false, cellRenderer: 'actionRenderer'}, 
  ];

  columnDefsComp: ColDef[] = [
    { field: 'wc_name', headerName: 'Wc Name', unSortIcon: true,resizable: true},
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
    paginationPageSize: 25,
    rowStyle: { background: '#e2e8f0' },
    frameworkComponents: {
     // imageCellRenderer: ImageCellRendererComponent,
      //activeTripActionRenderer: ActiveTripActionRendererComponent
    }
  }

  columnDefsSold: ColDef[] = [
    { field: 'goods_name', headerName: 'Goods Name', unSortIcon: true, resizable: true },
    { field: 'sub_goods_name', headerName: 'Sub-Goods Name', unSortIcon: true, resizable: true },
    { field: 'quntaum', headerName: 'Sold Qty', unSortIcon: true, resizable: true },
    { field: 'price_per_kg', headerName: 'Qty Per Price', unSortIcon: true, resizable: true },
    { field: 'cost', headerName: 'Total Cost', unSortIcon: true, resizable: true },
    { field: 'sold_to', headerName: 'Sold To', unSortIcon: true, resizable: true },    
    { field: 'description', headerName: 'Description', unSortIcon: true, resizable: true },
    { field: 'created_date', headerName: 'Created Date', unSortIcon: true, resizable: true },
    
    // {
    //   headerName: 'Edit', width: 125, sortable: false, filter: false,
    //   cellRenderer: (data: any) => {
    //     return `
    //   <button class="btn btn-primary btn-sm" (click)="this.updateData($event)">
    //     <i class="fa-solid fa-edit"></i>
    //   </button>
    //   <button class="btn btn-danger btn-sm">
    //     <i class="fa-solid fa-trash-alt"></i>
    //   </button>
    //  `;
    //   }
    // }
  ];
  rowDataSold=[];
  rowDataComp = [
    { vehicle_vehicleNo: 'Vechile 2023051', driver_driverName: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route_routeName: 'Patia', tripStartReading: '100.5', vehicle_starttime: '2023-05-19 06:00:00', updatedDate: '2023-05-19 06:00:00', trip_start_reading_image : "", trip_end_reading_image: ""}
  ];

  rowData: any = [];

}
