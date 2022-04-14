import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimeZoneService } from 'src/app/core/services/timezone-service.service';
import { ILaunchUpdatesModel } from 'src/app/shared/models/launch/launchUpdates.model';

@Component({
  selector: 'app-launch-updates',
  templateUrl: './launch-updates.component.html',
  styleUrls: ['./launch-updates.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class LaunchUpdatesComponent implements OnInit,OnDestroy {

  constructor(private tzService:TimeZoneService) { }

  @Input() update:ILaunchUpdatesModel;
  @Input() $timezone:Observable<string>;

  createdOnDate:string='';
  private subscription:Subscription;

  ngOnInit(): void {
   this.subscription= this.$timezone.subscribe((tzone)=>{
       this.createdOnDate = this.tzService.getChangeDateTimeByTimeZone(this.update.created_on,tzone);
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
