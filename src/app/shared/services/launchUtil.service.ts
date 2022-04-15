import { Injectable } from "@angular/core";
import * as dayjs from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";
import { TimeZoneService } from "../../core/services/timezone-service.service";
import { LaunchInfoModel } from "../models/launch/launchInfo.model";


@Injectable({
  providedIn: 'root'
})
export class LaunchUtilService {
  constructor(private _timeZoneService:TimeZoneService){}
  private launchStatusList: { abbrev: string }[] =
    [
      { abbrev: 'Hold' },
      { abbrev: 'In Flight' },
      { abbrev: 'Partial Failure' },
      { abbrev: 'Failure' },
      { abbrev: 'Success' },
      { abbrev: 'TBD' },
      { abbrev: 'Go' },
      { abbrev: 'TBC' }
    ];
  getBadgeColor(statusAbbrev: string): string {
    let filteredAbbrev = this.launchStatusList.filter(item => item.abbrev.toLowerCase() === statusAbbrev.toLowerCase()).map(item => item.abbrev.toLowerCase())[0];
    switch (filteredAbbrev) {
      case 'tbc':
      case 'tbd':
      case 'hold':
        return 'warning';
      case 'in flight':
      case 'go':
      case 'success':
        return 'success';
      case 'artial failure':
      case 'failure':
        return 'danger';
      default:
        return 'primary';
    }
  }

  createYoutubeEmbedURL(url: string | null): string | null {
    if (url != null || url != "") {
      let tempURLArray = url!.split("watch?v=");
      if (tempURLArray === undefined || tempURLArray === null || tempURLArray.length <= 1) {
        return null;
      }
      else {
        return `https://www.youtube.com/embed/${tempURLArray[1].toString()}`;
      }
    }
    else {
      return null;
    }
  }

  isLaunchCompleted(id: number): boolean {
    return [5, 3, 4, 7].includes(id);
    /**
     * 5 - Hold
     * 3 - Success
     * 4 - Failure
     * 7 - Partial Failure
     */
  }

  getlaunchStatusList(isUpcoming: boolean) {
    let statusList: { id: number, abbrev: string }[] = [];
    if (isUpcoming) {
      statusList.push({
        id: 1, abbrev: 'Go'
      },
        { id: 2, abbrev: 'TBD' },
        { id: 5, abbrev: 'Hold' },
        { id: 6, abbrev: 'In Flight' },
        { id: 8, abbrev: 'TBC' }
      )
    } else {
      statusList.push(
        { id: 3, abbrev: 'Success' },
        { id: 4, abbrev: 'Failure' },
        { id: 5, abbrev: 'Hold' },
        { id: 7, abbrev: 'Partial Failure' }
      );
    }

    return statusList;
  }

  getChangedTimeByTimeZone(datetime:string) {
      dayjs.extend(utc);
      dayjs.extend(timezone);
      return dayjs(datetime).tz(this._timeZoneService.getBrowserTimeZone()).toString();
  }

   populateLaunchListCustomProperties(launchesList: LaunchInfoModel[]): LaunchInfoModel[] {
    let data = launchesList;

    data.forEach((launches) => {
      launches.statusColor = this.getBadgeColor(launches.status.abbrev);
      launches.image = launches.image == null ? "../../assets/images/default-launch.jpg" : launches.image;
    });

    return data;
  }
}
