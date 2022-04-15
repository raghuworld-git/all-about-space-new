import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { LaunchUtilService } from "../../../shared/services/launchUtil.service";
import { HttpRequestService } from "../../../core/services/http/http-request.service";
import { Observable } from "rxjs";
import { LaunchInfoModel } from "../../../shared/models/launch/launchInfo.model";

@Injectable({
    providedIn:'root'
})
export class DashboardService {
    constructor(private httpService:HttpRequestService,
                private launchUtil:LaunchUtilService
        ){}

    private upcomingLaunchesAction ="launch/upcoming";

    public getTopOneLatestUpcomingLaunches():Observable<LaunchInfoModel>{
        let params: IQueryParams[] = [];        
        params.push({ name: 'hide_recent_previous', value: 'true' });
        params.push({ name: 'ordering', value: 'net' });
        params.push({ name: 'limit', value: '1' });
        
        return this.httpService.get<ILaunchesResult>(this.upcomingLaunchesAction, params).pipe(map((mapdata) => {
            return this.launchUtil.populateLaunchListCustomProperties(mapdata.results)[0];
          }));
    }
    

}


interface ILaunchesResult {
    results: any
  }

interface IQueryParams {
    name: string,
    value: string
  }