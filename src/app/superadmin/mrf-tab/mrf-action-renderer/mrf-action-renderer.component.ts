import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-mrf-action-renderer',
  template: `
    <button (click)="fillEditForm()" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></button>
  `
})
export class MrfActionRendererComponent implements ICellRendererAngularComp {

  private params: any;

  agInit(params: any): void {
    this.params = params;
    console.log(this.params)
  }

  refresh(): boolean {
    return false;
  }

  constructor() {}

  fillEditForm() {
    const data = this.params.data;
    (document.querySelector(`input[id="mrf_transactionId"]`) as HTMLInputElement).value = data.mrfTransactionId;
    (document.querySelector(`input[id="mrf_quantum"]`) as HTMLInputElement).value = data.quntaum;
    (document.querySelector(`input[id="mrf_inert"]`) as HTMLInputElement).value = data.inert_material;
    (document.querySelector(`input[id="mrf_desc"]`) as HTMLInputElement).value = data.description;
    const selectElement: any = document.getElementById('mrf_goods') as HTMLElement;
    const desiredInnerText = data.goods_name;
    let foundOption = null;
    for (let i = 0; i < selectElement.options.length; i++) {
      const option = selectElement.options[i];
      if (option.innerText === desiredInnerText) {
        foundOption = option;
        break;
      }
    }
    if (foundOption) {
      foundOption.selected = true;
      const event = new Event('change');
      selectElement.dispatchEvent(event);
    }
    setTimeout(() => {
      const selectElement2: any = document.getElementById('mrf_sub_goods') as HTMLElement;
      const desiredInnerText2 = data.sub_goods_name;
      let foundOption2 = null;
      for (let i = 0; i < selectElement2.options.length; i++) {
        const option = selectElement2.options[i];
        if (option.innerText === desiredInnerText2) {
          foundOption2 = option;
          break;
        }
      }
      if (foundOption2) {
        foundOption2.selected = true;
        const event = new Event('change');
        selectElement2.dispatchEvent(event);
      }
    }, 1000);

    const addBtn = document.querySelector('.add-mrf-btn') as HTMLElement;
    addBtn.classList.toggle('d-none');

    const updateBtn = document.querySelector('.update-mrf-btn') as HTMLElement;
    updateBtn.classList.toggle('d-none');
  }

}
