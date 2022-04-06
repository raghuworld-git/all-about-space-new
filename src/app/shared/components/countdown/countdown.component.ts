import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import * as dayjs from 'dayjs';
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {

  @Input() finalDate!: string;
  @Input() $localStoragetzone!: Observable<string>;

  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
  }

  private subscription!: Subscription;
  private currentZone:string;

  public dateNow!: Date;
  public dDay!: dayjs.Dayjs;


  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: number = 0;
  public secondsToDday: number = 0;
  public minutesToDday: number = 0;
  public hoursToDday: number = 0;
  public daysToDday: number = 0;

  private getTimeDifference() {
    this.timeDifference = this.dDay.diff(dayjs().tz(this.currentZone));
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

  islaunchTimePast(): boolean {
    return  (dayjs().tz(this.currentZone).isAfter(this.dDay));
  }

  ngOnInit(): void {    
    this.$localStoragetzone.subscribe((tZone) => {
      this.currentZone = tZone;
      this.dDay = dayjs(this.finalDate).tz(tZone);        
    });    
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
