import { Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class DeactivationDto {
        id: any
        activationStatus: Boolean = false
}


@Injectable({
        providedIn: 'root'
})
export class CommonService {



     endpoint =  `http://15.207.62.200`;   //DEV
     //  endpoint = 'http://43.204.240.44'; //PROD
      //endpoint = `http://localhost`; //LOCCAL




 public environment = {
        URL:  this.endpoint+":9091",  //prod url
        LOGIN_SERVICE_URL: this.endpoint+":8064/bmcwastemanagement/auth/users/login"
    //  LOGIN_SERVICE_URL: this.endpoint+":8064/bmcwastemanagement/auth/users/login"
       
 }
        
        deactivationDto: DeactivationDto = new DeactivationDto
        constructor(private http: HttpClient) { }
        public dashboardDetailsV2:any
        get(path: string): any {
                return new Promise(async (resolve, reject) => {
                        try {
                                let url = this.environment.URL + path;
                                let callData = await this.http.get(url).toPromise();
                                resolve(callData);
                        } catch (error) {
                                reject(error);
                        }
                });
        }
        post(path: string, body: any): any {
                return new Promise(async (resolve, reject) => {
                        let url = this.environment.URL + path;
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
                                const url = this.environment.URL + path
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
                return this.http.post(this.environment.URL + '/inventory/addItemCategory', data);
        }
        getAllItemCategory() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemCategory/' + localStorage.getItem("wcId"))
        }
        getItemCategoryById() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemCategory')
        }

        getItemNameyByCategoryId() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemCategory')
        }

        getAllItemNameyByCategoryId(id: any) {
                return this.http.get(this.environment.URL + '/inventory/get/ItemName/by/ItemCategory/Id/{itemcategoryId}?itemcategoryId=' + id)
        }

        deactivateCategory(id: any) {
                return this.http.get(this.environment.URL + '/itemCategory/deactivate?id=' + id)
        }
        addZone(data: any) {
                return this.http.post(this.environment.URL + '/zone/addZone', data);
        }
        addDryingYard(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addDryingyard', data);
        }
        getZoneAllData() {
                return this.http.get(this.environment.URL + '/zone/getAllZone')
        }
        getDryingYardAllData() {
                return this.http.get(this.environment.URL + '/inventory/getAllDryingyard/' + localStorage.getItem("wcId"))
        }
        deactivateDryingYard(id: any) {
                return this.http.get(this.environment.URL + '/dryingyard/deactivate?id=' + id)
        }
        deactivateZone(id: any) {
                return this.http.get(this.environment.URL + '/zone/deactivate?id=' + id)
        }
        deactivateWc(id: any) {
                return this.http.get(this.environment.URL + '/wc/deactivate?id=' + id)
        }
        deactivateDriver(id: any) {
                return this.http.get(this.environment.URL + '/driver/deactivate?id=' + id)
        }
        deactivateItemName(id: any) {
                return this.http.get(this.environment.URL + '/itemName/deactivate?id=' + id)
        }
        getAllWcData() {
                return this.http.get(this.environment.URL + '/zone/getAllWc/' + localStorage.getItem("wcId"))
        }
        
        getAllItemNameData() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemName')
        }
        deactivateWard(id: any) {
                return this.http.get(this.environment.URL + '/ward/deactivate?id=' + id)
        }
        getAllWardData() {
                return this.http.get(this.environment.URL + '/zone/getAllWard')
        }
        deactivateMcc(id: any) {
                return this.http.get(this.environment.URL + '/mcc/deactivate?id=' + id)
        }
        getAllMccData() {
                return this.http.get(this.environment.URL + '/zone/getAllMcc')
        }
        deactivatePit(id: any) {
                return this.http.get(this.environment.URL + '/pit/deactivate?id=' + id)
        }
        getAllPitData() {
                return this.http.get(this.environment.URL + '/zone/getAllPit')
        }
        deactivateRoute(id: any) {
                return this.http.get(this.environment.URL + '/route/deactivate?id=' + id)
        }
        getAllRouteData() {
                return this.http.get(this.environment.URL + '/zone/getAllRoute/' + localStorage.getItem("wcId"))
        }
        getWcListByZoneId(id: any) {
                return this.http.get(this.environment.URL + '/get/all/wcData/by/zoneId?zoneId=' + id)
        }
        getWcById(id: any) {
                return this.http.get(this.environment.URL + '/zone/getWcById/' + id)
        }
        getAllMccByWcId(id: any) {
                return this.http.get(this.environment.URL + '/get/all/mcc/by/wcId?wcId=' + id)
        }
        login(data: any) {
                //  return this.http.post('http://15.207.62.200:8064/bmcwastemanagement/auth/users/login' , data)
                return this.http.post(this.environment.LOGIN_SERVICE_URL, data)

        }
        getZoneById(id: any) {
                return this.http.get(this.environment.URL + '/zone/getZoneById/' + id)
        }
        updateZone(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateZone', item)
        }
        updateDryingYard(item: any) {
                return this.http.put(this.environment.URL + '/inventory/updateDryingyard', item)
        }
        updateWc(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateWc', item)
        }
        updateMcc(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateMcc', item)
        }
        updateRoute(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateRoute', item)
        }
        updateVehicle(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateRoute', item)
        }
        updateWard(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateWard', item)
        }
        updateGoods(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateGoods', item)
        }
        updateSubGood(item: any, subGoodId: any) {
                debugger;
                return this.http.put(this.environment.URL + '/zone/updateGoodssub/', item)
        }
        updateDriver(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateDriver', item)
        }
        updateHelper(item: any) {
                return this.http.put(this.environment.URL + '/zone/updateHelper', item)
        }
        updateItemCategory(item: any) {
                return this.http.put(this.environment.URL + '/inventory/updateItemCategory', item)
        }
        getAllGoods(wcId: any) {
                let wcId_ = localStorage.getItem('role') != 'bmcadmin' ? wcId : 0 
                return this.http.get(this.environment.URL + '/zone/getAllGoods/' + wcId_)
        }
        getWardsCount() {
                return this.http.get(this.environment.URL + '/get/all/wards/count')
        }
        getActiveTrip() {
                return this.http.get(this.environment.URL + '/get/active/trip/' + localStorage.getItem("wcId"))
        }
        getCompletedTrips() {
                return this.http.get(this.environment.URL + '/get/CompleteTodayByWcId/trip/' + localStorage.getItem("wcId"))
        }
        getAllItemPurchase() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemPurchase/' + localStorage.getItem("wcId"))
        }
        getAllItemIssue() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemIssuse/' + localStorage.getItem("wcId"))
        }
        getVehicleByVehicleNumber(vehicleNo: any) {
                return this.http.get(this.environment.URL + '/get/vehicle/by/vehicle/number?vehicleNumber=' + vehicleNo)
        }
        getTripByVehicleNumber(vehicleNo: any) {
                return this.http.get(this.environment.URL + '/get/trip/by/vehicle/number?vehicleNumber=' + vehicleNo)
        }
        createTrip(data: any) {
                return this.http.post(this.environment.URL + '/create/trip', data)
        }
        updateTrip(data: any) {
                return this.http.put(this.environment.URL + '/update/trip', data)
        }
        getAllSubGood(wcId: number) {
                return this.http.get(this.environment.URL + '/zone/getAllGoodssub/' + wcId)
        }
        getAllDryingYard() {
                return this.http.get(this.environment.URL + '/inventory/getAllDryingyard/'+ localStorage.getItem("wcId"))
        }
        saveCompostDrying(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addDryingCompost', data)
        }
        saveMokathaMoveToGodown(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addMokhatamovetogodown', data)
        }
        saveMrfData(data: any) {
                return this.http.post(this.environment.URL + '/zone/addMrf', data)
        }
        saveStockData(data: any) {
             
                return this.http.post(this.environment.URL + '/zone/addStockData', data)
        }
        updateMrf(data: any) {
                return this.http.post(this.environment.URL + '/zone/updateMrf', data)
        }
        updateMrfLatest(data: any) {
                       return this.http.put(this.environment.URL + '/zone/updateMrf', data)
                //     return this.http.put('http://localhost:9091/zone/updateMrf', data)
         }
        getAllMrf(wcId: any) {
                return this.http.get(this.environment.URL + '/zone/getAllMrf/' + wcId)
        }
        deactivateVehicle(id: any) {
                return this.http.get(this.environment.URL + '/vehicle/deactivate?id=' + id)
        }
        getAllActiveVehicle() {
                return this.http.get(this.environment.URL + '/getAll/vehicle/')
        }
        getAllDriverList() {
                return this.http.get(this.environment.URL + '/zone/getAllDriver/' + localStorage.getItem("wcId"))
        }
        getAllGodownList() {
                return this.http.get(this.environment.URL + '/inventory/getAllGodown/' + localStorage.getItem("wcId"))
        }
        getAllDriverByVehicleId(id: any) {
                return this.http.get(this.environment.URL + '/get/Driver/by/' + id)
                // return  this.http.get(this.environment.URL+'/get/vehicle/by/driver/Id/{driverId}?driverId='+id)
        }
        getAllWcVehicle(id: any) {
                return this.http.get(this.environment.URL + '/get/vehicle/by/wc/Id/{wcId}?wcId=' + id)
        }
        getAllSubGoodByGoodId(id: any) {
                return this.http.get(this.environment.URL + '/zone/get/subgood/by/good/Id/goodId?goodId=' + id)
        }
        getAllDryingYardByWcId(id: any) {
                return this.http.get(this.environment.URL + '/zone/get/subgood/by/good/Id?goodId=' + id)
        }
        deactivateMrf(id: any) {
                return this.http.get(this.environment.URL + '/mrf/deactivate?id=' + id)
        }
        getAllHelper() {
                return this.http.get(this.environment.URL + '/zone/getAllHelper')
        }
        updateDryingCompost(data: any) {
                return this.http.put(this.environment.URL + '/inventory/updatewetCompostWtInDryingYard', data)
        }
        saveComposeWeightmnent(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addCompostWtmt', data)
        }
        getAllUnit() {
                return this.http.get(this.environment.URL + '/inventory/getAllUnit')
        }
        saveCompostPacking(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addCompostPackaging', data)
        }
        getAllCompostPacking() {
                return this.http.get(this.environment.URL + '/inventory/getAllCompostPackaging')
        }
        addItemPurchase(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addItemPurchase', data)
        }
        addItemIssue(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addItemIssuse', data)
        }
        
        getAllActiveTripInGraveYardFotTTS() {
                return this.http.get(this.environment.URL + '/inventory/get/all/dryingyard/active/trip/for/tts/' + localStorage.getItem('wcId'))
        }

        getAllCompletedTripInGraveYardForTTS() {
                return this.http.get(this.environment.URL + '/inventory/get/all/dryingyard/completed/trip/for/tts/' + localStorage.getItem('wcId'))
        }

        getAllActiveTripInDryingYardForyingYardUser() {
                return this.http.get(this.environment.URL + '/inventory/get/all/dryingyard/active/trip/for/dryingyard/user/' + localStorage.getItem('wcId'))
        }

        getAllCompletedTripInGraveYardForDyingYardUser() {
                return this.http.get(this.environment.URL + '/inventory/get/all/dryingyard/completed/trip/for/dryingyard/user/' + localStorage.getItem('wcId'))
        }

        addItemName(data: any) {
                return this.http.post(this.environment.URL + '/inventory/addItemName', data)
        }
        getAllItemStockList() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemStock/' + localStorage.getItem("wcId"))
        }
        updateTripForceFully(data: any) {
                return this.http.put(this.environment.URL + '/update/trip/forcefully', data)
        }
        uploadFile(data: any) {
                return this.http.post(this.environment.URL + '/v1/uploadFile', data)
        }
        getAllItemName() {
                return this.http.get(this.environment.URL + '/inventory/getAllItemName/' + localStorage.getItem("wcId"))
        }
        getVehicleListByWcId() {
                return this.http.get(this.environment.URL + '/getAll/vehicle/' + localStorage.getItem("wcId"))
        }
        getHelperByWcId() {
                return this.http.get(this.environment.URL + '/zone/get/Helper/by/' + localStorage.getItem("wcId"))
        }
        getDashboardDetails() {
                return this.http.get(this.environment.URL + '/get/dashboard/details/' + localStorage.getItem("wcId"))
        }
        getAllHelperByWcId() {
                return this.http.get(this.environment.URL + '/zone/get/all/helper/by/wcId/' + localStorage.getItem("wcId"))
        }
        addRoute(data: any) {
               return this.http.post(this.environment.URL + '/zone/addRoute', data)
        }
        getAllMrfReports(){
                return this.http.get(this.environment.URL+'/get/mrf/transaction/value/'+localStorage.getItem("wcId"))
        }
        getMrfReportByWc(wcId:any){
                return this.http.get(this.environment.URL+'/get/mrf/transaction/value/'+wcId)
        }
        getMrfReportForAdmin(){
                return this.http.get(this.environment.URL+'/get/all/mrf/report/for/admin')
        }

        getDashboardDetailsForAdmin(){
                return this.http.get(this.environment.URL+'/get/mrf/transaction/for/admin')
        }
        getDashboardDetailsV2(wcId:any){

                return this.http.get(this.environment.URL + '/get/dashboard/details/' + wcId)
        }
        getAllMaterialType(){
                return this.http.get(this.environment.URL+'/get/all/material/type');
        }
        upateCompostDataInDryingYard(data:any){
                return this.http.post(this.environment.URL+'/inventory/update/compost/data/in/drying/yard',data)
        }
        updateItemNameMaster(data:any){
                return this.http.put(this.environment.URL+'/inventory/updateItemName',data)
        }
        getAllBailingList(){
                return this.http.get(this.environment.URL+'/zone/get/all/bailing/'+localStorage.getItem("wcId"))
        }
        addBailing(data:any){
                return this.http.post(this.environment.URL+'/zone/add/bailing',data)
        }
        getAllBailingStock(){
                return this.http.get(this.environment.URL+'/zone/getAll/bailing/stock/'+localStorage.getItem("wcId"))
        }
        soldBailing(data:any){
                return this.http.post(this.environment.URL+'/zone/sold/bailing',data)
        }
        mrfSoldBailing(data:any){
                
                return this.http.post(this.environment.URL+'/zone/mrf/bailling/sold',data)
        }
        getAllMrfSoldByWCId(wcId: any) {
                return this.http.get(this.environment.URL + '/zone/getAllMrfSoldByWCId/' + wcId)
        }
        getPerCostValueSubGdId(wcId: any) {
                return this.http.get(this.environment.URL + '/zone/getPerCostValueSubGdId/' + wcId)
        }

        updateVehicleMantenanceStatus(data:any){
                return this.http.post(this.environment.URL+'/update/vehicle/maintenance' , data)
        }
        getVehicleMainTenanceListByWcId() {
                return this.http.get(this.environment.URL + '/getAll/vehicle/maintenance/' + localStorage.getItem("wcId"))
        }
        getAllTts(){
                return this.http.get(this.environment.URL+'/zone/get/all/bailing/'+localStorage.getItem("wcId"))
        } 

}