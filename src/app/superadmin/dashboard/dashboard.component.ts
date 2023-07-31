import { DatePipe } from "@angular/common";
import { HttpStatusCode } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Chart, { scales } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as moment from "moment";
import { ReportGenerate } from "src/app/model/pit.model";
import { CommonService } from "src/app/service/common.service";
import { ReportService } from "src/app/service/report.service";
import { ToastService } from "src/app/service/toast.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["../../common.css", "./dashboard.component.css"],
})
export class DashboardComponent {
  allReportType: any;
  chart1: any;
  chart2: any;
  chart3: any;
  chart4: any;
  chart5: any;
  chart6: any;
  role: any = "";
  wcSelectId: any = 0;
  inventoryDate: string = "";
  wcList: any = [];
  zoneList: any = [];
  mrfReportList: any = [];
  wcResponse: any;
  wcName: string = "";
  zoneName: string = "";
  zoneSelectId: any = 0;
  mrfResponse: any = "";
  mrfReportListv2: any;
  reportResponseWcBasedData: any;
  reportResponseWcBasedMrfData: any;
  zoneMap = new Map();
  zoneDataArr: any = [];
  wcBasedData: any;
  wcBasedMrfData: any;
  dataMap: any = new Map();
  zoneBasedData: any = [];
  reportType = "";
  mrfResponseWcData: any = [];
  reportMrfResponseWcData: any = [];
  mrfDailyQtm: number = 0;
  mrfDailyWaste: number = 0;
  mrfDailyInStock: number = 0;
  mrfWeeklyQtm: number = 0;
  mrfWeeklyInStock: number = 0;
  mrfMonthlyQtm: number = 0;
  mrfMonthlyInStock: number = 0;
  selectZone: any = "";
  selectWc: any = "";
  dataSetArr: any[] = [];
  dataSetChatArr: any[] = [];
  issueItemsMap = new Map<string, number>();
  inStockMap = new Map<string, number>();
  purchaseMap = new Map<string, number>();
  issueItems: any[] = [];
  instockItems: any[] = [];
  purchaseItems: any[] = [];
  responseData: any = {};
  responseMoKhata: any = [];
  reportRes: any;
  inventoryToDate: string = "";
  inventoryFromDt: string = "";
  totalMonthlyKhata = 0;
  totalWeeklyKhata = 0;
  totalDailyKhata = 0;

  form = new FormGroup({
    zoneId: new FormControl(),
    wcId: new FormControl(),
  });

  payloadInventory: ReportGenerate = {
    reportType: "INVENTORY",
    type: "MONTHLY",
    fromDate: this.datePipe.transform(new Date(), "yyyy-MM-dd") ?? "",
    toDate: this.datePipe.transform(new Date(), "yyyy-MM-dd") ?? "",
    wcId: 0,
    reportName: "INVENTORY",
  };

  payloadMoKhata: ReportGenerate = {
    reportType: "MOKHATA",
    type: "MONTHLY",
    fromDate: this.datePipe.transform(new Date(), "yyyy-MM-dd") ?? "",
    toDate: this.datePipe.transform(new Date(), "yyyy-MM-dd") ?? "",
    wcId: 0,
    reportName: "MOKHATA",
  };

  reportTripPayload: ReportGenerate = {
    reportType: "TRIP",
    type: "",
    wcId: 0,
    fromDate: "",
    toDate: "",
    reportName: "TRIP",
  };

  reportMrfPayload: ReportGenerate = {
    reportType: "MRF",
    type: "",
    wcId: 0,
    fromDate: "",
    toDate: "",
    reportName: "MRF",
  };

  constructor(
    private datePipe: DatePipe,
    private service: CommonService,
    private reportService: ReportService,
    private toastService: ToastService
  ) {
    this.role = localStorage.getItem("role");
  }

  verifyWcSelected(): boolean {
    if (this.role == "bmcsuperadminuser" || this.role == "bmcadmin") {
      return true;
    }
    if (this.wcSelectId == 0 || this.wcSelectId == undefined) {
      return false;
    }
    return true;
  }

  TimeBasedreport(eventType: string) {
    if (!this.verifyWcSelected()) {
      this.toastService.showError(
        "No Wealth Center Selected. Please select any Wealth Center"
      );
      return;
    }
    const dateElementCurrent = document.querySelector(
      "#filter_from_date"
    ) as HTMLInputElement;
    console.log(
      " Report :: From :  ",
      dateElementCurrent.value,
      dateElementCurrent.value
    );
    // this.payloadInventory.fromDate = dateElementCurrent.value
    // this.payloadInventory.toDate = dateElementCurrent.value
    // this.reportTripPayload.fromDate =  dateElementCurrent.value
    // this.reportTripPayload.toDate =  dateElementCurrent.value
    // this.reportMrfPayload.fromDate =  dateElementCurrent.value
    // this.reportMrfPayload.toDate =  dateElementCurrent.value
    // this.payloadMoKhata.fromDate = dateElementCurrent.value
    // this.payloadMoKhata.toDate = dateElementCurrent.value

    this.payloadInventory.fromDate = "2023-07-28 00:00:00";
    this.payloadInventory.toDate = "2023-07-28 00:00:00";
    this.reportTripPayload.fromDate = "2023-07-28 00:00:00";
    this.reportTripPayload.toDate = "2023-07-28 00:00:00";
    this.reportMrfPayload.fromDate = "2023-07-28 00:00:00";
    this.reportMrfPayload.toDate = "2023-07-28 00:00:00";
    this.payloadMoKhata.fromDate = "2023-07-29 00:00:00";
    this.payloadMoKhata.toDate = "2023-07-29 00:00:00";

    this.callAllCommonReportServices(eventType);
  }

  fromDateChange() {
    const dateElementFrom = document.querySelector(
      "#filter_from_date"
    ) as HTMLInputElement;
    dateElementFrom.value = moment(new Date()).format("YYYY-MM-DD");
    console.log("  fromDateChange Report  :: From :  ", dateElementFrom.value);
  }
  toDateChange() {
    const dateElementTo = document.querySelector(
      "#filter_to_date"
    ) as HTMLInputElement;
    dateElementTo.value = moment(new Date()).format("YYYY-MM-DD");
    console.log("  toDateChange Report  :: From :  ", dateElementTo.value);
  }

  callAllCommonReportServices(eventType: string) {
    this.getInventoryRecord();
    this.fetchReport(eventType);
    this.getReportMrfBasedOnWc();
    this.getMoKhataRecord();
  }

  resetData() {
    this.dataMap.set("totalActiveTrip", 0);
    this.dataMap.set("totalCompletedTrip", 0);
    this.dataMap.set("totalDryWeight", 0);
    this.dataMap.set("totalWetWeight", 0);
    this.dataMap.set("totalMRFWeight", 0);
    this.dataMap.set("numberOfVehicles", 0);
    this.dataMap.set("numberOfActiveTrip", 0);
    this.dataMap.set("numberOfMaintenanceVehicle", 0);
    this.dataMap.set("numberOfAvailableVehicle", 0);
    this.zoneBasedData = [];
  }

  currentDateSelect() {
    const dateElementFrom = document.querySelector(
      "#filter_from_date"
    ) as HTMLInputElement;
    dateElementFrom.value = moment(new Date()).format("YYYY-MM-DD");
    const dateElementTo = document.querySelector(
      "#filter_to_date"
    ) as HTMLInputElement;
    dateElementTo.value = moment(new Date()).format("YYYY-MM-DD");

    this.reportTripPayload.fromDate =
      (
        document.querySelector(
          `input[id="filter_from_date"]`
        ) as HTMLInputElement
      ).value + " 00:00:00";
    this.reportTripPayload.toDate =
      (document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement)
        .value + " 00:00:00";

    this.payloadInventory.fromDate =
      (
        document.querySelector(
          `input[id="filter_from_date"]`
        ) as HTMLInputElement
      ).value + " 00:00:00";
    this.payloadInventory.toDate =
      (document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement)
        .value + " 00:00:00";

    this.reportMrfPayload.fromDate =
      (
        document.querySelector(
          `input[id="filter_from_date"]`
        ) as HTMLInputElement
      ).value + " 00:00:00";
    this.reportMrfPayload.toDate =
      (document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement)
        .value + " 00:00:00";

    this.payloadMoKhata.fromDate =
      (
        document.querySelector(
          `input[id="filter_from_date"]`
        ) as HTMLInputElement
      ).value + " 00:00:00";
    this.payloadMoKhata.toDate =
      (document.querySelector(`input[id="filter_to_date"]`) as HTMLInputElement)
        .value + " 00:00:00";

    this.payloadInventory.fromDate = "2023-07-28 00:00:00";
    this.payloadInventory.toDate = "2023-07-28 00:00:00";
    this.reportTripPayload.fromDate = "2023-07-28 00:00:00";
    this.reportTripPayload.toDate = "2023-07-28 00:00:00";
    this.reportMrfPayload.fromDate = "2023-07-28 00:00:00";
    this.reportMrfPayload.toDate = "2023-07-28 00:00:00";
    this.payloadMoKhata.fromDate = "2023-07-29 00:00:00";
    this.payloadMoKhata.toDate = "2023-07-29 00:00:00";
  }

  ngOnInit() {
    // this.getReports();
    this.resetData();
    this.currentDateSelect();
    if (this.role == "bmcadmin" || this.role == "bmcsuperadminuser") {
      this.selectZone = "Allzone";
      this.selectWc = "Allwc";
    }
    console.log(" Selcted val ::   ", this.selectZone, this.selectWc);
    if (
      localStorage.getItem("wcId") != undefined &&
      localStorage.getItem("wcId") != "0"
    ) {
      this.wcSelectId = localStorage.getItem("wcId");
      this.payloadInventory.wcId = this.wcSelectId;
      this.reportTripPayload.wcId = this.wcSelectId;
      this.reportMrfPayload.wcId = this.wcSelectId;
    }
    console.log(" wc selected :   ", this.wcSelectId);
    this.getZones();
    //this.createChart1();
    //this.createChart2([], []);
    this.createChart4([0, 0, 0, 0]);
    this.createChart5([0, 0, 0]);
    this.createChart6();
    if (this.role == "bmcadmin" || this.role == "bmcsuperadminuser") {
      this.service.getZoneAllData().subscribe((data) => {
        this.zoneList = data;
        this.form.patchValue({ zoneId: this.zoneList[0].zoneId });
      });
    }
    if (this.role != "bmcadmin" && this.role != "bmcsuperadminuser") {
      this.service.getWcById(localStorage.getItem("wcId")).subscribe((data) => {
        this.wcResponse = data;
        this.wcList = [
          { wcId: this.wcResponse.wcId, wcName: this.wcResponse.wcName },
        ];
        this.zoneList = [
          {
            zoneId: this.wcResponse.zone.zoneId,
            zoneName: this.wcResponse.zone.zoneName,
          },
        ];
        setTimeout(() => {
          this.form.patchValue({
            wcId: this.wcList[0].wcId,
            zoneId: this.zoneList[0].zoneId,
          });
        }, 1000);

        this.wcName = this.wcResponse.wcName;
        this.zoneName = this.wcResponse.zone.zoneName;
        console.log(this.zoneName);
      });
    }
    this.currentDateSelect();
    this.callAllCommonReportServices("TODAY");
  }

  getZones() {
    try {
      this.service.getZoneAllData().subscribe((response) => {
        if (this.role == "bmcadmin" || this.role == "bmcsuperadminuser") {
          this.zoneList = response;
        } else if (this.role == "wcuser") {
          let tempArr: any = [];
          tempArr = response;
          this.zoneList.push(
            tempArr.filter(
              (temp: any) => temp.zoneId == localStorage.getItem("zoneId")
            )[0]
          );
          const e = new Event("change");
          const element = document.querySelector("#zoneId");
          element?.dispatchEvent(e);
        }
      });
      this.fetchReport("TODAY");
    } catch (e) {
      console.error(e);
    }
  }

  getReports() {
    try {
      this.service.getAllReports().subscribe((response) => {
        console.log("report response", response);
      });
    } catch (error) {
      console.log(error);
    }
  }

  onZoneSelect(ev: any) {
    if (ev.target.value !== "undefined") {
      this.zoneSelectId = ev.target.value;
      if (ev.target.value != "Allzone") {
        this.selectWc = "";
        this.selectZone = "";
      } else {
        this.selectZone = "Allzone";
        this.selectWc = "Allwc";
      }
    } else {
      this.zoneSelectId = this.zoneList[0].zoneId;
    }
    console.log(ev);
    this.wcList = [];
    this.getWcListByZoneId();
    this.fetchReport("TODAY");
  }

  onReportSelect(event: any) {
    let selectedReport = this.allReportType.filter(
      (x: any) => x.name == event.target.value
    );
    let keys = Array.from(
      selectedReport[0]["data"].reduce(
        (s: any, o: any) => Object.keys(o).reduce((t, k) => t.add(k), s),
        new Set()
      )
    );
    console.log(keys);
    let fileName = event.target.value + ".csv";
    let columnNames = keys;
    let header = columnNames.join(",");
    let csv = header;
    csv += "\r\n";
    selectedReport[0]["data"].map((c: any) => {
      csv += [keys.map((eachKey: any) => c[eachKey])].join(",");
      csv += "\r\n";
    });
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  getWcListByZoneId() {
    try {
      this.service
        .getWcListByZoneId(this.zoneSelectId)
        .subscribe((response: any) => {
          if (this.role == "bmcadmin" || this.role == "bmcsuperadminuser") {
            this.wcList = response.data;
          } else if (this.role == "wcuser") {
            let tempArr: any = [];
            tempArr = response.data;
            this.wcList.push(
              tempArr.filter(
                (temp: any) => temp.wcId == localStorage.getItem("wcId")
              )[0]
            );
            const e = new Event("change");
            const element = document.querySelector("#wcId");
            element?.dispatchEvent(e);
          }
        });
    } catch (e) {
      console.error(e);
    }
  }

  onWcSelect(ev: any) {
    if (ev.target.value != "undefined") {
      this.wcSelectId = ev.target.value;
      if (ev.target.value != "Allwc") {
        this.selectWc = "";
        this.selectZone = "";
      } else {
        this.selectWc = "Allwc";
      }
    } else if (localStorage.getItem("wcId") != "0") {
      this.wcSelectId = localStorage.getItem("wcId");
    }
    this.payloadInventory.wcId = this.wcSelectId;
    this.reportMrfPayload.wcId = this.wcSelectId;
    this.reportTripPayload.wcId = this.wcSelectId;
    this.currentDateSelect();
    this.callAllCommonReportServices("TODAY");
  }

  getReportMrfBasedOnWc() {
    this.mrfDailyQtm = 0;
    this.mrfDailyWaste = 0;
    this.mrfDailyInStock = 0;
    this.mrfWeeklyQtm = 0;
    this.mrfWeeklyInStock = 0;
    this.mrfMonthlyQtm = 0;
    this.mrfMonthlyInStock = 0;
    if (
      localStorage.getItem("role") != "bmcadmin" &&
      localStorage.getItem("role") != "bmcsuperadminuser"
    ) {
      this.wcSelectId = localStorage.getItem("wcId");
      this.reportMrfPayload.wcId = this.wcSelectId;
      this.selectWc = "";
      this.selectZone = "";
    }

    try {
      this.reportService
        .getMrfReport(this.reportMrfPayload)
        .subscribe((data) => {
          this.mrfReportList = data;
          if (
            this.mrfReportList.response.MRF_DAILY.length == 0 &&
            this.mrfReportList.response.MRF_WEEKLY.length == 0 &&
            this.mrfReportList.response.MRF_MONTHLY.length == 0
          ) {
            return;
          }

          if (this.selectWc == "Allwc" && this.selectZone == "Allzone") {
            this.mrfDailyQtm =
              this.mrfReportList.response.MRF_DAILY.length != 0
                ? Math.round(
                    (this.mrfReportList.response.MRF_DAILY.reduce(
                      (sum: number, item: any) => sum + Number(item.dailyQtm),
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100
                : 0;
            this.mrfDailyInStock =
              this.mrfReportList.response.MRF_DAILY.length != 0
                ? Math.round(
                    (this.mrfReportList.response.MRF_DAILY.reduce(
                      (sum: number, item: any) =>
                        sum + Number(item.dailyinStock),
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100
                : 0;
            this.mrfWeeklyQtm =
              this.mrfReportList.response.MRF_WEEKLY.length != 0
                ? Math.round(
                    (this.mrfReportList.response.MRF_WEEKLY.reduce(
                      (sum: number, item: any) => sum + Number(item.weeklyQtm),
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100
                : 0;
            this.mrfWeeklyInStock =
              this.mrfReportList.response.MRF_WEEKLY.length != 0
                ? Math.round(
                    (this.mrfReportList.response.MRF_WEEKLY.reduce(
                      (sum: number, item: any) =>
                        sum + Number(item.weeklyInStock),
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100
                : 0;
            this.mrfMonthlyQtm =
              this.mrfReportList.response.MRF_MONTHLY.length != 0
                ? Math.round(
                    (this.mrfReportList.response.MRF_MONTHLY.reduce(
                      (sum: number, item: any) => sum + Number(item.monthQtm),
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100
                : 0;
            this.mrfMonthlyInStock =
              this.mrfReportList.response.MRF_MONTHLY.length != 0
                ? Math.round(
                    (this.mrfReportList.response.MRF_MONTHLY.reduce(
                      (sum: number, item: any) =>
                        sum + Number(item.monthInStock),
                      0
                    ) +
                      Number.EPSILON) *
                      100
                  ) / 100
                : 0;
          } else {
            this.mrfDailyQtm =
              Math.round(
                (this.mrfReportList.response.MRF_DAILY.filter(
                  (element: any) => {
                    return element.wealthCenterId == this.wcSelectId;
                  }
                ).reduce(
                  (sum: number, item: any) => sum + Number(item.dailyQtm),
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100;
            this.mrfDailyInStock =
              Math.round(
                (this.mrfReportList.response.MRF_DAILY.filter(
                  (element: any) => {
                    return element.wealthCenterId == this.wcSelectId;
                  }
                ).reduce(
                  (sum: number, item: any) => sum + Number(item.dailyinStock),
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100;
            this.mrfWeeklyQtm =
              Math.round(
                (this.mrfReportList.response.MRF_WEEKLY.filter(
                  (element: any) => {
                    return element.wealthCenterId == this.wcSelectId;
                  }
                ).reduce(
                  (sum: number, item: any) => sum + Number(item.weeklyQtm),
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100;
            this.mrfWeeklyInStock =
              Math.round(
                (this.mrfReportList.response.MRF_WEEKLY.filter(
                  (element: any) => {
                    return element.wealthCenterId == this.wcSelectId;
                  }
                ).reduce(
                  (sum: number, item: any) => sum + Number(item.weeklyInStock),
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100;
            this.mrfMonthlyQtm =
              Math.round(
                (this.mrfReportList.response.MRF_MONTHLY.filter(
                  (element: any) => {
                    return element.wealthCenterId == this.wcSelectId;
                  }
                ).reduce(
                  (sum: number, item: any) => sum + Number(item.monthQtm),
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100;
            this.mrfMonthlyInStock =
              Math.round(
                (this.mrfReportList.response.MRF_MONTHLY.filter(
                  (element: any) => {
                    return element.wealthCenterId == this.wcSelectId;
                  }
                ).reduce(
                  (sum: number, item: any) => sum + Number(item.monthInStock),
                  0
                ) +
                  Number.EPSILON) *
                  100
              ) / 100;
          }
        });
    } catch (ex) {
      console.error(ex);
    }
  }

  getInventoryRecord() {
    try {
      this.reportService
        .getInventoryReport(this.payloadInventory)
        .subscribe((response: any) => {
          let inStock = 0;
          let purchase = 0;
          let issueStock = 0;
          this.reportRes = response;
          this.responseData = this.reportRes.response;
          //Purchase
          let itemPurchaseArr = response.itemPurchaseNames;

          itemPurchaseArr.forEach((element: string) => {
            purchase = response.response.PURCHASE._1[element].reduce(
              (sum: number, item: any) => sum + item.quantity,
              0
            );
          });

          //Issue
          let itemIssueArr = response.itemIssueNames;
          itemIssueArr.forEach((element: string) => {
            issueStock = response.response.ISSUESTOCK._1[element].reduce(
              (sum: number, item: any) => sum + item.quantity,
              0
            );
          });

          //In Stock
          let itemStockArr = response.itemInStockNames;
          itemStockArr.forEach((element: string) => {
            inStock = response.response.INSTOCK._1[element].reduce(
              (sum: number, item: any) => sum + item.quantity,
              0
            );
          });

          // this.createChart5([purchase, issueStock, inStock]);
          this.createChart2DataSet();
        });
    } catch (e) {
      console.error(e);
    }
  }

  getMoKhataRecord() {
    try {
      this.reportService
        .getMokhataReport(this.payloadMoKhata)
        .subscribe((response: any) => {
          this.responseMoKhata = response.response.MOKHATA;
          if (
            this.responseMoKhata == undefined ||
            this.responseMoKhata.length == 0
          ) {
            return;
          }
          this.totalDailyKhata = this.responseMoKhata.reduce(
            (sum: number, item: any) => sum + item.totalDailyKhata,
            0
          );
          this.totalWeeklyKhata = this.responseMoKhata.reduce(
            (sum: number, item: any) => sum + item.totalWeeklyKhata,
            0
          );
          this.totalMonthlyKhata = this.responseMoKhata.reduce(
            (sum: number, item: any) => sum + item.totalMonthlyKhata,
            0
          );
        });
    } catch (e) {
      console.error(e);
    }
  }

  fetchReport(eventType: string) {
    this.dataMap = new Map();
    this.reportService
      .getTripReport(this.reportTripPayload)
      .subscribe((response) => {
        console.log("eewhrkjhewjkr", response);
        let listResponseTrip = [];
        for (var key in response.response) {
          let obj = {
            name: "",
            data: "",
          };
          obj.name = key;
          obj.data = response.response[key];
          listResponseTrip.push(obj);
        }
        this.allReportType = listResponseTrip;

        this.reportResponseWcBasedData =
          response.response.TRIPRESPONSE_POPUP1_POUP2;
        this.reportResponseWcBasedMrfData = response.response.TRIPRESPONSE_MRF;

        if (
          (this.reportResponseWcBasedData == undefined ||
            this.reportResponseWcBasedData == null) &&
          (this.reportResponseWcBasedMrfData == undefined ||
            this.reportResponseWcBasedMrfData == null)
        ) {
          this.resetData();
          return;
        }
        //short fix
        if (
          this.wcSelectId == undefined ||
          (localStorage.getItem("role") != "bmcsuperadmin" &&
            localStorage.getItem("role") != "bmcadmin" &&
            localStorage.getItem("wcId") != "0")
        ) {
          this.wcSelectId = localStorage.getItem("wcId");
        }
        console.log("wc selected ", this.selectWc, this.selectZone);
        if (this.selectWc == "Allwc" && this.selectZone == "Allzone") {
          this.wcBasedData = this.reportResponseWcBasedData;
          this.zoneBasedData = this.reportResponseWcBasedData;
          this.wcBasedMrfData = this.reportResponseWcBasedMrfData;
        } else {
          if (this.reportResponseWcBasedData != undefined) {
            console.log("wc selected ", this.wcSelectId);
            this.wcBasedData = this.reportResponseWcBasedData.filter(
              (element: any) => {
                return element.wealthCenterId == this.wcSelectId;
              }
            );
            // Trip Data Based on Zone..............
            this.zoneBasedData = this.reportResponseWcBasedData.filter(
              (element: any) => {
                return element.zoneId == this.zoneSelectId;
              }
            );
          }
          if (this.reportResponseWcBasedMrfData != undefined) {
            this.wcBasedMrfData = this.reportResponseWcBasedMrfData.filter(
              (element: any) => {
                return element.wealthCenterId == this.wcSelectId;
              }
            );
          }
          if (
            this.wcBasedMrfData != undefined &&
            this.wcBasedMrfData.length > 0
          ) {
            this.dataMap.set(
              "totalTodayWetWeightAllwc",
              this.wcBasedMrfData[0].totalWetWeight
            );
            this.dataMap.set(
              "totalWeeklyWetWeightAllwc",
              this.wcBasedMrfData[0].totalWeeklyWetWeight
            );
            this.dataMap.set(
              "totalMonthlylWetWeightAllwc",
              this.wcBasedMrfData[0].totalMonthlyWetWeight
            );
          } else {
            this.dataMap.set("totalTodayWetWeightAllwc", 0);
            this.dataMap.set("totalWeeklyWetWeightAllwc", 0);
            this.dataMap.set("totalMonthlylWetWeightAllwc", 0);
          }
        }

        let numberOfActiveTrip_: number = 0;
        let numberOfCompletedTrip_: number = 0;
        let totalDryWeight_: number = 0;
        let totalWetWeight_: number = 0;
        let totalMRFProcessed_: number = 0;
        let numberOfVehicles_: number = 0;

        if (this.wcBasedData != undefined && this.wcBasedData.length > 0) {
          this.wcBasedData.forEach((wcElement: any) => {
            numberOfActiveTrip_ =
              numberOfActiveTrip_ +
              Number(
                wcElement.numberOfActiveTrip.toString().replaceAll(",", "")
              );
            numberOfCompletedTrip_ =
              numberOfCompletedTrip_ +
              Number(
                wcElement.numberOfCompletedTrip.toString().replaceAll(",", "")
              );
            totalDryWeight_ =
              totalDryWeight_ +
              Number(wcElement.totalDryWeight.toString().replaceAll(",", ""));
            totalWetWeight_ =
              totalWetWeight_ +
              Number(wcElement.totalWetWeight.toString().replaceAll(",", ""));
            totalMRFProcessed_ =
              totalMRFProcessed_ +
              Number(
                wcElement.totalMRFProcessed.toString().replaceAll(",", "")
              );
            numberOfVehicles_ =
              numberOfVehicles_ +
              Number(wcElement.numberOfVehicles.toString().replaceAll(",", ""));
          });

          this.dataMap.set("totalActiveTrip", numberOfActiveTrip_);
          this.dataMap.set("totalCompletedTrip", numberOfCompletedTrip_);
          this.dataMap.set("totalDryWeight", totalDryWeight_);
          this.dataMap.set("totalWetWeight", totalWetWeight_);
          this.dataMap.set("totalMRFWeight", totalMRFProcessed_);
          this.dataMap.set("numberOfVehicles", numberOfVehicles_);
          this.dataMap.set("numberOfActiveTrip", numberOfActiveTrip_);
          this.dataMap.set("numberOfMaintenanceVehicle", 0);
          this.dataMap.set(
            "numberOfAvailableVehicle",
            numberOfVehicles_ - Number(numberOfActiveTrip_)
          );

          this.createChart4([
            this.dataMap.get("numberOfVehicles"),
            this.dataMap.get("numberOfActiveTrip"),
            0,
            this.dataMap.get("numberOfVehicles") -
              this.dataMap.get("numberOfActiveTrip"),
          ]);
        }

        if (this.selectWc == "Allwc" && this.selectZone == "Allzone") {
          this.dataMap.set(
            "totalDryWeight",
            eventType == "MONTHLY"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalMonthlyDryWeight.toString().replaceAll(",", "")
                    ),
                  0
                )
              : eventType == "WEEKLY"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalWeeklyDryWeight.toString().replaceAll(",", "")
                    ),
                  0
                )
              : eventType == "TODAY"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(item.totalDryWeight.toString().replaceAll(",", "")),
                  0
                )
              : eventType == "FIRST_HALF"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalFirstHalfDryWeight
                        .toString()
                        .replaceAll(",", "")
                    ),
                  0
                )
              : eventType == "SECOND_HALF"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalSecondHalfDryWeight
                        .toString()
                        .replaceAll(",", "")
                    ),
                  0
                )
              : this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(item.totalDryWeight.toString().replaceAll(",", "")),
                  0
                )
          );

          this.dataMap.set(
            "totalWetWeight",
            eventType == "MONTHLY"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalMonthlyWetWeight.toString().replaceAll(",", "")
                    ),
                  0
                )
              : eventType == "WEEKLY"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalWeeklyWetWeight.toString().replaceAll(",", "")
                    ),
                  0
                )
              : eventType == "TODAY"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(item.totalWetWeight.toString().replaceAll(",", "")),
                  0
                )
              : eventType == "FIRST_HALF"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalFirstHalfWetWeight
                        .toString()
                        .replaceAll(",", "")
                    ),
                  0
                )
              : eventType == "SECOND_HALF"
              ? this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(
                      item.totalSecondHalfWetWeight
                        .toString()
                        .replaceAll(",", "")
                    ),
                  0
                )
              : this.wcBasedMrfData.reduce(
                  (sum: number, item: any) =>
                    sum +
                    Number(item.totalWetWeight.toString().replaceAll(",", "")),
                  0
                )
          );

          this.dataMap.set(
            "totalTodayWetWeightAllwc",
            this.wcBasedMrfData.reduce(
              (sum: number, item: any) =>
                sum +
                Number(item.totalWetWeight.toString().replaceAll(",", "")),
              0
            )
          );
          this.dataMap.set(
            "totalWeeklyWetWeightAllwc",
            this.wcBasedMrfData.reduce(
              (sum: number, item: any) =>
                sum +
                Number(
                  item.totalWeeklyWetWeight.toString().replaceAll(",", "")
                ),
              0
            )
          );
          this.dataMap.set(
            "totalMonthlylWetWeightAllwc",
            this.wcBasedMrfData.reduce(
              (sum: number, item: any) =>
                sum +
                Number(
                  item.totalMonthlyWetWeight.toString().replaceAll(",", "")
                ),
              0
            )
          );
        } else {
          if (
            this.wcBasedMrfData != undefined &&
            this.wcBasedMrfData.length > 0
          ) {
            this.dataMap.set(
              "totalDryWeight",
              eventType == "MONTHLY"
                ? this.wcBasedMrfData[0].totalMonthlyDryWeight
                : eventType == "WEEKLY"
                ? this.wcBasedMrfData[0].totalWeeklyDryWeight
                : eventType == "TODAY"
                ? this.wcBasedMrfData[0].totalDryWeight
                : eventType == "FIRST_HALF"
                ? this.wcBasedMrfData[0].totalFirstHalfDryWeight
                : eventType == "SECOND_HALF"
                ? this.wcBasedMrfData[0].totalSecondHalfDryWeight
                : 0
            );
            this.dataMap.set(
              "totalWetWeight",
              eventType == "MONTHLY"
                ? this.wcBasedMrfData[0].totalMonthlyWetWeight
                : eventType == "WEEKLY"
                ? this.wcBasedMrfData[0].totalWeeklyWetWeight
                : eventType == "TODAY"
                ? this.wcBasedMrfData[0].totalWetWeight
                : eventType == "FIRST_HALF"
                ? this.wcBasedMrfData[0].totalFirstHalfWetWeight
                : eventType == "SECOND_HALF"
                ? this.wcBasedMrfData[0].totalSecondHalfWetWeight
                : 0
            );
          }
        }
      });
  }

  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
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
            data: [100, 0, 0],
            backgroundColor: ["#0FA8FC", "#E93228", "#18D87F"],
          },
          {
            data: [60, 40, 0],
            backgroundColor: ["#E93228", "#E8E8E8", "#E8E8E8"],
          },
          {
            data: [40, 60, 0],
            backgroundColor: ["#18D87F", "#E8E8E8", "#E8E8E8"],
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

  createChart2(lebelsArr: any[], dataArr: any[]) {
    this.chart2 = new Chart("chart-e017e3c3-333c-4ca7-8b20-56d7b361c29b", {
      type: "line",
      data: {
        labels: [
          "2022",
          "2021",
          "2020",
          "2019",
          "2018",
          "2017",
          "2016",
          "2015",
          "2014",
          "2013",
          "2012",
          "2011",
        ],
        datasets: [
          {
            label: "Dry Garbage",
            data: [10, 20, 55, 65, 55, 40, 50, 20, 20, 30, 40, 30],
            backgroundColor: "rgba(131,55,235, 0.5)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Wet Garbage",
            data: [20, 30, 50, 60, 50, 60, 30, 20, 30, 40, 30, 40],
            backgroundColor: "rgba(247,36,133, 0.5)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Inert Material",
            data: [30, 36, 40, 50, 70, 50, 40, 30, 40, 50, 45, 50],
            backgroundColor: "rgba(255,183,5, 0.5)",
            fill: true,
            tension: 0.4,
          },
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
            propagate: true,
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

  createChart4(dataArr: any[]) {
    if (this.chart4 != null && this.chart4 != undefined) {
      this.chart4.destroy();
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

  createChart2DataSet() {
    this.dataSetChatArr = [];
    let chartModel = {
      label: "",
      data: [0],
      backgroundColor: "#175CFF",
    };
    this.issueItems = this.reportRes.itemIssueNames;
    this.instockItems = this.reportRes.itemInStockNames;
    this.purchaseItems = this.reportRes.itemPurchaseNames;
    this.issueItems.forEach((issueItem) => {
      let issueStockObj = this.responseData.ISSUESTOCK._1;
      for (var key in issueStockObj[issueItem.toString()]) {
        let item = issueStockObj[issueItem.toString()][key]["itemName"];
        let quantity = issueStockObj[issueItem.toString()][key]["quantity"];
        if (this.issueItemsMap.has(item)) {
          this.issueItemsMap.set(item, this.issueItemsMap.get(item) + quantity);
        } else {
          this.issueItemsMap.set(item, quantity);
        }
      }
    });
    chartModel.label = "Issue Stock Items";
    this.issueItems.forEach((issueItem) => {
      this.dataSetArr.push(
        this.issueItemsMap.get(issueItem) != undefined
          ? this.issueItemsMap.get(issueItem)
          : 0
      );
    });
    chartModel.data = this.dataSetArr;
    chartModel.backgroundColor = "#FF0069";
    this.dataSetChatArr.push(chartModel);
    //console.log(issueItemsMap)
    chartModel = {
      label: "",
      data: [0],
      backgroundColor: "#175CFF",
    };
    this.instockItems.forEach((instockItem) => {
      let inStockObj = this.responseData.INSTOCK._1;
      for (var key in inStockObj[instockItem.toString()]) {
        let item = inStockObj[instockItem.toString()][key]["itemName"];
        let quantity = inStockObj[instockItem.toString()][key]["quantity"];
        if (this.inStockMap.has(item)) {
          this.inStockMap.set(item, this.inStockMap.get(item) + quantity);
        } else {
          this.inStockMap.set(item, quantity);
        }
      }
    });
    this.dataSetArr = [];
    chartModel.label = "InStock Items";
    this.instockItems.forEach((stockItem) => {
      this.dataSetArr.push(
        this.inStockMap.get(stockItem) != undefined
          ? this.inStockMap.get(stockItem)
          : 0
      );
    });
    chartModel.data = this.dataSetArr;
    chartModel.backgroundColor = "#E5D05D";
    this.dataSetChatArr.push(chartModel);
    //console.log(inStockMap)
    chartModel = {
      label: "",
      data: [0],
      backgroundColor: "#175CFF",
    };

    this.purchaseItems.forEach((purchaseItem) => {
      let purchaseObj = this.responseData.PURCHASE._1;
      for (var key in purchaseObj[purchaseItem.toString()]) {
        let item = purchaseObj[purchaseItem.toString()][key]["itemName"];
        let quantity = purchaseObj[purchaseItem.toString()][key]["quantity"];
        if (this.purchaseMap.has(item)) {
          this.purchaseMap.set(item, this.purchaseMap.get(item) + quantity);
        } else {
          this.purchaseMap.set(item, quantity);
        }
      }
    });
    //console.log(purchaseMap)
    this.dataSetArr = [];
    chartModel.label = "Purchase Items";
    this.purchaseItems.forEach((purchaseItem) => {
      this.dataSetArr.push(
        this.purchaseMap.get(purchaseItem) != undefined
          ? this.purchaseMap.get(purchaseItem)
          : 0
      );
    });
    chartModel.data = this.dataSetArr;
    chartModel.backgroundColor = "#175CFF";
    this.dataSetChatArr.push(chartModel);
    ///console.log(inStockMap)
    chartModel = {
      label: "",
      data: [0],
      backgroundColor: "#175CFF",
    };
    //console.log( this.dataSetChatArr)
    this.createChart6();
  }

  createChart6() {
    let currDt = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    // this.form.controls['fromDate'].setValue(new Date());
    // this.form.controls['toDate'].setValue(new Date());
    this.inventoryFromDt = this.inventoryToDate = currDt ?? "";
    if (this.chart6 != null && this.chart6 != undefined) {
      this.chart6.destroy();
    }
    this.chart6 = new Chart("chart-029ea4bc-fac1-4296-b731-25bb7c6598ac34", {
      type: "bar",
      data: {
        labels: this.purchaseItems,
        datasets: this.dataSetChatArr,
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
        skipNull: true,
      },
    });
  }

  createChart5(dataArr: number[]) {
    this.inventoryDate =
      this.datePipe.transform(new Date(), "yyyy-MM-dd") ?? "";
    if (this.chart5 != null && this.chart5 != undefined) {
      this.chart5.destroy();
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

  // createChart5(dataArr: number[]) {
  //   this.inventoryDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? "";
  //   if (this.chart5 != null && this.chart5 != undefined) {
  //     this.chart5.destroy()
  //   }
  //   this.chart5 = new Chart("chart-029ea4bc-fac1-4296-b731-25bb7c6598ac", {
  //     type: "bar",
  //     data: {
  //       labels: ["Purchase", "Issue Stock", "In Stock"],
  //       datasets: [
  //         {
  //           label: "",
  //           data: dataArr,
  //           backgroundColor: ["#14A2F4", "#EE321F", "#12D881"],
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
}
