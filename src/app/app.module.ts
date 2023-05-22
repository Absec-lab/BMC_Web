import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperadminModule } from './superadmin/superadmin.module';
import { WebModule } from './web/web.module';
import { CommonService } from './service/common.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SuperadminModule,
    WebModule,
    HttpClientModule,
    NgbAlertModule,
    FormsModule
  ],
  providers: [
        CommonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
