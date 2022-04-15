import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoaderService } from './core/services/loader.service';
import { TimeZoneService } from './core/services/timezone-service.service';
import { UrlService } from './core/services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private loader: LoaderService,private tzService:TimeZoneService,private urlService:UrlService,
    private router:Router) { }
  isLoading = false;

  previousUrl: string = null;
  currentUrl: string = null;

  private subscribe: Subscription;

  ngOnInit() {
    this.tzService.getBrowserTimeZone();
    this.subscribe = this.loader.loading$.subscribe((value) => {
      Promise.resolve(null).then(() => this.isLoading = value);
    })

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.urlService.setPreviousUrl(this.previousUrl);
    });
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
