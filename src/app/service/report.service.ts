
import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportGenerate } from '../model/pit.model';
import { environment } from 'src/environments/environment';


export class DeactivationDto {
        id: any
        activationStatus: Boolean = false
}


@Injectable({
        providedIn: 'root'
})
export class ReportService {
        deactivationDto: DeactivationDto = new DeactivationDto
        constructor(private http: HttpClient) { }

        get(path: string): any {
                return new Promise(async (resolve, reject) => {
                        try {
                                let url = `${environment.url}:${environment.port}` + path;
                                let callData = await this.http.get(url).toPromise();
                                resolve(callData);
                        } catch (error) {
                                reject(error);
                        }
                });
        }
        post(path: string, body: any): any {
                return new Promise(async (resolve, reject) => {
                        let url = `${environment.url}:${environment.port}` + path;
                        this.http.post(url, body)
                                .subscribe((callData: any) => {
                                        resolve(callData);
                                }, (error: any) => {
                                        reject(error);
                                });
                });
        }
        delete(path: string): any {
                return new Promise(async (resolve, reject) => {
                        try {
                                const url = `${environment.url}:${environment.port}` + path
                                console.log(url)
                                const res = await this.http.delete(url, { responseType: 'text' }).toPromise()
                                resolve(res);
                        } catch (error) {
                                reject(error);
                        }
                });
        }


        //Arbind code
        getInventoryReport(payload : ReportGenerate) {
             return this.http.post<any>(`${environment.url}:${environment.port}` + '/generate-report-inventory', payload);      
        }

        getGarbageReport(payload : ReportGenerate) {
                return this.http.post<any>(`${environment.url}:${environment.port}` + '/generate-report-garbage', payload);      
        }

        getTripReport(payload : ReportGenerate) {
                return this.http.post<any>(`${environment.url}:${environment.port}` + '/generate-report-trip', payload);      
        }
        getMrfReport(payload : ReportGenerate) {
                return this.http.post<any>(`${environment.url}:${environment.port}` + '/generate-report-mrf', payload);      
        }
        getMokhataReport(payload : ReportGenerate) {
                return this.http.post<any>(`${environment.url}:${environment.port}` + '/generate-report-mokhata', payload);      
        }
}