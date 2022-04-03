import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AstronautRoutingModule } from "./astronaut-routing.module";
import { AstronautDetailComponent } from "./components/astronaut-detail/astronaut-detail.component";

@NgModule({
    declarations:[
        AstronautDetailComponent
    ],
    imports:[
        SharedModule,
        AstronautRoutingModule
    ]
})
export class AstronautModule {
    
}