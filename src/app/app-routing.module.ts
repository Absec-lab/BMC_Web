import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './superadmin/dashboard/dashboard.component';
import { PitViewComponent } from './superadmin/mcc/pit-view/pit-view.component';
import { LoginComponent } from './superadmin/login/login.component';
import { VehicleMasterComponent } from './superadmin/vehicle-master/vehicle-master.component';
import { CompostDryingComponent } from './superadmin/drying-yard/compost-drying/compost-drying.component';
import { CompostMaterialPackagingComponent } from './superadmin/drying-yard/compost-material-packaging/compost-material-packaging.component';
import { DryCompostWeighmentComponent } from './superadmin/drying-yard/dry-compost-weighment/dry-compost-weighment.component';
import { HomeComponent } from './superadmin/home/home.component';
import { LoginGuard } from './superadmin/auth-guard/LoginGuard';
import { DryingYardMasterComponent } from './superadmin/drying-yard-master/drying-yard-master.component';
import { MrfComponent } from './superadmin/mrf/mrf.component';
import { InventoryComponent } from './superadmin/inventory/inventory.component';
import { TermComponent } from './superadmin/term/term.component';
import { PolicyComponent } from './superadmin/policy/policy.component';
import { GarbageComponent } from './superadmin/garbage/garbage.component';
import { TodayTaskComponent } from './superadmin/mcc/today-task/today-task.component';
import { TripDetailsComponent } from './superadmin/drying-yard/trip-details/trip-details.component';
import { ManpowerComponent } from './superadmin/manpower/manpower.component';
import { ZoneMasterComponent } from './superadmin/zone-master/zone-master.component';
import { WealthCenterMasterComponent } from './superadmin/wealth-center-master/wealth-center-master.component';
import { WardMasterComponent } from './superadmin/ward-master/ward-master.component';
import { MccMasterComponent } from './superadmin/mcc-master/mcc-master.component';
import { TtsUserAuthGuardService } from './superadmin/auth-guard/ttsuser-auth-guard.service';
import { BmcWcMccUserAuthGuardService } from './superadmin/auth-guard/bmc-wc-mcc-user-auth-guard.service';
import { BmcWcAdminUserAuthGuardService } from './superadmin/auth-guard/bmc-wc-adminuser-auth-guard.service';


const routes: Routes = [
  {
    component:LoginComponent,
    path:'login'
  },
 
  {
    component:HomeComponent,
    path:'superadmin/home',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:DashboardComponent,
    path:'superadmin/dashboard',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:VehicleMasterComponent,
    path:'superadmin/vehicle',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:MrfComponent,
    path:'superadmin/mrf',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:PitViewComponent,
    path:'superadmin/mcc/pit-view',
    canActivate:[LoginGuard ,BmcWcMccUserAuthGuardService ]
  },
  {
    component:CompostDryingComponent,
    path:'superadmin/drying-yard/compost-drying',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:CompostMaterialPackagingComponent,
    path:'superadmin/drying-yard/compost-material-packaging',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:DryCompostWeighmentComponent,
    path:'superadmin/drying-yard/dry-compost-weighment',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:DryingYardMasterComponent,
    path:'superadmin/drying-yard-master',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:InventoryComponent,
    path:'superadmin/inventory',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:TermComponent,
    path:'superadmin/term'
  },
  {
    component:PolicyComponent,
    path:'superadmin/policy'
  },
  {
    component:GarbageComponent,
    path:'superadmin/garbage',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:TodayTaskComponent,
    path:'superadmin/mcc/today-task',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:CompostDryingComponent,
    path:'superadmin/drying-yard/compost-drying',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:DryCompostWeighmentComponent,
    path:'superadmin/drying-yard/dry-compost-weighment',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:CompostMaterialPackagingComponent,
    path:'superadmin/drying-yard/compost-material-packaging',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:ManpowerComponent,
    path:'superadmin/vehicle-management',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:ZoneMasterComponent,
    path:'superadmin/zone-master',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:WealthCenterMasterComponent,
    path:'superadmin/wealth-center-master',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:WardMasterComponent,
    path:'superadmin/ward-master',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  },
  {
    component:MccMasterComponent,
    path:'superadmin/mcc-master',
    canActivate:[LoginGuard,BmcWcAdminUserAuthGuardService]
  } ,
  {
    component:TripDetailsComponent,
    path:'superadmin/drying-yard/trip-details',
    canActivate:[LoginGuard,TtsUserAuthGuardService]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
