import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GarbageComponent } from './garbage/garbage.component';
import { MccComponent } from './mcc/mcc.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent,
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
    LoginComponent,
    GarbageComponent,
    MrfComponent,
    MccComponent,
    PitViewComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    ReactiveFormsModule,
    SuperadminModule
  ]
})
export class SuperadminModule { }
