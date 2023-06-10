import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-renderer',
  template: `
    <button (click)="onEditClick()" class="btn btn-primary btn-sm">
      <i class="fa-solid fa-edit"></i>
    </button>
  `
})
export class ActiveTripActionRendererComponent implements ICellRendererAngularComp {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  onEditClick(): void {
    const rowData = this.params.node.data;
    const vehicleNo = rowData.vehicle_vehicleNo;
    const tripTabElement = document.querySelector('#trip-tab') as HTMLDivElement;
    tripTabElement.click();
    const vehicleInput = document.querySelector('input[formControlName="vehicleNumber"]') as HTMLInputElement;
    vehicleInput.value = vehicleNo;
    const event = new Event('input', { bubbles: true });
    vehicleInput.dispatchEvent(event);
  }
}
