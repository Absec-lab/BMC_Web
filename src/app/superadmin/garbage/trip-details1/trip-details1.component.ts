import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-trip-details1',
  templateUrl: './trip-details1.component.html',
  styleUrls: ['../../../common.css','./trip-details1.component.css']
})
export class TripDetails1Component {
  
  columnDefs: ColDef[] = [
    { field: 'vehicle_no', headerName: 'Vehicle No.', unSortIcon: true},
    { field: 'driver_name', headerName: 'Driver Name', unSortIcon: true},
    { field: 'helper_name', headerName: 'Helper Name', unSortIcon: true},
    { field: 'route', headerName: 'Route', unSortIcon: true},
    { field: 'initial_reading', headerName: 'Initial Reading', unSortIcon: true},
    { field: 'vehicle_start_time', headerName: 'Vehicle Start Time', unSortIcon: true},
    { headerName: 'Edit', width: 125, sortable: false, filter: false,
      cellRenderer: (data: any) => {
       return `
        <button class="btn btn-primary btn-sm">
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
  };

  gridOptions = {
    defaultColDef: {
      ...this.defaultColDef
    },
    pagination: true,
    paginationPageSize: 10,
    rowStyle: { background: '#e2e8f0' }
  }

  rowData = [
    { vehicle_no: 'Vechile 2023051', driver_name: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-19 06:00:00' },
    { vehicle_no: 'Vechile 2023052', driver_name: 'Tanay Chaudhry', helper_name: 'Rupal Sura', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-18 06:00:00' },
    { vehicle_no: 'Vechile 2023053', driver_name: 'Anand Palan', helper_name: 'Nawab Dua', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-17 06:00:00' },
    { vehicle_no: 'Vechile 2023054', driver_name: 'Iqbal Bir', helper_name: 'Pranay Dey', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-16 06:00:00' },
    { vehicle_no: 'Vechile 2023055', driver_name: 'Ujwal Kapur', helper_name: 'Zaad Gara', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-15 06:00:00' },
    { vehicle_no: 'Vechile 2023051', driver_name: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-19 06:00:00' },
    { vehicle_no: 'Vechile 2023052', driver_name: 'Tanay Chaudhry', helper_name: 'Rupal Sura', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-18 06:00:00' },
    { vehicle_no: 'Vechile 2023053', driver_name: 'Anand Palan', helper_name: 'Nawab Dua', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-17 06:00:00' },
    { vehicle_no: 'Vechile 2023054', driver_name: 'Iqbal Bir', helper_name: 'Pranay Dey', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-16 06:00:00' },
    { vehicle_no: 'Vechile 2023055', driver_name: 'Ujwal Kapur', helper_name: 'Zaad Gara', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-15 06:00:00' },
    { vehicle_no: 'Vechile 2023051', driver_name: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-19 06:00:00' },
    { vehicle_no: 'Vechile 2023052', driver_name: 'Tanay Chaudhry', helper_name: 'Rupal Sura', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-18 06:00:00' },
    { vehicle_no: 'Vechile 2023053', driver_name: 'Anand Palan', helper_name: 'Nawab Dua', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-17 06:00:00' },
    { vehicle_no: 'Vechile 2023054', driver_name: 'Iqbal Bir', helper_name: 'Pranay Dey', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-16 06:00:00' },
    { vehicle_no: 'Vechile 2023055', driver_name: 'Ujwal Kapur', helper_name: 'Zaad Gara', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-15 06:00:00' },
    { vehicle_no: 'Vechile 2023051', driver_name: 'Faraz Choudhry', helper_name: 'Bahadur Basu', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-19 06:00:00' },
    { vehicle_no: 'Vechile 2023052', driver_name: 'Tanay Chaudhry', helper_name: 'Rupal Sura', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-18 06:00:00' },
    { vehicle_no: 'Vechile 2023053', driver_name: 'Anand Palan', helper_name: 'Nawab Dua', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-17 06:00:00' },
    { vehicle_no: 'Vechile 2023054', driver_name: 'Iqbal Bir', helper_name: 'Pranay Dey', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-16 06:00:00' },
    { vehicle_no: 'Vechile 2023055', driver_name: 'Ujwal Kapur', helper_name: 'Zaad Gara', route: 'Patia', initial_reading: '100.5', vehicle_start_time: '2023-05-15 06:00:00' },
  ];

}
