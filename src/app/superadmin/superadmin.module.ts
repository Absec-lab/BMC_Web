import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
//import { HeaderComponent } from './common/header/header.component';
//import { FooterComponent } from './common/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { SidebarComponent } from './common/sidebar/sidebar.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GarbageComponent } from './garbage/garbage.component';
import { MrfComponent } from './mrf/mrf.component';
import { PitViewComponent } from './mcc/pit-view/pit-view.component';
import { TodayTaskComponent } from "./mcc/today-task/today-task.component";
import { MapComponent } from './map/map.component';
import { ModalComponent } from './mcc/pit-view/modal/modal.component';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardOneComponent } from './dashboard-one/dashboard-one.component';
//import { DashboardOneComponent } from './portal-dashboards/dashboard-one/dashboard-one.component';
import { DashboardTwoComponent } from './portal-dashboards/dashboard-two/dashboard-two.component';
import { DashboardThreeComponent } from './portal-dashboards/dashboard-three/dashboard-three.component';
import { DashboardFourComponent } from './portal-dashboards/dashboard-four/dashboard-four.component';
import { CompostDryingComponent } from './drying-yard/compost-drying/compost-drying.component';
import { DryCompostWeighmentComponent } from './drying-yard/dry-compost-weighment/dry-compost-weighment.component';
import { CompostMaterialPackagingComponent } from './drying-yard/compost-material-packaging/compost-material-packaging.component';
import { ItemCategoryMasterComponent } from './item-category-master/item-category-master.component';
import { ItemNameMasterComponent } from './item-name-master/item-name-master.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCellRendererComponent } from './image-cell-renderer/image-cell-renderer.component';


@NgModule({
  declarations: [
    //HeaderComponent,
    //FooterComponent,
    DashboardComponent,
    //SidebarComponent,
    WealthCenterMasterComponent,
    WardMasterComponent,
    ZoneMasterComponent,
    DryingYardMasterComponent,
    MccMasterComponent,
    PitMasterComponent,
    RouteMasterComponent,
    GoodsMasterComponent,
    GoodsSubMasterComponent,
    VehicleMasterComponent,
    DriverMasterComponent,
    HelperMasterComponent,
    LoginComponent,
    GarbageComponent,
    MrfComponent,
    PitViewComponent,
    MapComponent,
    ModalComponent,
    TodayTaskComponent,
    MapComponent,
    HomeComponent,
    DashboardOneComponent,
    DashboardTwoComponent,
    DashboardThreeComponent,
    DashboardFourComponent,
    CompostDryingComponent,
    CompostMaterialPackagingComponent,
    DryCompostWeighmentComponent,
    ItemCategoryMasterComponent,
    ItemNameMasterComponent,
    InventoryComponent,
    ImageCellRendererComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    SharedModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ]
})
export class SuperadminModule { }
