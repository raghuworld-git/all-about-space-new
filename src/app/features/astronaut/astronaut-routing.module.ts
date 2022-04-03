import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AstronautDetailComponent } from "./components/astronaut-detail/astronaut-detail.component";

const routes:Routes=[
    {path:':id',component:AstronautDetailComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AstronautRoutingModule {

}