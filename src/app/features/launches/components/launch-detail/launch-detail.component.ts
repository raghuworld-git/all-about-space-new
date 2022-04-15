import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { ILaunchDetailModel } from '../../../../shared/models/launch/launchDetail.model';

import { TimeZoneService } from 'src/app/core/services/timezone-service.service';
import { LaunchService } from '../../services/launch-service.service';
import { UrlService } from 'src/app/core/services/url.service';



@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.css']
})
export class LaunchDetailComponent implements OnInit, OnDestroy {

  constructor(
    private router: ActivatedRoute,
    private launchService: LaunchService,
    private domSanitize: DomSanitizer,
    private timeZone: TimeZoneService,
    private urlService:UrlService
  ) { }

  slug!: string | null;
  launchDetails!: ILaunchDetailModel;
  videoURL: SafeResourceUrl | null = null;
  failOrHoldReason!: IFailHoldReason | null;
  formattedLaunchTimeByZone: string;
  previousURL:string=null;

  private launchServiceSubscription!: Subscription;
  private timezoneSubscription!: Subscription;
  private urlServiceSubscription!: Subscription;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get("slug");

      this.launchServiceSubscription = this.launchService.getlaunchDetailsBySlug(this.slug!)
        .subscribe({
          next: data => {
            this.launchDetails = data;
            this.videoURL = this.launchDetails.vidURLCustom != null ? this.domSanitize.bypassSecurityTrustResourceUrl(this.launchDetails.vidURLCustom!) : null;
            this.failOrHoldReason = this.getReasonIfany(this.launchDetails.status?.abbrev, this.launchDetails.holdreason, this.launchDetails.failreason);
            this.timezoneSubscription = this.timeZone.myData$.subscribe((tzone) => {
              this.formattedLaunchTimeByZone = this.timeZone.getChangeDateTimeByTimeZone(this.launchDetails.net, tzone);
            })
          }
        });

        this.urlServiceSubscription = this.urlService.previousUrl$.subscribe((previousUrl: string) => {
          this.previousURL = (previousUrl !=null ?"/"+previousUrl:previousUrl);
        });
    })
  }

  ngOnDestroy(): void {
    this.launchServiceSubscription?.unsubscribe();
    this.timezoneSubscription?.unsubscribe();
    this.urlServiceSubscription?.unsubscribe();
  }

  private getReasonIfany(status: string, hold: string | null, fail: string | null): IFailHoldReason | null {
    if (status.toLowerCase() === "failure") {
      return { reason: 'Failure', description: fail }
    }
    else if (status.toLowerCase() === "hold") {
      return { reason: 'Hold', description: fail }
    }
    return null;
  }

}

interface IFailHoldReason {
  reason: string,
  description: string | null
}
