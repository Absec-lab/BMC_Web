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
import { MccUserAuthGuardService } from './superadmin/auth-guard/mccuser-auth-guard.service';
import { WcUserAuthGuardService } from './superadmin/auth-guard/wcuser-auth-guard.service';
import { InventoryComponent } from './superadmin/inventory/inventory.component';
import { TermComponent } from './superadmin/term/term.component';
import { PolicyComponent } from './superadmin/policy/policy.component';


const routes: Routes = [
  {
    component:LoginComponent,
    path:'login'
  },
 
  {
    component:HomeComponent,
    path:'superadmin/home',
    canActivate:[LoginGuard]
  },
  {
    component:DashboardComponent,
    path:'superadmin/dashboard',
    canActivate:[LoginGuard]
  },
  {
    component:VehicleMasterComponent,
    path:'superadmin/vehicle',
    canActivate:[LoginGuard]
  },
  {
    component:MrfComponent,
    path:'superadmin/mrf',
    canActivate:[LoginGuard]
  },
  {
    component:PitViewComponent,
    path:'superadmin/mcc/pit-view',
    canActivate:[LoginGuard , WcUserAuthGuardService ]
  },
  {
    component:CompostDryingComponent,
    path:'superadmin/drying-yard/compost-drying',
    canActivate:[LoginGuard]
  },
  {
    component:CompostMaterialPackagingComponent,
    path:'superadmin/drying-yard/compost-material-packaging',
    canActivate:[LoginGuard]
  },
  {
    component:DryCompostWeighmentComponent,
    path:'superadmin/drying-yard/dry-compost-weighment',
    canActivate:[LoginGuard]
  },
  {
    component:DryingYardMasterComponent,
    path:'superadmin/drying-yard-master',
    canActivate:[LoginGuard]
  },
  {
    component:InventoryComponent,
    path:'superadmin/inventory',
    canActivate:[LoginGuard]
  },
  {
    component:TermComponent,
    path:'superadmin/term'
  },
  {
    component:PolicyComponent,
    path:'superadmin/policy'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
