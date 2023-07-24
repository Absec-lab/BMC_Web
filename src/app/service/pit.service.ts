import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReportGenerate, PitHistoryReq, PitModel, PitProcessMain, PitStageRoot,  pitPayload } from '../model/pit.model';
import { PitInitModel, SubmitWorkflowPayload, UpdatePitStatusPayload } from '../model/pitInit.model';
import { TodayTaskModel } from '../model/todaytask.model';
import { PitStatusModel } from '../model/pit-status.model';
import { environment } from 'src/environments/environment';



      const endpoint =  environment.url;  

const environmentVar = {

  URL: endpoint+':9091',  //dev url
  AUTH_SERVICE_URL: endpoint+':8064/bmcwastemanagement/auth/users/login',
  PIT_SERVICE_URL:  endpoint+':8062/',
  REPORT_SERVICE_URL: endpoint+':8065/',

  getAllPit: 'pit/v1/getAllPitListByMccId',
  savePitInit: 'pit/v1/savePitProcessDetails',
  getPitHistory: 'pit/v1/getPitProcessDetails',
  submitWorkflowInit: 'pit/v1/pitWorkFlow',
  pitstatusUpdate: 'pit/v1/updatePitStatus',
  reportService: 'generate-report',
}

@Injectable({
  providedIn: 'root'
})
export class PitService {

  public selectMccId : BehaviorSubject<number> = new BehaviorSubject(0);
  public selectWcName : BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  getAllPitsByMcc(pitPay : pitPayload): Observable<PitModel> {
    let param = pitPay;
    let urlString =   environmentVar.PIT_SERVICE_URL +'pit/v1/getAllPitListByMccId';
    return this.http.post<PitModel>(urlString, param);
  }

  savePitInitForCompost(inParam: PitInitModel , headerDict : any): Observable<PitInitModel> {
    console.log('  Request Pit Process :  ',inParam);
    const requestHeaders = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    let urlString = environmentVar.PIT_SERVICE_URL + environmentVar.savePitInit;
    return this.http.post<PitInitModel>(urlString, inParam , requestHeaders);
  }

  onFetchPitHistoryDetails(inParam: PitHistoryReq): Observable<PitProcessMain> {
    let urlString = environmentVar.PIT_SERVICE_URL + environmentVar.getPitHistory;
    return this.http.post<PitProcessMain>(urlString, inParam);
  }

  submitRequestForBatchBeforeCompost(inParam: SubmitWorkflowPayload): Observable<PitModel> {
    let urlString = environmentVar.PIT_SERVICE_URL + environmentVar.submitWorkflowInit;
    return this.http.post<PitModel>(urlString, inParam);
  }

  updateRequestForStatusUpdate(inParam: UpdatePitStatusPayload): Observable<PitModel> {
    let urlString = environmentVar.PIT_SERVICE_URL + environmentVar.pitstatusUpdate;
    return this.http.post<PitModel>(urlString, inParam);
  }

  
  onReportGenerate(inParam: ReportGenerate): Observable<PitModel> {
    let urlString = environmentVar.PIT_SERVICE_URL + environmentVar.reportService;
    return this.http.post<PitModel>(urlString, inParam);
  }

  getTodayTaskList(payload: {
    mccId: Number
  }) {
    return this.http.post<TodayTaskModel>(`${environmentVar.PIT_SERVICE_URL}pit/v1/getTodaysTaskView`, payload);
  }

  getAllPitStatus() {
    return this.http.get<PitStatusModel>(`${environmentVar.PIT_SERVICE_URL}pit/v1/getAllPitStatus`)
  }

  getAllPitStagesStatus(payload:any){
     return this.http.post<PitStageRoot>(`${environmentVar.PIT_SERVICE_URL}pit/v1/getPitAllStageDetails`,payload)
  }

  updatePitStatus(payload: {
    "pitId": Number,
    "operationStatus": Number,
    "remarks":string
  }) {
    return this.http.post<{code: Number; message:string;}>(`${environmentVar.PIT_SERVICE_URL}pit/v1/updatePitOperationStatus`, payload);
  }
}
