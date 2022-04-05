import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './core/services/loader.service';
import { TimeZoneService } from './core/services/timezone-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private loader: LoaderService,private tzService:TimeZoneService) { }
  isLoading = false;

  private subscribe: Subscription;  

  ngOnInit() {    
    this.tzService.getBrowserTimeZone();  
    this.subscribe = this.loader.loading$.subscribe((value) => {
      Promise.resolve(null).then(() => this.isLoading = value);
    })
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
