import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-compost-material-action-renderer',
  template : `
    <button (click)="fillEditForm()" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
  `
})
export class CompostMaterialActionRendererComponent implements ICellRendererAngularComp {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  constructor() {}

  fillEditForm() {

    const wcElement = document.querySelector('#wcId') as HTMLSelectElement;
    wcElement.value = this.params.data.response_data.wc.wcId;

    const noOfPacketsIssueElement = document.querySelector('#noOfPacketsIssue') as HTMLInputElement;
    noOfPacketsIssueElement.value = this.params.data.response_data.noOfPacketsIssue;

    const unitIdElement = document.querySelector('#unitId') as HTMLSelectElement;
    unitIdElement.value = this.params.data.response_data.packageWtType;

    const priceElement = document.querySelector('#price') as HTMLInputElement;
    priceElement.value = this.params.data.response_data.price;

    const addBtnParentElement = document.querySelector('#addBtnParent') as HTMLDivElement;
    addBtnParentElement.classList.add('d-none');
    const updateBtnParentElement = document.querySelector('#updateBtnParent') as HTMLDivElement;
    updateBtnParentElement.classList.remove('d-none');
  }

}
