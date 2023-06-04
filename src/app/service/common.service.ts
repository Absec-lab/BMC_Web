
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class DeactivationDto {
        id: any
        activationStatus: Boolean = false
}

const environment = {


              URL: `http://15.207.62.200:9091`,  //prod url
              //LOGIN_SERVICE_URL: 'http://15.207.62.200:8062',
             LOGIN_SERVICE_URL: 'http://15.207.62.200:8064/bmcwastemanagement/auth/users/login'
          //   LOGIN_SERVICE_URL: 'http://44.204.240.44:8064/bmcwastemanagement/auth/users/login',
         //    URL: `http://43.204.240.44:9091`  //Absec ip 
        // URL: `http://192.168.29.128:9091`
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
        addItemCategory(data: any) {
                return this.http.post(environment.URL + '/inventory/addItemCategory', data);
        }
        getAllItemCategory() {
                return this.http.get(environment.URL + '/inventory/getAllItemCategory')
        }
        deactivateCategory(id: any) {
                return this.http.get(environment.URL + '/zone/deactivate?id=' + id)
        }
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
        deactivateItemName(id: any) {
                return this.http.get(environment.URL + '/itemName/deactivate?id=' + id)
        }
        getAllWcData() {
                return this.http.get(environment.URL + '/zone/getAllWc')
        }
        getAllItemNameData() {
                return this.http.get(environment.URL + '/inventory/getAllItemName')
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
              //  return this.http.post('http://15.207.62.200:8064/bmcwastemanagement/auth/users/login' , data)
                return this.http.post('http://localhost:8064/bmcwastemanagement/auth/users/login' , data)
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
        updateVehicle(item:any){
                return this.http.put(environment.URL+'/zone/updateRoute',item)
        }
        updateWard(item:any){
                return this.http.put(environment.URL+'/zone/updateWard',item)
        }
        updateGoods(item:any){
                return this.http.put(environment.URL+'/zone/updateGoods',item)
        }
        updateSubGood(item:any,subGoodId:any){
                return this.http.put(environment.URL+'/zone/updateGoodssub/',item)
        }
        updateDriver(item:any){
                return this.http.put(environment.URL+'/zone/updateDriver',item)
        }
        updateHelper(item:any){
                return this.http.put(environment.URL+'/zone/updateHelper',item)
        }
        updateItemCategory(item:any){
                return this.http.put(environment.URL+'/inventory/updateItemCategory',item)
        }
        getAllGoods(){
                return this.http.get(environment.URL+'/zone/getAllGoods')
        }
        getWardsCount(){
                return this.http.get(environment.URL+'/get/all/wards/count')
        }
        getActiveTrip(){
                return this.http.get(environment.URL+'/get/active/trip')
        }
        getCompletedTrips(){
                return this.http.get(environment.URL+'/get/inActive/trip')
        }
        getVehicleByVehicleNumber(vehicleNo:any){
                return this.http.get(environment.URL+'/get/vehicle/by/vehicle/number?vehicleNumber='+vehicleNo)
        }
        getTripByVehicleNumber(vehicleNo:any){
                return this.http.get(environment.URL+'/get/trip/by/vehicle/number?vehicleNumber='+vehicleNo)
        }
        createTrip(data:any){
                return this.http.post(environment.URL+'/create/trip',data)
        }
        updateTrip(data:any){
                return this.http.put(environment.URL+'/update/trip',data)
        }
        getAllSubGood(){
                return this.http.get(environment.URL+'/zone/getAllGoodssub')
        }
        getAllDryingYard(){
                return this.http.get(environment.URL+'/zone/getAllDryingyard')
        }
        saveCompostDrying(data:any){
                return this.http.post(environment.URL+'/zone/addDryingCompost',data)
        }
        saveMrfData(data:any){
                return this.http.post(environment.URL+'/zone/addMrf',data)
        }
        updateMrf(data:any){
                return this.http.post(environment.URL+'/zone/updateMrf',data)
        }
        getAllMrf(){
                return this.http.get(environment.URL+'/zone/getAllMrf')
        }
        deactivateVehicle(id:any){
                return this.http.get(environment.URL+'/vehicle/deactivate?id='+id)
        }
        getAllActiveVehicle(){
                return this.http.get(environment.URL+'/getAll/vehicle')
        }
        getAllDriverList(){
               return  this.http.get(environment.URL+'/zone/getAllDriver')
        }
        getAllSubGoodByGoodId(id:any){
                return this.http.get(environment.URL+'/zone/get/subgood/by/good/Id?goodId='+id)
        }
        getAllDryingYardByWcId(id:any){
                return this.http.get(environment.URL+'/zone/get/subgood/by/good/Id?goodId='+id)
        }
        deactivateMrf(id:any){
                return this.http.get(environment.URL+'/mrf/deactivate?id='+id)
        }
        getAllHelper(){
                return this.http.get(environment.URL+'/zone/getAllHelper')
        }

}