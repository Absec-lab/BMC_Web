import { Component } from '@angular/core';
import * as moment from 'moment';
declare const $: any;

@Component({
  selector: 'app-trip-status-report',
  templateUrl: './trip-status-report.component.html',
  styleUrls: ['../../common.css', './trip-status-report.component.css']
})
export class TripStatusReportComponent {

  reOpenModal(modalID: any) {
    $(modalID).modal('toggle');
  } 

  ngOnInit() {
    const dateElement = document.querySelector('#filter_date') as HTMLInputElement;
    dateElement.value = moment(new Date()).format('YYYY-MM-DD');
  }

  fetchWCForZone() {

  }

}
