import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SingleLaunchCardComponent } from './components/single-launch-card/single-launch-card.component';
import { SingleAstronautComponent } from './components/single-astronaut/single-astronaut.component';
import { DescriptionCardComponent } from './components/description-card/description-card.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { YoutubeVideoIframComponent } from './components/youtube-video-ifram/youtube-video-ifram.component';



@NgModule({
    

  declarations: [
    SingleLaunchCardComponent,
    SingleAstronautComponent,
    DescriptionCardComponent,
    CountdownComponent,
    CustomModalComponent,
    YoutubeVideoIframComponent
  ],
  imports:[
    RouterModule,
    CommonModule,    
  ],
  exports:[
      SingleLaunchCardComponent,
      SingleAstronautComponent,
      DescriptionCardComponent,
      CountdownComponent,
      YoutubeVideoIframComponent,
      CommonModule      
  ]
})
export class SharedModule {
    
}