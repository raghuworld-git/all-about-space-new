import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimeZoneService } from 'src/app/core/services/timezone-service.service';
import { LaunchInfoModel } from '../../models/launch/launchInfo.model';

@Component({
  selector: 'app-single-launch-card',
  templateUrl: './single-launch-card.component.html',
  styleUrls: ['./single-launch-card.component.css']
})
export class SingleLaunchCardComponent implements OnInit, OnDestroy {

  @Input() launchInfo!: LaunchInfoModel;
  @Input() url!: string;
  @Input() $launchdateAsync: Observable<string>;

  constructor(private tzService: TimeZoneService) { }

  private subscription: Subscription;
  launchdateByTz: string;
  
  ngOnInit(): void {
    this.subscription = this.$launchdateAsync.subscribe((tzone) => {
      this.launchdateByTz = this.tzService.getChangeDateTimeByTimeZone(this.launchInfo.net, tzone);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
