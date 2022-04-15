import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeZoneService } from '../../../../core/services/timezone-service.service';
import { LaunchInfoModel } from '../../../../shared/models/launch/launchInfo.model';
import { DashboardService } from '../../services/dashboard.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  launchdata!:LaunchInfoModel;
  formattedLaunchTimeByZone: string;
  private  upcomingTopOneSubscription:Subscription;
  private timezoneSubscription:Subscription;

  constructor(private dashboardService:DashboardService,public timeZone:TimeZoneService) { }

  ngOnInit(): void {
   this.upcomingTopOneSubscription=  this.dashboardService.getTopOneLatestUpcomingLaunches().subscribe((data)=>{
        this.launchdata = data;
    });

    this.timezoneSubscription = this.timeZone.myData$.subscribe((tzone) => {
      this.formattedLaunchTimeByZone = this.timeZone.getChangeDateTimeByTimeZone(this.launchdata?.net, tzone);
    })
  }

  ngOnDestroy(){
    this.upcomingTopOneSubscription?.unsubscribe();
    this.timezoneSubscription?.unsubscribe();
  }

}
