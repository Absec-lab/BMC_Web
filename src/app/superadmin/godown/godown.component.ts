import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-godown',
  templateUrl: './godown.component.html',
  styleUrls: ['../../common.css', './godown.component.css']
})
export class GodownComponent {

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

  rowData: any = [];

}
