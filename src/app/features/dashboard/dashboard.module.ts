import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    declarations:[
        DashboardComponent
    ],
    imports:[        
        DashboardRoutingModule,
        SharedModule
    ],    

})
export class DashboardModule {

}