import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule
  ]
})
export class SuperadminModule { }
