import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDyActiveTripModalComponent } from '../edit-dy-active-trip-modal/edit-dy-active-trip-modal.component';

@Component({
  selector: 'app-edit-dy-active-trip-action-renderer',
  template: `
    <button (click)="openModal()" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button>
  `
})
export class EditDyActiveTripActionRendererComponent {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(EditDyActiveTripModalComponent);
    modalRef.componentInstance.data = this.params.data;
  }

}
