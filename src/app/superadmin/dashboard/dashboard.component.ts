import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Chart, { scales } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as moment from 'moment';
import { ReportGenerate } from 'src/app/model/pit.model';
import { CommonService } from 'src/app/service/common.service';
import { ReportService } from 'src/app/service/report.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../common.css', './dashboard.component.css']
})
export class DashboardComponent {

  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;
  chart5: any;
  chart6:any;
  role : any =''
  wcSelectId:any = 0
  inventoryDate: string = "";
  wcList: any = []
  zoneList: any = []
  mrfReportList : any = []
  wcResponse:any
  wcName:string=''
  zoneName:string=''
  zoneSelectId: any = 0
  mrfResponse : any = ''
  mrfReportListv2:any
  reportResponseWcBasedData : any
  reportResponseWcBasedMrfData : any
  zoneMap = new Map()
  zoneDataArr : any = []
  wcBasedData : any
  wcBasedMrfData : any
  dataMap: any = new Map()
  zoneBasedData : any = []


  form = new FormGroup({
    zoneId: new FormControl,
    wcId: new FormControl  
  });


  payloadInventory: ReportGenerate = {
    reportType: "INVENTORY",
    type: "MONTHLY",
    fromDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? "",
    toDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? "",
    wcId: 0,
    reportName: "INVENTORY"
  }

  reportTripPayload : ReportGenerate = {
    reportType: 'TRIP',
    type: '',
    wcId: 0,
    fromDate: '',
    toDate: '',
    reportName: 'TRIP'
  }

  constructor(private datePipe: DatePipe, private service: CommonService, private reportService: ReportService , private toastService: ToastService){
    this.role = localStorage.getItem('role');
  }

  verifyWcSelected():boolean{
    if(this.wcSelectId == 0 || this.wcSelectId == undefined){
       return false;
    }
    return true
  }

  monthlyReport(){
    if(!this.verifyWcSelected()){
      this.toastService.showError('No Wealth Center Selected. Please select any Wealth Center');  
      return;
    }
      const dateElementTo  = document.querySelector('#filter_from_date') as HTMLInputElement;
      const dateElementTo_ = moment(dateElementTo.value).format('YYYY-MM-DD HH:mm:ss');
      const dateElementFrom_ = moment(dateElementTo.value).subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');
      console.log('  Monthly Report :: From :  ', dateElementFrom_  , dateElementTo);
      this.payloadInventory.fromDate = dateElementFrom_
      this.payloadInventory.toDate = dateElementTo_
      this.reportTripPayload.fromDate =  dateElementFrom_
      this.reportTripPayload.toDate =  dateElementTo_
      this.callAllCommonReportServices();
  }

  weeklyReport(){
    if(!this.verifyWcSelected()){
      this.toastService.showError('No Wealth Center Selected. Please select any Wealth Center');  
      return;
    }
    const dateElementTo = document.querySelector('#filter_from_date') as HTMLInputElement;
    const dateElementTo_ = moment(dateElementTo.value).format('YYYY-MM-DD HH:mm:ss');
    const dateElementFrom_ = moment(dateElementTo.value).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
    console.log('  weekly Report  :: From :  ', dateElementFrom_  , dateElementTo);
    this.payloadInventory.fromDate = dateElementFrom_
    this.payloadInventory.toDate = dateElementTo_
    this.reportTripPayload.fromDate =  dateElementFrom_
    this.reportTripPayload.toDate =  dateElementTo_
    this.callAllCommonReportServices();
  }

  todayReport(){
    if(!this.verifyWcSelected()){
      this.toastService.showError('No Wealth Center Selected. Please select any Wealth Center');  
      return;
    }
    const dateElementFrom = document.querySelector('#filter_from_date') as HTMLInputElement;
    const dateElement_ = moment(dateElementFrom.value).format('YYYY-MM-DD HH:mm:ss');
    console.log('  today Report  :: From :  ', dateElement_  , dateElement_);
    this.payloadInventory.fromDate = dateElement_
    this.payloadInventory.toDate = dateElement_
    this.reportTripPayload.fromDate =  dateElement_
    this.reportTripPayload.toDate =  dateElement_
    this.callAllCommonReportServices();
  }

  FirstHalfReport(){
    if(!this.verifyWcSelected()){
      this.toastService.showError('No Wealth Center Selected. Please select any Wealth Center');  
      return;
    }
    const dateElementFrom = document.querySelector('#filter_from_date') as HTMLInputElement;
    const dateElementFrom_ = moment(dateElementFrom.value).format('YYYY-MM-DD 06:00:00');
    const dateElementTo_ = moment(dateElementFrom.value).format('YYYY-MM-DD 12:00:00');
    console.log('  FirstHalf Report  :: From :  ', dateElementFrom_  , dateElementTo_);
    this.payloadInventory.fromDate = dateElementFrom_
    this.payloadInventory.toDate = dateElementTo_
    this.reportTripPayload.fromDate =  dateElementFrom_
    this.reportTripPayload.toDate =  dateElementTo_
    this.callAllCommonReportServices();
  }

  SecondHalfReport(){
    if(!this.verifyWcSelected()){
      this.toastService.showError('No Wealth Center Selected. Please select any Wealth Center');  
      return;
    }
    const dateElementFrom = document.querySelector('#filter_from_date') as HTMLInputElement;
    const dateElementFrom_ = moment(dateElementFrom.value).format('YYYY-MM-DD 12:00:00');
    const dateElementTo_ = moment(dateElementFrom.value).format('YYYY-MM-DD 18:00:00');
    console.log('  SecondHalf Report  :: From :  ', dateElementFrom_  , dateElementTo_);
    this.payloadInventory.fromDate = dateElementFrom_
    this.payloadInventory.toDate = dateElementTo_
    this.reportTripPayload.fromDate =  dateElementFrom_
    this.reportTripPayload.toDate =  dateElementTo_
    this.callAllCommonReportServices();
  }

  fromDateChange(){
    const dateElementFrom = document.querySelector('#filter_from_date') as HTMLInputElement;
    dateElementFrom.value = moment(new Date()).format('YYYY-MM-DD');
    console.log('  fromDateChange Report  :: From :  ', dateElementFrom.value);
  }
  toDateChange(){
    const dateElementTo = document.querySelector('#filter_to_date') as HTMLInputElement;
    dateElementTo.value = moment(new Date()).format('YYYY-MM-DD');
    console.log('  toDateChange Report  :: From :  ', dateElementTo.value);
  } 
  
  callAllCommonReportServices(){
    this.getMrfReportByWc();
    this.getInventoryRecord();
    this.fetchReport();
  }

  resetData(){
    this.dataMap.set('totalActiveTrip', 0);
    this.dataMap.set('totalCompletedTrip', 0);
    this.dataMap.set('totalDryWeight', 0);
    this.dataMap.set('totalWetWeight', 0);
    this.dataMap.set('totalMRFWeight', 0);
    this.dataMap.set('numberOfVehicles', 0);
    this.dataMap.set('numberOfActiveTrip',0);
    this.dataMap.set('numberOfMaintenanceVehicle', 0);
    this.dataMap.set('numberOfAvailableVehicle', 0);
    this.zoneBasedData = []
  }

  ngOnInit() {

   this.resetData();

    const dateElementFrom = document.querySelector('#filter_from_date') as HTMLInputElement;
    dateElementFrom.value = moment(new Date()).format('YYYY-MM-DD');
    const dateElementTo = document.querySelector('#filter_to_date') as HTMLInputElement;
    dateElementTo.value = moment(new Date()).format('YYYY-MM-DD');

    this.reportTripPayload.fromDate =  (document.querySelector(`input[id="filter_from_date"]`) as HTMLInputElement).value +" 00:00:00"
    this.reportTripPayload.toDate =  (document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement).value +" 00:00:00"

    this.payloadInventory.fromDate =  (document.querySelector(`input[id="filter_from_date"]`) as HTMLInputElement).value +" 00:00:00"
    this.payloadInventory.toDate =  (document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement).value +" 00:00:00"

    // const dateElementFromElement = document.querySelector('#filter_from_date') as HTMLInputElement;
    // const dateElementToElement = document.querySelector('#filter_from_date') as HTMLInputElement;
    
    this.getZones();
    this.createChart1();
    this.createChart2([], []);
    this.createChart3();
    this.createChart4([0,0,0,0]);
    this.createChart5([0,0,0]);
    this.createChart6();
    if (localStorage.getItem("role") == "bmcadmin" || localStorage.getItem("role") == "bmcsuperadminuser") {
    this.service.getZoneAllData().subscribe(
          data => {
            this.zoneList = data
            this.form.patchValue({zoneId:this.zoneList[0].zoneId})
          }
        ); 
    }this.service.getWcById(localStorage.getItem("wcId")).subscribe(
          data=>{
            this.wcResponse=data
            this.wcList=[{wcId:this.wcResponse.wcId,wcName:this.wcResponse.wcName}]
            this.zoneList=[{zoneId:this.wcResponse.zone.zoneId,zoneName:this.wcResponse.zone.zoneName}]
            setTimeout(()=>{
              this.form.patchValue({wcId:this.wcList[0].wcId,zoneId:this.zoneList[0].zoneId}) 
            },1000)

            this.wcName=this.wcResponse.wcName
            this.zoneName=this.wcResponse.zone.zoneName
            console.log(this.zoneName)
          }
    );
  }

  getZones() {
    try {
      this.service.getZoneAllData()
        .subscribe((response) => {
          if (this.role == 'bmcadmin' || this.role == "bmcsuperadminuser") {
            this.zoneList = response
          } else if (this.role == 'wcuser') {
            let tempArr: any = []
            tempArr = response
            this.zoneList.push(tempArr.filter((temp: any) => temp.zoneId == localStorage.getItem('zoneId'))[0]);
            const e = new Event("change");
            const element = document.querySelector('#zoneId')
            element?.dispatchEvent(e);
          }

        });
    } catch (e) {
      console.error(e)
    }
  }

  onZoneSelect(ev: any) {
    if(ev.target.value !== 'undefined'){
      this.zoneSelectId = ev.target.value
    }else{
      this.zoneSelectId = this.zoneList[0].zoneId;
    }
    console.log(ev)
    this.wcList = []
    this.getWcListByZoneId();
  }

  getWcListByZoneId() {
    try {
      this.service.getWcListByZoneId(this.zoneSelectId)
        .subscribe((response: any) => {
          if (this.role == 'bmcadmin' || this.role == "bmcsuperadminuser") {
            this.wcList = response.data
          } else if (this.role == 'wcuser') {
            let tempArr: any = []
            tempArr = response.data
            this.wcList.push(tempArr.filter((temp: any) => temp.wcId == localStorage.getItem('wcId'))[0])
            const e = new Event("change");
            const element = document.querySelector('#wcId')
            element?.dispatchEvent(e);
          }
        });
    } catch (e) {
      console.error(e)
    }
  }

  onWcSelect(ev: any) {
    if(ev.target.value !== 'undefined'){
      this.wcSelectId = ev.target.value;
    }else{
      this.wcSelectId = this.wcList[0].wcId;
    }
    this.payloadInventory.wcId = this.wcSelectId
    this.payloadInventory.fromDate = (document.querySelector(`input[id="filter_from_date"]`) as HTMLInputElement).value +" 00:00:00"
    this.payloadInventory.toDate =(document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement).value +" 00:00:00"
    this.callAllCommonReportServices();

  }

  getInventoryRecord(){
 
    this.payloadInventory.wcId = this.wcSelectId
    try {
      this.reportService.getInventoryReport(this.payloadInventory)
        .subscribe((response:any) => {
           let inStock = 0;
           let purchase = 0;
           let issueStock = 0;
           this.reportRes = response
           this.responseData = this.reportRes.response
           //Purchase
           let itemPurchaseArr = response.itemPurchaseNames;
           itemPurchaseArr.forEach((element: string) => {
            purchase = response.response.PURCHASE._1[element].reduce((sum:number, item:any) => sum + item.quantity, 0);
           });

           //Issue 
           let itemIssueArr = response.itemIssueNames;
           itemIssueArr.forEach((element: string) => {
            issueStock = response.response.ISSUESTOCK._1[element].reduce((sum:number, item:any) => sum + item.quantity, 0);
           });


           //In Stock
           let itemStockArr = response.itemInStockNames;
           itemStockArr.forEach((element: string) => {
            inStock = response.response.INSTOCK._1[element].reduce((sum:number, item:any) => sum + item.quantity, 0);
           });

          // this.createChart5([purchase, issueStock, inStock]);
           this.createChart2DataSet();
        });
    } catch (e) {
      console.error(e)
    }
  }

  getMrfReportByWc(){
    this.service.getMrfReportByWc(this.form.value.wcId).subscribe(
      data=>{
        this.mrfResponse=data
        this.mrfReportList=this.mrfResponse.data
      }
    );
    this.service.getDashboardDetailsV2(this.form.value.wcId).subscribe(
      data=>{
        this.mrfResponse=data
        this.mrfReportListv2=this.mrfResponse.data
        this.service.dashboardDetailsV2=this.mrfReportListv2
        console.log('  MRF Response ::  ' , data)
      }
    );
  }



  fetchReport(){
  
    this.reportService.getTripReport(this.reportTripPayload)
    .subscribe((response) => {
     console.log(response);
    this.reportResponseWcBasedData = response.response.TRIPRESPONSE_POPUP1_POUP2
    this.reportResponseWcBasedMrfData = response.response.TRIPRESPONSE_MRF
  //  this.reportResponsePopup3 = response.response.TRIPRESPONSE_POPUP3
   console.log('  report response wc based ',this.reportResponseWcBasedData );
 
   if(this.reportResponseWcBasedData == undefined || this.reportResponseWcBasedData == null || this.reportResponseWcBasedData.length == 0){
          this.resetData();
          return;
   }
   this.wcBasedData = this.reportResponseWcBasedData.filter( (element:any) => {
      return element.wealthCenterId == this.wcSelectId
   });

   this.wcBasedMrfData = this.reportResponseWcBasedMrfData.filter( (element:any) => {
    return element.wealthCenterId == this.wcSelectId
   });
   this.dataMap = new Map()
   if( this.wcBasedData.length > 0 &&  this.wcBasedData != undefined){
      this.dataMap.set('totalActiveTrip', this.wcBasedData[0].numberOfActiveTrip);
      this.dataMap.set('totalCompletedTrip', this.wcBasedData[0].numberOfCompletedTrip);
      this.dataMap.set('totalDryWeight', this.wcBasedData[0].totalDryWeight);
      this.dataMap.set('totalWetWeight', this.wcBasedData[0].totalWetWeight);
      this.dataMap.set('totalMRFWeight', this.wcBasedData[0].totalMRFProcessed);

      this.dataMap.set('numberOfVehicles', this.wcBasedData[0].numberOfVehicles);
      this.dataMap.set('numberOfActiveTrip', this.wcBasedData[0].numberOfActiveTrip);
      this.dataMap.set('numberOfMaintenanceVehicle', 0);
      this.dataMap.set('numberOfAvailableVehicle', this.wcBasedData[0].numberOfVehicles -  this.wcBasedData[0].numberOfActiveTrip);

      this.createChart4([this.wcBasedData[0].numberOfVehicles,this.wcBasedData[0].numberOfActiveTrip, 0 , this.wcBasedData[0].numberOfVehicles -  this.wcBasedData[0].numberOfActiveTrip]);
   }

   // Trip Data Based on Zone..............
   this.zoneBasedData = this.reportResponseWcBasedData.filter( (element:any) => {
      return element.zoneId == this.zoneSelectId
   });

    


    // const groupedByZone = this.groupBy(this.reportResponseWcBasedData, (popup1popup2:any) => popup1popup2.zoneName);
    // for (let key of groupedByZone.keys()) {
    // let totalVehicles : number = 0;
    // let totalNoOfActiveTrip : number = 0;
    // let totalNoOfCompletedTrip : number = 0;
    //    groupedByZone.get(key).map( (obj : any) => {
    //         if(this.zoneDataArr.some((element:any) => element.get('zone') == key )){
    //           this.zoneMap = new Map()
    //           const existingzoneMap = this.zoneDataArr.filter((element:any) => element.get('zone') == key)[0];
    //           this.zoneDataArr.pop(existingzoneMap)
    //           totalVehicles = obj.numberOfVehicles + existingzoneMap.get('totalvehicle')
    //           totalNoOfActiveTrip = obj.numberOfActiveTrip + existingzoneMap.get('totalActiveTrip')
    //           totalNoOfCompletedTrip = obj.numberOfCompletedTrip + existingzoneMap.get('totalCompletedTrip')
    //           existingzoneMap.set('zoneId' , obj.zoneId);
    //           existingzoneMap.set('zone' , obj.zoneName);
    //           existingzoneMap.set('totalvehicle' , totalVehicles);
    //           existingzoneMap.set('totalActiveTrip' , totalNoOfActiveTrip);
    //           existingzoneMap.set('totalCompletedTrip' , totalNoOfCompletedTrip);
    //           this.zoneDataArr.push(existingzoneMap)
    //         }else{
    //           this.zoneMap = new Map()
    //           totalVehicles = totalVehicles + obj.numberOfVehicles
    //           totalNoOfActiveTrip = totalNoOfActiveTrip + obj.numberOfActiveTrip
    //           totalNoOfCompletedTrip = totalNoOfCompletedTrip + obj.numberOfCompletedTrip
    //           this.zoneMap.set('zoneId' , obj.zoneId);
    //           this.zoneMap.set('zone' , obj.zoneName);
    //           this.zoneMap.set('totalvehicle' , totalVehicles);
    //           this.zoneMap.set('totalActiveTrip' , totalNoOfActiveTrip);
    //           this.zoneMap.set('totalCompletedTrip' , totalNoOfCompletedTrip);
    //           this.zoneDataArr.push(this.zoneMap)
    //         }
    //      })
    //    }
    });
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


  createChart1() {
    this.chart1 = new Chart("chart-99e18e69-3e60-4552-9013-95c594d09659", {
      type: "doughnut",
      data: {
        labels: ["Package", "Unsold", "Sold"],
        datasets: [
          {
            data: [
              100, 0, 0
            ],
            backgroundColor: [
              "#0FA8FC", "#E93228", "#18D87F"
            ]
          },
          {
            data: [
              60, 40, 0
            ],
            backgroundColor: [
              "#E93228", "#E8E8E8", "#E8E8E8",
            ],
          },
          {
            data: [
              40, 60, 0
            ],
            backgroundColor: [
              "#18D87F", "#E8E8E8", "#E8E8E8"
            ],
          },
        ],
      },
      options: {
        responsive: true,
        color: "white",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });
  }

  createChart2(lebelsArr:any[] , dataArr:any[]) {
    this.chart2 = new Chart("chart-e017e3c3-333c-4ca7-8b20-56d7b361c29b", {
      type: "line",
      data: {
        labels: ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"],
        datasets: [
          {
            label: "Dry Garbage",
            data: [10, 20, 55, 65, 55, 40, 50, 20, 20, 30, 40, 30],
            backgroundColor: "rgba(131,55,235, 0.5)",
            fill: true,
            tension: 0.4
          },
          {
            label: "Wet Garbage",
            data: [20, 30, 50, 60, 50, 60, 30, 20, 30, 40, 30, 40],
            backgroundColor: "rgba(247,36,133, 0.5)",
            fill: true,
            tension: 0.4
          },
          {
            label: "Inert Material",
            data: [30, 36, 40, 50, 70, 50, 40, 30, 40, 50, 45, 50],
            backgroundColor: "rgba(255,183,5, 0.5)",
            fill: true,
            tension: 0.4
          }
        ],
      },
      // plugins: [ChartDataLabels],
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
        color: "white",
        maintainAspectRatio: false,
        plugins: {
          filler: {
            propagate: true
          },
        },
      },
    });
  }

  createChart3() {
    this.chart3 = new Chart("chart-23236985-42b9-4174-9d5a-0a199dd473d9", {
      type: "bar",
      data: {
        labels: ["Total Employee", "Present", "Absent"],
        datasets: [
          {
            label: "",
            data: [50, 30, 20],
            backgroundColor: ["#016A3B", "#7DC701", "#FE0000"],
            barThickness: 20,
          },
        ],
      },
      // plugins: [ChartDataLabels],
      options: {
        indexAxis: "y",
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
        color: "white",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "left",
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });
  }

  createChart4(dataArr : any[]) {
    if (this.chart4 != null && this.chart4 != undefined) {
      this.chart4.destroy()
    }
    this.chart4 = new Chart("chart-19b8e3bd-bc26-46c8-9ea4-01d6345cb2e2", {
      type: "doughnut",
      data: {
        labels: [
          "Total Vehicle",
          "Vehicle On-field",
          "Maintenance",
          "Available",
        ],
        datasets: [
          {
            // label: "In Percentage",
            data: dataArr,
            backgroundColor: ["#4E4CFD", "#92CA33", "#EF4BD0", "#0086CE"],
            borderWidth: 0,
          },
        ],
      },
      // plugins: [ChartDataLabels],
      options: {
        responsive: true,
        color: "white",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });
  }

  // createChart5() {
  //   this.chart3 = new Chart("chart-23236985-f16855f5-676c-4201-b1d9-ab68c9d8307a", {
  //     type: "bar",
  //     data: {
  //       labels: ["Package", "Unsold", "Sold"],
  //       datasets: [
  //         {
  //           label: "",
  //           data: [500, 260, 240],
  //           backgroundColor: ["#11A3F5", "#ED3223", "#15D981"],
  //           barThickness: 20,
  //         },
  //       ],
  //     },
  //     // plugins: [ChartDataLabels],
  //     options: {
  //       indexAxis: "y",
  //       responsive: true,
  //       scales: {
  //         x: {
  //           ticks: {
  //             color: "white",
  //           },
  //         },
  //         y: {
  //           ticks: {
  //             color: "white",
  //           },
  //         },
  //       },
  //       color: "white",
  //       maintainAspectRatio: false,
  //       plugins: {
  //         legend: {
  //           display: false,
  //           position: "left",
  //           labels: {
  //             color: "#fff",
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  dataSetArr: any[] = []
  dataSetChatArr: any[] = []
  issueItemsMap = new Map<string, number>();
  inStockMap = new Map<string, number>();
  purchaseMap = new Map<string, number>();
  issueItems: any[] = []
  instockItems: any[] = []
  purchaseItems: any[] = []
  responseData: any = {}
  reportRes: any
  inventoryToDate: string = "";
  inventoryFromDt: string = "";

  createChart2DataSet() {
    this.dataSetChatArr = []
    let chartModel = {
      'label': "",
      'data': [0],
      'backgroundColor': "#175CFF"
    }
    this.issueItems = this.reportRes.itemIssueNames
    this.instockItems = this.reportRes.itemInStockNames
    this.purchaseItems = this.reportRes.itemPurchaseNames
    this.issueItems.forEach(issueItem => {
      let issueStockObj = this.responseData.ISSUESTOCK._1
      for (var key in issueStockObj[issueItem.toString()]) {
        let item = issueStockObj[issueItem.toString()][key]['itemName']
        let quantity = issueStockObj[issueItem.toString()][key]['quantity']
        if (this.issueItemsMap.has(item)) {
          this.issueItemsMap.set(item, this.issueItemsMap.get(item) + quantity)
        } else {
          this.issueItemsMap.set(item, quantity)
        }
      }
    })
    chartModel.label = 'Issue Stock Items'
    this.issueItems.forEach(issueItem => {
      this.dataSetArr.push(this.issueItemsMap.get(issueItem) != undefined ? this.issueItemsMap.get(issueItem) : 0)
    });
    chartModel.data = this.dataSetArr
    chartModel.backgroundColor = '#FF0069'
    this.dataSetChatArr.push(chartModel)
    //console.log(issueItemsMap)
    chartModel = {
      'label': "",
      'data': [0],
      'backgroundColor': "#175CFF"
    }
    this.instockItems.forEach(instockItem => {
      let inStockObj = this.responseData.INSTOCK._1
      for (var key in inStockObj[instockItem.toString()]) {
        let item = inStockObj[instockItem.toString()][key]['itemName']
        let quantity = inStockObj[instockItem.toString()][key]['quantity']
        if (this.inStockMap.has(item)) {
          this.inStockMap.set(item, this.inStockMap.get(item) + quantity)
        } else {
          this.inStockMap.set(item, quantity)
        }
      }
    })
    this.dataSetArr = []
    chartModel.label = 'InStock Items'
    this.instockItems.forEach(stockItem => {
      this.dataSetArr.push(this.inStockMap.get(stockItem) != undefined ? this.inStockMap.get(stockItem) : 0)
    });
    chartModel.data = this.dataSetArr
    chartModel.backgroundColor = '#E5D05D'
    this.dataSetChatArr.push(chartModel)
    //console.log(inStockMap)
    chartModel = {
      'label': "",
      'data': [0],
      'backgroundColor': "#175CFF"
    }

    this.purchaseItems.forEach(purchaseItem => {
      let purchaseObj = this.responseData.PURCHASE._1
      for (var key in purchaseObj[purchaseItem.toString()]) {
        let item = purchaseObj[purchaseItem.toString()][key]['itemName']
        let quantity = purchaseObj[purchaseItem.toString()][key]['quantity']
        if (this.purchaseMap.has(item)) {
          this.purchaseMap.set(item, this.purchaseMap.get(item) + quantity)
        } else {
          this.purchaseMap.set(item, quantity)
        }
      }
    })
    //console.log(purchaseMap)
    this.dataSetArr = []
    chartModel.label = 'Purchase Items'
    this.purchaseItems.forEach(purchaseItem => {
      this.dataSetArr.push(this.purchaseMap.get(purchaseItem) != undefined ? this.purchaseMap.get(purchaseItem) : 0)
    });
    chartModel.data = this.dataSetArr
    chartModel.backgroundColor = '#175CFF'
    this.dataSetChatArr.push(chartModel)
    ///console.log(inStockMap)
    chartModel = {
      'label': "",
      'data': [0],
      'backgroundColor': "#175CFF"
    }
    //console.log( this.dataSetChatArr)
    this.createChart6()
  }

  createChart6() {
    let currDt = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.form.controls['fromDate'].setValue(new Date());
    // this.form.controls['toDate'].setValue(new Date());
    this.inventoryFromDt =  this.inventoryToDate = currDt ?? "";
    if (this.chart6 != null && this.chart6 != undefined) {
      this.chart6.destroy()
    }
    this.chart6 = new Chart("chart-029ea4bc-fac1-4296-b731-25bb7c6598ac34", {
      type: "bar",
      data: {
        labels: this.purchaseItems,
        datasets: this.dataSetChatArr
      },
      // plugins: [ChartDataLabels],
      options: {
        indexAxis: "x",
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: "white",
            },
            // stacked: true
          },
          y: {
            ticks: {
              color: "white",
            },
            // stacked: fal se
          },
        },
        color: "white",
        maintainAspectRatio: false,
        skipNull: true
      },
    });
  }


  createChart5(dataArr: number[]) {
    this.inventoryDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? "";
    if (this.chart5 != null && this.chart5 != undefined) {
      this.chart5.destroy()
    }
    this.chart5 = new Chart("chart-029ea4bc-fac1-4296-b731-25bb7c6598ac", {
      type: "bar",
      data: {
        labels: ["Purchase", "Issue Stock", "In Stock"],
        datasets: [
          {
            label: "",
            data: dataArr,
            backgroundColor: ["#14A2F4", "#EE321F", "#12D881"],
            barThickness: 20,
          },
        ],
      },
      // plugins: [ChartDataLabels],
      options: {
        indexAxis: "y",
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
        color: "white",
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "left",
            labels: {
              color: "#fff",
            },
          },
        },
      },
    });
  }

}

