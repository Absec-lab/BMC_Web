import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../superadmin/common/header/header.component';
import { FooterComponent } from '../superadmin/common/footer/footer.component';
import { SidebarComponent } from '../superadmin/common/sidebar/sidebar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class SharedModule { }