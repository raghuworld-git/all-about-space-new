import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes:Routes=[
    {   path:'dashboard',
        loadChildren:()=>import('./features/dashboard/dashboard.module').then(m=>m.DashboardModule)
    },
    {
        path:'launches', loadChildren:()=> import('./features/launches/launches.module')
        .then(m=>m.LaunchesModule)
    },
    {
        path:'astronaut',loadChildren:()=> import('./features/astronaut/astronaut.module')
        .then(m=>m.AstronautModule)
    },
    { path:'', redirectTo:'/dashboard',pathMatch:'full'},        
]

@NgModule({
    imports :[RouterModule.forRoot(routes)],
    exports :[RouterModule]
})
export class AppRoutingModule {

}