import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WealthCenterMasterComponent } from "./wealth-center-master/wealth-center-master.component";
import { WardMasterComponent } from "./ward-master/ward-master.component";
import { ZoneMasterComponent } from "./zone-master/zone-master.component";
import { MccMasterComponent } from "./mcc-master/mcc-master.component";
import { PitMasterComponent } from "./pit-master/pit-master.component";
import { RouteMasterComponent } from "./route-master/route-master.component";
import { GoodsMasterComponent } from "./goods-master/goods-master.component";
import { GoodsSubMasterComponent } from "./goods-sub-master/goods-sub-master.component";
import { VehicleMasterComponent } from "./vehicle-master/vehicle-master.component";
import { DriverMasterComponent } from "./driver-master/driver-master.component";
import { PitViewComponent } from "./mcc/pit-view/pit-view.component";
import { MrfComponent } from "./mrf/mrf.component";
import { TripDetails1Component } from "./garbage/trip-details1/trip-details1.component";
import { TripDetails2Component } from "./garbage/trip-details2/trip-details2.component";
import { TripDetails3Component } from "./garbage/trip-details3/trip-details3.component";
import { TripDetails4Component } from "./garbage/trip-details4/trip-details4.component";
import { TripDetails5Component } from "./garbage/trip-details5/trip-details5.component";
import { TripDetails6Component } from "./garbage/trip-details6/trip-details6.component";
import { PopupsComponent } from "./popups/popups.component";
import { TodayTaskComponent } from "./mcc/today-task/today-task.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "superadmin/dashboard",
    component: DashboardComponent,
  },
  {
    path: "superadmin/zone-master",
    component: ZoneMasterComponent,
  },
  {
    path: "superadmin/wealth-center-master",
    component: WealthCenterMasterComponent,
  },
  {
    path: "superadmin/ward-master",
    component: WardMasterComponent,
  },
  {
    path: "superadmin/mcc-master",
    component: MccMasterComponent,
  },
  {
    path: "superadmin/pit-master",
    component: PitMasterComponent,
  },
  {
    path: "superadmin/route-master",
    component: RouteMasterComponent,
  },
  {
    path: "superadmin/goods-master",
    component: GoodsMasterComponent,
  },
  {
    path: "superadmin/goods-sub-master",
    component: GoodsSubMasterComponent,
  },
  {
    path: "superadmin/vehicle-master",
    component: VehicleMasterComponent,
  },
  {
    path: "superadmin/driver-master",
    component: DriverMasterComponent,
  },
  {
    path: "superadmin/mcc/pit-view",
    component: PitViewComponent,
  },
  {
    path: "superadmin/mrf",
    component: MrfComponent,
  },
  {
    path: "superadmin/garbage/trip-details1",
    component: TripDetails1Component,
  },
  {
    path: "superadmin/garbage/trip-details2",
    component: TripDetails2Component,
  },
  {
    path: "superadmin/garbage/trip-details3",
    component: TripDetails3Component,
  },
  {
    path: "superadmin/garbage/trip-details4",
    component: TripDetails4Component,
  },
  {
    path: "superadmin/garbage/trip-details5",
    component: TripDetails5Component,
  },
  {
    path: "superadmin/garbage/trip-details6",
    component: TripDetails6Component,
  },
  {
    path: "superadmin/popups",
    component: PopupsComponent,
  },
  {
    path: "superadmin/mcc/today-task",
    component: TodayTaskComponent,
  },
  {
    path: "superadmin/home",
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminRoutingModule {}
