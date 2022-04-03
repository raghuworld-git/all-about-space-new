import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { ILaunchDetailModel } from '../../../../shared/models/launch/launchDetail.model';
import { LaunchService } from '../../../../core/services/launch/launch-service.service';



@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.css']
})
export class LaunchDetailComponent implements OnInit, OnDestroy {

  constructor(
    private router: ActivatedRoute,
    private launchService: LaunchService,
    private domSanitize: DomSanitizer
  ) { }

  slug!: string | null;

  launchDetails!: ILaunchDetailModel;
  videoURL: SafeResourceUrl | null = null;
  failOrHoldReason!: IFailHoldReason | null;

  private launchServiceSubscription!: Subscription;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get("slug");
      this.launchServiceSubscription = this.launchService.getlaunchDetailsBySlug(this.slug!)
        .subscribe({
          next: data => {
            this.launchDetails = data;
            this.videoURL = this.launchDetails.vidURLCustom != null ? this.domSanitize.bypassSecurityTrustResourceUrl(this.launchDetails.vidURLCustom!) : null;
            this.failOrHoldReason = this.getReasonIfany(this.launchDetails.status?.abbrev, this.launchDetails.holdreason, this.launchDetails.failreason);
          }
        })
    })
  }

  ngOnDestroy(): void {
    this.launchServiceSubscription?.unsubscribe();
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
