import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperadminModule } from './superadmin/superadmin.module';
import { WebModule } from './web/web.module';
import { CommonService } from './service/common.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SuperadminModule,
    WebModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
        CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
