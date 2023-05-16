import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WealthCenterMasterComponent } from './wealth-center-master/wealth-center-master.component';
import { WardMasterComponent } from './ward-master/ward-master.component';
import { ZoneMasterComponent } from './zone-master/zone-master.component';
import { MccMasterComponent } from './mcc-master/mcc-master.component';
import { PitMasterComponent } from './pit-master/pit-master.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { GoodsMasterComponent } from './goods-master/goods-master.component';
import { GoodsSubMasterComponent } from './goods-sub-master/goods-sub-master.component';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { DriverMasterComponent } from './driver-master/driver-master.component';
import { LoginComponent } from './login/login.component';
import { GarbageComponent } from './garbage/garbage.component';
import { MrfComponent } from './mrf/mrf.component';
import { PitViewComponent } from './mcc/pit-view/pit-view.component';

const routes: Routes = [
  {path: 'superadmin/dashboard',component: DashboardComponent},
  {path: 'superadmin/zone-master',component: ZoneMasterComponent},
  {path: 'superadmin/wealth-center-master',component: WealthCenterMasterComponent},
  {path: 'superadmin/ward-master',component: WardMasterComponent},
  {path: 'superadmin/mcc-master',component: MccMasterComponent},
  {path: 'superadmin/pit-master',component: PitMasterComponent},
  {path: 'superadmin/route-master',component: RouteMasterComponent},
  {path: 'superadmin/goods-master',component: GoodsMasterComponent},
  {path: 'superadmin/goods-sub-master',component: GoodsSubMasterComponent},
  {path: 'superadmin/vehicle-master',component: VehicleMasterComponent},
  {path: 'superadmin/driver-master',component: DriverMasterComponent},
  {path: 'superadmin/garbage',component: GarbageComponent},
  {path: 'superadmin/mrf',component: MrfComponent},
  {path: 'superadmin/mcc/pit-view',component: PitViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
