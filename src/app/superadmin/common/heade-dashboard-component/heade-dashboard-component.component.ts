import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-heade-dashboard-component',
  templateUrl: './heade-dashboard-component.component.html',
  styleUrls: ['./heade-dashboard-component.component.css']
})

export class HeadeDashboardComponentComponent implements OnInit {
  responseData: any;
  noOfActivetrips: any;
  noOfCompletedTrips: any;
  inProcessPit: any;
  emptyPit: any;
  totalDryWeight: any;
  totalWetWeight: any;

  constructor(private service: CommonService) { }
  ngOnInit() {

    this.service.getDashboardDetails().subscribe(
      data => {
        this.responseData = data
        this.noOfActivetrips = this.responseData.data.numberOfActiveTrips
        this.noOfCompletedTrips = this.responseData.data.numberOfCompletedTrips
        this.inProcessPit = this.responseData.data.noOfActivePit
        this.emptyPit = this.responseData.data.noOfCompletedPit
        this.totalDryWeight = this.responseData.data.totalDryWeightValue
        this.totalWetWeight = this.responseData.data.totalWetWeightValue
        console.log(this.responseData)
      }
    );
  }

}
