import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import timezones from "timezones-list"
import * as dayjs from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

import { ITimeZone } from '../../shared/models/timeZone.model';
import { LocalStorageEnum } from '../../shared/models/localStorage-key-enum.enum';
import { LocalStorageService } from "./local-storage.service";


@Injectable({
    providedIn: "root"
})
export class TimeZoneService {

    private _myData$: BehaviorSubject<string> = new BehaviorSubject<string>(this._localStorage.loadInfo(LocalStorageEnum.timezone));
    myData$ = this._myData$.asObservable();


    constructor(private _localStorage: LocalStorageService) {
        dayjs.extend(utc);
        dayjs.extend(timezone);
    }

    getBrowserTimeZone(): string {
        let localStorageValueByKey = this._localStorage.loadInfo(LocalStorageEnum.timezone);
        if (localStorageValueByKey === null || this.getListOfTimeZones().filter(x => x.tzCode.toLocaleLowerCase() === localStorageValueByKey.toLocaleLowerCase()).length <= 0) {
            this.updateTimeZone(dayjs.tz.guess());
            localStorageValueByKey = dayjs.tz.guess();
        }
        if (localStorageValueByKey === "Asia/Calcutta") {
            localStorageValueByKey = "Asia/Kolkata";
        }
        return localStorageValueByKey;
    }

    getListOfTimeZones(): ITimeZone[] {
        return timezones.sort((a, b) => {
            let fa = a.label.toLocaleLowerCase(), fb = b.label.toLocaleLowerCase();
            if (fa < fb) {
                return -1;
            }
            else if (fa > fb) {
                return 1;
            }
            return 0;
        });
    }

    updateTimeZone(data: string) {
        this._localStorage.setInfo({ key: LocalStorageEnum.timezone, value: data });
        this._myData$.next(data);
    }

    getChangeDateTimeByTimeZone(dtime: string, tzone: string): string {       
        return dayjs(dtime).tz(tzone).format('DD MMM YYYY, HH:mm:ss');
    }

}