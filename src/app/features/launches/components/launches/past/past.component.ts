import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LaunchService } from 'src/app/core/services/launch/launch-service.service';
import { TimeZoneService } from 'src/app/core/services/timezone-service.service';
import { LaunchInfoModel } from 'src/app/shared/models/launch/launchInfo.model';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {

  constructor(    
    private launchService: LaunchService,
    public tzService:TimeZoneService
  ) { }

  launchList: LaunchInfoModel[] = [];

  private launchServiceSubscription!: Subscription;

  ngOnInit(): void {
    this.getlaunchesByType();
  }

  ngOnDestroy(): void {
    this.launchServiceSubscription?.unsubscribe();
  }

  
  onSearch(searchEventData:{name:string,value:string} | null){
    this.getlaunchesByType(searchEventData);
  }

  private getlaunchesByType(filterType: {name:string,value:string}|null = null) {           
    this.launchServiceSubscription = this.launchService.getPreviousLaunches(filterType)
      .subscribe(data => {
        this.launchList = data;
      });
  }

}
