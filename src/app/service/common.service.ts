import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class DeactivationDto {
        id: any
        activationStatus: Boolean = false
}

const environment = {


        //        URL: `http://15.207.62.200:9091`,  //prod url
               LOGIN_SERVICE_URL: 'http://15.207.62.200:8062',

        URL: `http://localhost:9091`  //local ip
}

@Injectable({
        providedIn: 'root'
})
export class CommonService {
        deactivationDto: DeactivationDto = new DeactivationDto
        constructor(private http: HttpClient) { }

        get(path: string): any {
                return new Promise(async (resolve, reject) => {
                        try {
                                let url = environment.URL + path;
                                let callData = await this.http.get(url).toPromise();
                                resolve(callData);
                        } catch (error) {
                                reject(error);
                        }
                });
        }
        post(path: string, body: any): any {
                return new Promise(async (resolve, reject) => {
                        let url = environment.URL + path;
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
                                const url = environment.URL + path
                                console.log(url)
                                const res = await this.http.delete(url, { responseType: 'text' }).toPromise()
                                resolve(res);
                        } catch (error) {
                                reject(error);
                        }
                });
        }


        //manoj code


        addZone(data: any) {
                return this.http.post(environment.URL + '/zone/addZone', data);
        }

        getZoneAllData() {
                return this.http.get(environment.URL + '/zone/getAllZone')
        }

        deactivateZone(id: any) {
                return this.http.get(environment.URL + '/zone/deactivate?id=' + id)
        }
        deactivateWc(id: any) {
                return this.http.get(environment.URL + '/wc/deactivate?id=' + id)
        }
        getAllWcData() {
                return this.http.get(environment.URL + '/zone/getAllWc')
        }
        deactivateWard(id: any) {
                return this.http.get(environment.URL + '/ward/deactivate?id=' + id)
        }
        getAllWardData() {
                return this.http.get(environment.URL + '/zone/getAllWard')
        }
        deactivateMcc(id: any) {
                return this.http.get(environment.URL + '/mcc/deactivate?id=' + id)
        }
        getAllMccData() {
                return this.http.get(environment.URL + '/zone/getAllMcc')
        }
        deactivatePit(id: any) {
                return this.http.get(environment.URL + '/pit/deactivate?id=' + id)
        }
        getAllPitData() {
                return this.http.get(environment.URL + '/zone/getAllPit')
        }
        deactivateRoute(id: any) {
                return this.http.get(environment.URL + '/route/deactivate?id=' + id)
        }
        getAllRouteData() {
                return this.http.get(environment.URL + '/zone/getAllRoute')
        }
        getWcListByZoneId(id: any) {
                return this.http.get(environment.URL + '/get/all/wcData/by/zoneId?zoneId=' + id)
        }
        getWcById(id:any){
                return this.http.get(environment.URL+'/zone/getWcById/'+id)
        }
        getAllMccByWcId(id:any){
                return this.http.get(environment.URL+'/get/all/mcc/by/wcId?wcId='+id)
        }
        login(data:any){
                return this.http.post(environment.LOGIN_SERVICE_URL+'/api/v1/login',data)
        }
        getZoneById(id:any){
                return this.http.get(environment.URL+'/zone/getZoneById/'+id)
        }
        updateZone(item:any){
                return this.http.put(environment.URL+'/zone/updateZone',item)
        }
        updateWc(item:any){
                return this.http.put(environment.URL+'/zone/updateWc',item)
        }
        updateMcc(item:any){
                return this.http.put(environment.URL+'/zone/updateMcc',item)
        }
        updateRoute(item:any){
                return this.http.put(environment.URL+'/zone/updateRoute',item)
        }
        updateWard(item:any){
                return this.http.put(environment.URL+'/zone/updateWard',item)
        }
        updateGoods(item:any){
                return this.http.put(environment.URL+'/zone/updateGoods',item)
        }
        updateSubGood(item:any,subGoodId:any){
                return this.http.put(environment.URL+'/zone/updateGoodssub/'+subGoodId,item)
        }
        updateDriver(item:any){
                return this.http.put(environment.URL+'/zone/updateDriver',item)
        }
        getAllGoods(){
                return this.http.get(environment.URL+'/zone/getAllGoods')
        }
        getWardsCount(){
                return this.http.get(environment.URL+'/get/all/wards/count')
        }
}