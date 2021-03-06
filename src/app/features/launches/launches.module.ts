import { NgModule } from "@angular/core";

import { LaunchesRoutingModule } from "./launches-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

import { UpcomingComponent } from './components/launches/upcoming/upcoming.component';
import { PastComponent } from './components/launches/past/past.component';
import { LaunchDetailComponent } from "./components/launch-detail/launch-detail.component";
import { LaunchFilterComponent } from './components/launches/launch-filter/launch-filter.component';
import { LaunchUpdatesComponent } from './components/launch-updates/launch-updates.component';


@NgModule({
    declarations: [
    UpcomingComponent,
    PastComponent,
    LaunchDetailComponent,
    LaunchFilterComponent,
    LaunchUpdatesComponent    
  ],
  imports:[  
    LaunchesRoutingModule,
    SharedModule
  ]
})
export class LaunchesModule {

}