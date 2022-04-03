import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AstronautService } from '../../../../core/services/astronaut/astronaut-service.service';

@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.component.html',
  styleUrls: ['./astronaut-detail.component.css']
})
export class AstronautDetailComponent implements OnInit {

  constructor(
    public astroService:AstronautService,
    private route:ActivatedRoute 
    ) { }

  id:string|null="";

  ngOnInit(): void {

    this.route.paramMap.subscribe((param:ParamMap)=>{
      this.id = param.get("id");
      this.astroService.getAstronautDetailsById(this.id!)
      .subscribe({
        next: data =>{
          console.log(data);
        },
        error: err=>{
          console.log(err,'Error from Astronaut details component');
        }
      })
    })    
  }

}
