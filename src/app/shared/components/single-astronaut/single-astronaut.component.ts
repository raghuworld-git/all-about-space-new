import { Component, Input, OnInit } from '@angular/core';
import { IAstronautModel } from '../../models/launch/astronauts.model';

@Component({
  selector: 'app-single-astronaut',
  templateUrl: './single-astronaut.component.html',
  styleUrls: ['./single-astronaut.component.css']
})
export class SingleAstronautComponent implements OnInit {

  constructor() { }

  @Input() crew!:IAstronautModel

  ngOnInit(): void {
  }

}
