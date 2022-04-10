import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LaunchInfoModel } from '../../../shared/models/launch/launchInfo.model';
import { ILaunchDetailModel } from '../../../shared/models/launch/launchDetail.model';
import { IAstronautModel } from '../../../shared/models/launch/astronauts.model';
import { HttpRequestService } from '../http/http-request.service';
import { LaunchUtilService } from './launchUtil.service';


@Injectable({
  providedIn: 'root'
})
export class LaunchService {

  constructor(
    private requestService: HttpRequestService,
    private launchUtil: LaunchUtilService
  ) { }

  private launchAction: string = 'launch'
  private upcomingAction: string = `${this.launchAction}/upcoming`;
  private previousAction: string = `${this.launchAction}/previous`;


  getUpcomingLaunches(filterType: IQueryParams | null): Observable<LaunchInfoModel[]> {
    let params: IQueryParams[] = [];
    params.push({ name: 'mode', value: 'detailed' });
    params.push({ name: 'hide_recent_previous', value: 'true' });
    params.push({ name: 'limit', value: '6' });

    if (filterType?.name === 'is_crewed') {
      params.push({ name: 'is_crewed', value: 'true' });
    }
    else if (filterType?.name === 'status') {
      params.push({ name: 'status', value: filterType.value });
    }
    return this.requestService.get<ILaunchesResult>(this.upcomingAction, params).pipe(map((mapdata) => {
      return this.populateLaunchListCustomProperties(mapdata.results);
    }));
  }

  getPreviousLaunches(filterType: IQueryParams | null): Observable<LaunchInfoModel[]> {
    let params: IQueryParams[] = [];
    params.push({ name: 'mode', value: 'detailed' });
    params.push({ name: 'hide_recent_previous', value: 'true' });
    params.push({ name: 'limit', value: '6' });

    if (filterType?.name === 'is_crewed') {
      params.push({ name: 'is_crewed', value: 'true' });
    }
    else if (filterType?.name === 'status') {
      params.push({ name: 'status', value: filterType.value });
    }

    return this.requestService.get<ILaunchesResult>(this.previousAction, params).pipe(map((mapdata) => {
      return this.populateLaunchListCustomProperties(mapdata.results);
    }));
  }



  getlaunchDetailsBySlug(slug: string): Observable<ILaunchDetailModel> {
    let queryParams: { name: string, value: string }[] = [];
    queryParams.push({ name: 'slug', value: slug });
    queryParams.push({ name: 'mode', value: 'detailed' });
    return this.requestService.get<ILaunchesResult>(this.launchAction, queryParams)
      .pipe(map((mapdata) => {
        return this.populateCustomProperties(mapdata.results[0]);
      }));
  }

  private populateCustomProperties(launchDetails: ILaunchDetailModel): ILaunchDetailModel {
    let launchTempData: ILaunchDetailModel = { ...launchDetails };
    let crewMembers: IAstronautModel[] = [];

    launchTempData.image = launchTempData.image == null ? "../../assets/images/default-launch.jpg" : launchTempData.image;
    
    if (launchDetails.rocket.spacecraft_stage != null) {
      launchDetails.rocket.spacecraft_stage.landing_crew.map((crew) => {
        crewMembers.push({ role: crew.role, astronaut: crew.astronaut });
      })
      crewMembers.forEach((crew) => {
        crew.crewGroup?.push('landingCrew');
      })
      launchDetails.rocket.spacecraft_stage.launch_crew.map((crew) => {
        if (!crewMembers.some(crewFilter => crew.astronaut.id === crew.astronaut.id)) {
          crewMembers.push({ role: crew.role, astronaut: crew.astronaut });
        }
      })
      crewMembers.forEach((crew) => {
        crew.crewGroup?.push('launchCrew');
      })
      launchDetails.rocket.spacecraft_stage.onboard_crew.map((crew) => {
        if (!crewMembers.some(crewFilter => crewFilter.astronaut.id === crew.astronaut.id)) {
          crewMembers.push({ role: crew.role, astronaut: crew.astronaut });
        }
      })
      crewMembers.forEach((crew) => {
        crew.crewGroup?.push('onboardCrew');
      })
      crewMembers.forEach((crew) => {
        crew.astronaut.profile_image = crew.astronaut.profile_image == null ? "../../assets/images/astronaut.svg" : crew.astronaut.profile_image;
      })
      launchTempData = { ...launchDetails, customCrewMembers: crewMembers }
    }

    launchTempData.statusColor = this.launchUtil.getBadgeColor(launchTempData.status.abbrev)

    launchTempData.vidURLCustom = launchTempData.vidURLs.length > 0 ? this.launchUtil.createYoutubeEmbedURL(launchTempData.vidURLs[0].url) : null;

    launchTempData.isLaunchCompleted = this.launchUtil.isLaunchCompleted(launchTempData.status.id);
    return launchTempData;
  }

  private populateLaunchListCustomProperties(launchesList: LaunchInfoModel[]): LaunchInfoModel[] {
    let data = launchesList;

    data.forEach((launches) => {
      launches.statusColor = this.launchUtil.getBadgeColor(launches.status.abbrev);
      launches.image = launches.image == null ? "../../assets/images/default-launch.jpg" : launches.image;
    });

    return data;
  }
}

interface ILaunchesResult {
  results: any
}

interface IQueryParams {
  name: string,
  value: string
}
