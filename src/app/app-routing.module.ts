import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './superadmin/dashboard/dashboard.component';
import { PitViewComponent } from './superadmin/mcc/pit-view/pit-view.component';
import { AuthGuardService } from './superadmin/auth-guard/auth-guard.service';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
