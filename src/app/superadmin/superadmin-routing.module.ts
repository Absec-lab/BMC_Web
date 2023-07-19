import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WealthCenterMasterComponent } from './wealth-center-master/wealth-center-master.component';
import { WardMasterComponent } from './ward-master/ward-master.component';
import { ZoneMasterComponent } from './zone-master/zone-master.component';
import { DryingYardMasterComponent } from './drying-yard-master/drying-yard-master.component';
import { MccMasterComponent } from './mcc-master/mcc-master.component';
import { PitMasterComponent } from './pit-master/pit-master.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { GoodsMasterComponent } from './goods-master/goods-master.component';
import { GoodsSubMasterComponent } from './goods-sub-master/goods-sub-master.component';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { DriverMasterComponent } from './driver-master/driver-master.component';
import { HelperMasterComponent } from './helper-master/helper-master.component';
import { LoginComponent } from './login/login.component';
import { GarbageComponent } from './garbage/garbage.component';
import { MrfComponent } from './mrf/mrf.component';
import { MrfTabComponent } from './mrf-tab/mrf-tab.component';
import { PitViewComponent } from './mcc/pit-view/pit-view.component';
import { TodayTaskComponent } from './mcc/today-task/today-task.component';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { DashboardOneComponent } from './dashboard-one/dashboard-one.component';
//import { DashboardOneComponent } from './portal-dashboards/dashboard-one/dashboard-one.component';
import { DashboardTwoComponent } from './portal-dashboards/dashboard-two/dashboard-two.component';
import { DashboardThreeComponent } from './portal-dashboards/dashboard-three/dashboard-three.component';
import { DashboardFourComponent } from './portal-dashboards/dashboard-four/dashboard-four.component';
import { TripDetailsComponent } from './drying-yard/trip-details/trip-details.component';
import { CompostDryingComponent } from './drying-yard/compost-drying/compost-drying.component';
import { DryCompostWeighmentComponent } from './drying-yard/dry-compost-weighment/dry-compost-weighment.component';
import { CompostMaterialPackagingComponent } from './drying-yard/compost-material-packaging/compost-material-packaging.component';
import { ItemCategoryMasterComponent } from './item-category-master/item-category-master.component';
import { ItemNameMasterComponent } from './item-name-master/item-name-master.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ManpowerComponent } from './manpower/manpower.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { VehicleManagementComponent } from './vehicle-management/vehicle-management.component';
import { DashboardFiveComponent } from './portal-dashboards/dashboard-five/dashboard-five.component';
import { TripStatusReportComponent } from './trip-status-report/trip-status-report.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path: 'superadmin/dashboard',component: DashboardComponent},
  {path: 'superadmin/zone-master',component: ZoneMasterComponent},
  {path: 'superadmin/drying-yard-master',component: DryingYardMasterComponent},
  {path: 'superadmin/wealth-center-master',component: WealthCenterMasterComponent},
  {path: 'superadmin/ward-master',component: WardMasterComponent},
  {path: 'superadmin/mcc-master',component: MccMasterComponent},
  {path: 'superadmin/pit-master',component: PitMasterComponent},
  {path: 'superadmin/route-master',component: RouteMasterComponent},
  {path: 'superadmin/goods-master',component: GoodsMasterComponent},
  {path: 'superadmin/goods-sub-master',component: GoodsSubMasterComponent},
  {path: 'superadmin/vehicle-master',component: VehicleMasterComponent},
  {path: 'superadmin/driver-master',component: DriverMasterComponent},
  {path: 'superadmin/helper-master',component: HelperMasterComponent},
  {path: 'superadmin/garbage',component: GarbageComponent}, 
  {path: 'superadmin/mrf',component: MrfComponent},
  {path: 'superadmin/mrf-tab',component: MrfTabComponent},
  {path: 'superadmin/mcc/pit-view',component: PitViewComponent},
  {path: 'superadmin/mcc/today-task',component: TodayTaskComponent},
  {path:'map/view',component:MapComponent},
  {path:'superadmin/home',component:HomeComponent},
  {path: 'superadmin/dashboard-one',component: DashboardOneComponent},
  {path: 'superadmin/portal-dashboards/dashboard-one',component: DashboardOneComponent},
  {path: 'superadmin/portal-dashboards/dashboard-two',component: DashboardTwoComponent},
  {path: 'superadmin/portal-dashboards/dashboard-three',component: DashboardThreeComponent},
  {path: 'superadmin/portal-dashboards/dashboard-four',component: DashboardFourComponent},
  {path: 'superadmin/portal-dashboards/dashboard-five',component: DashboardFiveComponent},
  {path: 'superadmin/drying-yard/trip-details',component: TripDetailsComponent},
  {path: 'superadmin/drying-yard/compost-drying',component: CompostDryingComponent},
  {path: 'superadmin/drying-yard/dry-compost-weighment',component: DryCompostWeighmentComponent}, 
  {path: 'superadmin/drying-yard/compost-material-packaging',component: CompostMaterialPackagingComponent},   
  {path: 'superadmin/item-category-master',component: ItemCategoryMasterComponent},
  {path: 'superadmin/item-name-master',component: ItemNameMasterComponent}, 
  {path: 'superadmin/inventory',component: InventoryComponent}, 
  {path: 'superadmin/manpower',component: ManpowerComponent}, 
  {path:'superadmin/disclaimer',component:DisclaimerComponent},
  {path:'superadmin/vehicle/management',component:VehicleManagementComponent},
  {path:'superadmin/trip-status-report',component:TripStatusReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
