import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PitModel } from '../model/pit.model';
import { PitInitModel, SubmitWorkflowPayload, UpdatePitStatusPayload } from '../model/pitInit.model';

const environment = {


  URL: `http://15.207.62.200:9091`,  //prod url
  PIT_SERVICE_URL: 'http://15.207.62.200:8062/',
  getAllPit: 'pit/v1/getAllPitListByMccId',
  savePitInit: '/save/pitTransaction/data',
  submitWorkflowInit: 'pit/v1/pitWorkFlow',
  pitstatusUpdate: 'pit/v1/updatePitStatus',
//  http://15.207.62.200:9091/save/pitTransaction/data
 // URL: `http://localhost:9091`  //local ip
}

@Injectable({
  providedIn: 'root'
})
export class PitService {

  
  constructor(private http: HttpClient) { }

  getAllPitsByMcc(): Observable<PitModel> {
    let param = {
      "payload":{
         "mccId":1,
         "wcId":1
       }
     };

    let urlString = environment.PIT_SERVICE_URL + environment.getAllPit;
    return this.http.post<PitModel>(urlString,param);
  }

  savePitInitForCompost(inParam : String): Observable<PitModel> { 
    let urlString = environment.URL + environment.savePitInit;
    return this.http.post<PitModel>(urlString,inParam);
  }

  submitRequestForBatchBeforeCompost(inParam : SubmitWorkflowPayload): Observable<PitModel> { 
    let urlString = environment.PIT_SERVICE_URL + environment.submitWorkflowInit;
    return this.http.post<PitModel>(urlString,inParam);
  }

  updateRequestForStatusUpdate(inParam : UpdatePitStatusPayload): Observable<PitModel> { 
    let urlString = environment.PIT_SERVICE_URL + environment.pitstatusUpdate;
    return this.http.post<PitModel>(urlString,inParam);
  }
}
