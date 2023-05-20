import { Component } from '@angular/core';

@Component({
  selector: 'app-pit-view',
  templateUrl: './pit-view.component.html',
  styleUrls: ['../../../common.css', './pit-view.component.css']
})
export class PitViewComponent {
  displayPopover() {
    const popoverItem = document.querySelector('.popover-item') as HTMLDivElement;
    popoverItem.classList.toggle('show');
  }
}
