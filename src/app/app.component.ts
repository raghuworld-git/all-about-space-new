import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private loader: LoaderService) { }
  isLoading = false;

  private subscribe: Subscription;  

  ngOnInit() {    
    console.log('me first');
    this.subscribe = this.loader.loading$.subscribe((value) => {
      Promise.resolve(null).then(() => this.isLoading = value);
    })
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
