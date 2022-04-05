import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as dayjs from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
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

  private subscription: Subscription;
  launchdateByTz: string;
  ngOnInit(): void {
    this.subscription = this.$launchdateAsync.subscribe((tzone) => {
      dayjs.extend(utc);  
      dayjs.extend(timezone);      
      this.launchdateByTz = dayjs(this.launchInfo.net).tz(tzone).format('DD MMM, HH:mm a');
    });  
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
