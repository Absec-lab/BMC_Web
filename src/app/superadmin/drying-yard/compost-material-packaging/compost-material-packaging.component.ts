import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import * as moment from 'moment';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';
import { CompostMaterialActionRendererComponent } from '../compost-material-action-renderer/compost-material-action-renderer.component';
import { HttpClient } from '@angular/common/http';

export class WetType{
  type:any
}

@Component({
  selector: "app-compost-material-packaging",
  templateUrl: "./compost-material-packaging.component.html",
  styleUrls: [
    "../../../common.css",
    "./compost-material-packaging.component.css",
  ],
})
export class CompostMaterialPackagingComponent implements OnInit {
  public isAdd: boolean = true;
  public isUpdate: boolean = false;
  wcList: any = [];
  wcResponse: any;
  dryingyardResponse: any;
  dryingyardList: any = [];
  wetTypeList: any = [];
  list: any = [];
  goodsList: any = [];
  goodsName: any;
  subGoodsId: any;
  mrfTrnsId: any;
  mrfResponse: any;
  mrfList: any;
  responseData: any;
  isActive: any;
  composePackingList: any = [];
  packagingType: any = [5, 10, 15, 20];
  wcId: any = 0;

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
      actionRenderer: CompostMaterialActionRendererComponent,
    },
  };

  columnDefs: ColDef[] = [
    { field: 'wc_name', headerName: 'WC Name', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'packaging_weight_type', headerName: 'Packaging Wt Type', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'packets_issued', headerName: 'No. of Packets Issued', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'total_weight', headerName: 'Total Weight', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'amount_per_kg', headerName: 'Amount/KG', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'total_amount', headerName: 'Total Amount', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'created_date', headerName: 'Created Date', unSortIcon: true, resizable: true, filter: true, width: 250}, 
    { field: 'action', headerName: 'Action', unSortIcon: false, resizable: true, filter: false, cellRenderer: 'actionRenderer'}, 
  ];

  rowData: any = [];

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

  constructor(
    private service: CommonService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private httpClient: HttpClient
  ) {
    this.wcId = localStorage.getItem("wcId");
    this.getList();
    this.getAllWC();
    this.getAllDryingYard();
  }
  ngOnInit() {
    this.service.getAllMrf(parseInt(this.wcId)).subscribe((data) => {
      this.mrfResponse = data;
      this.mrfList = this.mrfResponse;
      // console.log(this.mrfList);
    });
    this.service.getAllUnit().subscribe((data) => {
      this.wetTypeList = data;
    });
    this.service.getAllCompostPacking().subscribe((data) => {
      this.composePackingList = data;
      // console.log(this.composePackingList)

      this.rowData = [];

      this.composePackingList.forEach((item: any) => {
        this.rowData.push({
          wc_name: item?.wc?.wcName,
          packaging_weight_type: item.packageWtType,
          packets_issued: item.noOfPacketsIssue,
          total_weight: (item.totalWeight) ? item.totalWeight : 0,
          amount_per_kg: (item.amountPerKg) ? item.amountPerKg : 0,
          total_amount: item.totalAmount,
          created_date: moment(new Date(item.createdDate)).format("DD/MM/YYYY"),
          response_data: item
        });
      });
    });
    // console.log(this.list);
  }
  form = new FormGroup({
    dryingPackgingId: new FormControl(),
    dryingyardId: new FormControl(),
    wcId: new FormControl(),
    dryCompostWt: new FormControl(),
    npkRatio: new FormControl(),
    date: new FormControl(),
    description: new FormControl(),
    wc: new FormControl(),
    dryingyard: new FormControl(),
    isActive: new FormControl(),
    unitId: new FormControl(),
    noOfPacketsIssue: new FormControl(),
    price: new FormControl(""),
  });
  editForm = new FormGroup({
    dryingPackgingId: new FormControl(),
    dryingyardId: new FormControl(),
    wcId: new FormControl(),
    dryCompostWt: new FormControl(),
    npkRatio: new FormControl(),
    date: new FormControl(),
    description: new FormControl(),
    wc: new FormControl(),
    dryingyard: new FormControl(),
    isActive: new FormControl(),
  });
  getAllWC() {
    this.service.getAllWcData().subscribe((data) => {
      this.wcResponse = data;
      this.wcList = this.wcResponse;
      //console.log(this.goodList)
    });
  }
  getAllDryingYard() {
    this.service.getAllDryingYard().subscribe((data) => {
      this.dryingyardResponse = data;
      //console.log(this.subGoodResponse)
      this.dryingyardList = this.dryingyardResponse;
    });
  }

  async getList() {
    try {
      this.list = await this.service.get(`/inventory/getAllCompostWtmt`);
      // this.goodsList = await this.service.get(`/zone/getAllGoods`)
      //this.list = this.list.sort((a: any, b: any) => a.zoneName - b.zoneName)
    } catch (e) {
      console.error(e);
    }
  }
  saveMrf() {
    const wc =
      this.wcList[
        this.wcList.findIndex((e: any) => e.wcId == this.form.value.wcId)
      ];
    const dryingyard =
      this.dryingyardList[
        this.dryingyardList.findIndex(
          (e: any) => e.dryyardId == this.form.value.dryingyardId
        )
      ];
    // const unit= this.wetTypeList[this.wetTypeList.findIndex((e:any)=>e.unitId == this.form.value.unitId)]

    const packagingIssued = this.form.value.noOfPacketsIssue;
    const price = this.form.value.price;
    const wcID = this.form.value.wcId;
    const unitId = this.form.value.unitId;

    if (!wcID) {
      this.toastService.showWarning("WC name is required.");
      return;
    }
    if (!unitId) {
      this.toastService.showWarning("Packing weight type is required.");
      return;
    }
    if (!packagingIssued) {
      this.toastService.showWarning("No. of packaged issued is required.");
      return;
    }
    if (!price) {
      this.toastService.showWarning("Price per KG is required.");
      return;
    }

    const data = {
      compPackagingId: null,
      wc: {
        wcId: this.form.value.wcId,
      },
      packageWtType: this.form.value.unitId,
      noOfPacketsIssue: this.form.value.noOfPacketsIssue,
      amountPerKg: this.form.value.price,
    };
    //  console.log(data)
    this.service.saveCompostPacking(data).subscribe((data) => {
      this.toastService.showSuccess("Mo khata packing data has been saved.");
      this.service.getAllCompostPacking().subscribe((data) => {
        this.composePackingList = data;
        // console.log(this.composePackingList)
  
        this.rowData = [];
  
        this.composePackingList.forEach((item: any) => {
          this.rowData.push({
            wc_name: item?.wc?.wcName,
            packaging_weight_type: item.packageWtType,
            packets_issued: item.noOfPacketsIssue,
            total_weight: (item.totalWeight) ? item.totalWeight : 0,
            amount_per_kg: (item.amountPerKg) ? item.amountPerKg : 0,
            total_amount: item.totalAmount,
            created_date: moment(new Date(item.createdDate)).format("DD/MM/YYYY"),
            response_data: item
          });
        });
      });
    });
    this.form.reset();
    this.getList();
  }
  getGoodId() {
    console.log(this.form.value);
  }
  async remove(id: string) {
    try {
      const res = await this.service.delete(`/zone/deleteMrf/${id}`);
      this.getList();
    } catch (e) {
      console.error(e);
    }
  }
  updateData(item: any) {
    this.isUpdate = true;
    this.isAdd = false;
    console.log(item);
    console.log(item.goodssubId);
    this.goodsName = item.goods.goodsName;
    this.form.patchValue({
      isActive: true,
    });
    this.subGoodsId = item.goodssubId;
    // this.service.getZoneAllData().subscribe(
    //         async data => {
    //                 this.goodsList = await this.service.get(`/zone/getAllGoods`)
    //         }
    // );
  }
  cancel() {
    this.isAdd = true;
    this.isUpdate = false;
    this.form.reset();
  }

  updateMrf() {

    const wcElement = document.querySelector('#wcId') as HTMLSelectElement;
    const noOfPacketsIssueElement = document.querySelector('#noOfPacketsIssue') as HTMLInputElement;
    const unitIdElement = document.querySelector('#unitId') as HTMLSelectElement;
    const priceElement = document.querySelector('#price') as HTMLInputElement;
    const compPackagingIdElement = document.querySelector('#compPackagingId') as HTMLInputElement;

    const packagingIssued =  noOfPacketsIssueElement.value;
    const price = priceElement.value;
    const wcID = wcElement.value;
    const unitId = unitIdElement.value;

    if (!wcID) {
      this.toastService.showWarning("WC name is required.");
      return;
    }
    if (!unitId) {
      this.toastService.showWarning("Packing weight type is required.");
      return;
    }
    if (!packagingIssued) {
      this.toastService.showWarning("No. of packaged issued is required.");
      return;
    }
    if (!price) {
      this.toastService.showWarning("Price per KG is required.");
      return;
    }

    const data = {
      compPackagingId: compPackagingIdElement.value,
      wc: {
        wcId: wcID,
      },
      packageWtType: unitId,
      noOfPacketsIssue: packagingIssued,
      amountPerKg: price,
    };

    this.httpClient.put(this.service.environment.URL + '/inventory/updateCompostPackaging', data).subscribe(
      (data) => {
        this.toastService.showSuccess("Mrf data updated successfully!!");
        this.isAdd = true;
        this.isUpdate = false;
        this.getList();
        this.form.reset();

        this.service.getAllCompostPacking().subscribe((data) => {
          this.composePackingList = data;
          // console.log(this.composePackingList)
    
          this.rowData = [];
    
          this.composePackingList.forEach((item: any) => {
            this.rowData.push({
              wc_name: item?.wc?.wcName,
              packaging_weight_type: item.packageWtType,
              packets_issued: item.noOfPacketsIssue,
              total_weight: (item.totalWeight) ? item.totalWeight : 0,
              amount_per_kg: (item.amountPerKg) ? item.amountPerKg : 0,
              total_amount: item.totalAmount,
              created_date: moment(new Date(item.createdDate)).format("DD/MM/YYYY"),
              response_data: item
            });
          });
        });
      },
      (error) => {
        this.toastService.showError("something went wrong");
      }
    );
  }
}


