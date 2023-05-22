import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
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
import { PitViewComponent } from './mcc/pit-view/pit-view.component';
import { MrfComponent } from './mrf/mrf.component';
import { TripDetails1Component } from './garbage/trip-details1/trip-details1.component';
import { TripDetails2Component } from './garbage/trip-details2/trip-details2.component';
import { TripDetails3Component } from './garbage/trip-details3/trip-details3.component';
import { TripDetails4Component } from './garbage/trip-details4/trip-details4.component';
import { TripDetails5Component } from './garbage/trip-details5/trip-details5.component';
import { TripDetails6Component } from './garbage/trip-details6/trip-details6.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { PopupsComponent } from './popups/popups.component';
import { TodayTaskComponent } from './mcc/today-task/today-task.component';
import { HomeComponent } from './home/home.component';
import { DashboardOneComponent } from './portal-dashboards/dashboard-one/dashboard-one.component';
import { DashboardTwoComponent } from './portal-dashboards/dashboard-two/dashboard-two.component';
import { DashboardThreeComponent } from './portal-dashboards/dashboard-three/dashboard-three.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WealthCenterMasterComponent,
    WardMasterComponent,
    ZoneMasterComponent,
    MccMasterComponent,
    PitMasterComponent,
    RouteMasterComponent,
    GoodsMasterComponent,
    GoodsSubMasterComponent,
    VehicleMasterComponent,
    DriverMasterComponent,
    PitViewComponent,
    MrfComponent,
    TripDetails1Component,
    TripDetails2Component,
    TripDetails3Component,
    TripDetails4Component,
    TripDetails5Component,
    TripDetails6Component,
    PopupsComponent,
    TodayTaskComponent,
    HomeComponent,
    DashboardOneComponent,
    DashboardTwoComponent,
    DashboardThreeComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule
  ]
})
export class SuperadminModule { }
