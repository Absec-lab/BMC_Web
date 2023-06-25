import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditActiveTripModalComponent } from '../edit-active-trip-modal/edit-active-trip-modal.component';

@Component({
  selector: 'app-action-renderer',
  template: `
    <button (click)="openModal()" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button>
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

  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(EditActiveTripModalComponent);
    modalRef.componentInstance.data = this.params.data;
  }
}
