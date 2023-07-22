import { Component } from '@angular/core';
import * as moment from 'moment';
import { ReportGenerate } from 'src/app/model/pit.model';
import { ReportService } from 'src/app/service/report.service';
declare const $: any;

@Component({
  selector: 'app-trip-status-report',
  templateUrl: './trip-status-report.component.html',
  styleUrls: ['../../common.css', './trip-status-report.component.css']
})
export class TripStatusReportComponent {

  zoneModalstatus : boolean = false;
  wcModalstatus : boolean = false;
  role:any = ''
  selectedZone:any = ''
  selectedWc:any = ''
  reportResponsePopup1Popup2:any[]=[]
  reportResponsePopup3:any[]=[]
  zoneMap = new Map()
  zoneDataArr : any = []
  wcDataArr : any = []
  tripDataArr : any = []
  reportPayload : ReportGenerate = {
    reportType: 'TRIP',
    type: '',
    wcId: 0,
    fromDate: '',
    toDate: '',
    reportName: 'TRIP'
  }

  reOpenModal(modalID: any) {
    $(modalID).modal('toggle');
  } 

  constructor(private service: ReportService){
    this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    const dateElement = document.querySelector('#filter_date') as HTMLInputElement;
    dateElement.value = moment(new Date()).format('YYYY-MM-DD');
     this.reportPayload.fromDate = dateElement.value+" 00:00:00"
     this.reportPayload.toDate = dateElement.value+" 00:00:00"
    // this.reportPayload.fromDate = "2023-07-19 00:00:00"
    // this.reportPayload.toDate = "2023-07-19 00:00:00"
    this.fetchReportData()
  }

  fetchReportData() {
    this.zoneDataArr = []
    this.reportPayload.fromDate =  (document.querySelector(`input[id="filter_date"]`) as HTMLInputElement).value +" 00:00:00"
    this.reportPayload.toDate =  (document.querySelector(`input[id="filter_date"]`) as HTMLInputElement).value +" 00:00:00"
      this.service.getTripReport(this.reportPayload)
            .subscribe((response) => {
             console.log(response);
           this.reportResponsePopup1Popup2 = response.response.TRIPRESPONSE_POPUP1_POUP2
           this.reportResponsePopup3 = response.response.TRIPRESPONSE_POPUP3
           const groupedByZone = this.groupBy(this.reportResponsePopup1Popup2, (popup1popup2:any) => popup1popup2.zoneName);
           for (let key of groupedByZone.keys()) {
            let totalVehicles : number = 0;
            let totalNoOfActiveTrip : number = 0;
            let totalNoOfCompletedTrip : number = 0;
               groupedByZone.get(key).map( (obj : any) => {
                    if(this.zoneDataArr.some((element:any) => element.get('zone') == key )){
                      this.zoneMap = new Map()
                      const existingzoneMap = this.zoneDataArr.filter((element:any) => element.get('zone') == key)[0];
                      this.zoneDataArr.pop(existingzoneMap)
                      totalVehicles = obj.numberOfVehicles + existingzoneMap.get('totalvehicle')
                      totalNoOfActiveTrip = obj.numberOfActiveTrip + existingzoneMap.get('totalActiveTrip')
                      totalNoOfCompletedTrip = obj.numberOfCompletedTrip + existingzoneMap.get('totalCompletedTrip')
                      existingzoneMap.set('zoneId' , obj.zoneId);
                      existingzoneMap.set('zone' , obj.zoneName);
                      existingzoneMap.set('totalvehicle' , totalVehicles);
                      existingzoneMap.set('totalActiveTrip' , totalNoOfActiveTrip);
                      existingzoneMap.set('totalCompletedTrip' , totalNoOfCompletedTrip);
                      this.zoneDataArr.push(existingzoneMap)
                    }else{
                      this.zoneMap = new Map()
                      totalVehicles = totalVehicles + obj.numberOfVehicles
                      totalNoOfActiveTrip = totalNoOfActiveTrip + obj.numberOfActiveTrip
                      totalNoOfCompletedTrip = totalNoOfCompletedTrip + obj.numberOfCompletedTrip
                      this.zoneMap.set('zoneId' , obj.zoneId);
                      this.zoneMap.set('zone' , obj.zoneName);
                      this.zoneMap.set('totalvehicle' , totalVehicles);
                      this.zoneMap.set('totalActiveTrip' , totalNoOfActiveTrip);
                      this.zoneMap.set('totalCompletedTrip' , totalNoOfCompletedTrip);
                      this.zoneDataArr.push(this.zoneMap)
                    }
               })
           }
      });
  }

  fetchReportForPopup2(itemSelected : any){
    this.wcDataArr =  this.reportResponsePopup1Popup2.filter( (element:any) => {
      return element.zoneId == itemSelected.get('zoneId')
    })
  }

  fetchReportForPopup3(itemSelected : any){
    this.tripDataArr =  this.reportResponsePopup3.filter( (element:any) => {
      return element.wealthCenterId == itemSelected.wealthCenterId
    })
  }

  popup2ByZone(item : any){
     this.selectedZone = item.get('zone');
     this.zoneModalstatus = true;
     this.fetchReportForPopup2(item);
  }
  closePopup2ByZone(){
    this.zoneModalstatus = false;
  }

  
  popup3ByWc(item : any){
    this.selectedWc = item.wealthCenter;
    this.wcModalstatus = true;
    this.fetchReportForPopup3(item);
 }
 closepopup3ByWc(){
   this.wcModalstatus = false;
 }

  calculate(obj : any){
       obj.numberOfVehicles
  }

   groupBy(list:any, keyGetter:any) {
    const map = new Map();
    list.forEach((item:any) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

}
