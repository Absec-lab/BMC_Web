import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../superadmin/common/header/header.component';
import { FooterComponent } from '../superadmin/common/footer/footer.component';
import { SidebarComponent } from '../superadmin/common/sidebar/sidebar.component';
import { CustomAutocompleteDirective } from '../directive/custom-autocomplete.directive';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CustomAutocompleteDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CustomAutocompleteDirective
  ]
})
export class SharedModule { }