import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PitHistoryReq, PitModel, PitProcessMain, PitStageRoot } from '../model/pit.model';
import { PitInitModel, SubmitWorkflowPayload, UpdatePitStatusPayload } from '../model/pitInit.model';
import { TodayTaskModel } from '../model/todaytask.model';
import { PitStatusModel } from '../model/pit-status.model';

const environment = {

  URL: `http://localhost:9091`,  //prod url
  PIT_SERVICE_URL: 'http://localhost:8062/',
  //URL: `http://15.207.62.200:9091`,  //prod url
  //PIT_SERVICE_URL: 'http://15.207.62.200:8062/',
  AUTH_SERVICE_URL: 'http://15.207.62.200:8064/bmcwastemanagement/auth/users/login',
  getAllPit: 'pit/v1/getAllPitListByMccId',
  savePitInit: 'pit/v1/savePitProcessDetails',
  getPitHistory: 'pit/v1/getPitProcessDetails',
  submitWorkflowInit: 'pit/v1/pitWorkFlow',
  pitstatusUpdate: 'pit/v1/updatePitStatus',

}

@Injectable({
  providedIn: 'root'
})
export class PitService {


  constructor(private http: HttpClient) { }

  getAllPitsByMcc(): Observable<PitModel> {
    let param = {
      "payload": {
        "mccId": 1,
        "wcId": 1
      }
    };
    let urlString =   environment.PIT_SERVICE_URL +'pit/v1/getAllPitListByMccId';
    return this.http.post<PitModel>(urlString, param);
  }

  savePitInitForCompost(inParam: PitInitModel): Observable<PitInitModel> {
    let urlString = environment.PIT_SERVICE_URL + environment.savePitInit;
    return this.http.post<PitInitModel>(urlString, inParam);
  }

  onFetchPitHistoryDetails(inParam: PitHistoryReq): Observable<PitProcessMain> {
    let urlString = environment.PIT_SERVICE_URL + environment.getPitHistory;
    return this.http.post<PitProcessMain>(urlString, inParam);
  }

  submitRequestForBatchBeforeCompost(inParam: SubmitWorkflowPayload): Observable<PitModel> {
    let urlString = environment.PIT_SERVICE_URL + environment.submitWorkflowInit;
    return this.http.post<PitModel>(urlString, inParam);
  }

  updateRequestForStatusUpdate(inParam: UpdatePitStatusPayload): Observable<PitModel> {
    let urlString = environment.PIT_SERVICE_URL + environment.pitstatusUpdate;
    return this.http.post<PitModel>(urlString, inParam);
  }

  getTodayTaskList(payload: {
    mccId: Number,
    wcId: Number
  }) {
    return this.http.post<TodayTaskModel>(`${environment.PIT_SERVICE_URL}pit/v1/getTodaysTaskView`, payload);
  }

  getAllPitStatus() {
    return this.http.get<PitStatusModel>(`${environment.PIT_SERVICE_URL}pit/v1/getAllPitStatus`)
  }

  getAllPitStagesStatus(payload:any){
     return this.http.post<PitStageRoot>(`${environment.PIT_SERVICE_URL}pit/v1/getPitAllStageDetails`,payload)
     //return this.http.post<PitStageRoot>(`http://localhost:8062/pit/v1/getPitAllStageDetails`,payload)
  }

  updatePitStatus(payload: {
    "pitId": Number,
    "operationStatus": Number,
    "remark":string
  }) {
    return this.http.post<{code: Number; message:string;}>(`${environment.PIT_SERVICE_URL}pit/v1/updatePitOperationStatus`, payload);
  }
}
