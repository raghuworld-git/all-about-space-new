import { Injectable } from "@angular/core";
import timezones from "timezones-list"
import * as dayjs from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

import { ITimeZone } from '../../shared/models/timeZone.model';

@Injectable({
    providedIn: "root"
})
export class TimeZoneService {
    constructor() {
        dayjs.extend(utc);
        dayjs.extend(timezone);
    }

    getBrowserTimeZone(): string {
        return dayjs.tz.guess();
    }

    getListOfTimeZones():ITimeZone[] {
        return timezones;
    }
}