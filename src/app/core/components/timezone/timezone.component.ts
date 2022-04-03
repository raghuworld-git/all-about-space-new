import { Component, OnInit } from '@angular/core';
import { TimeZoneService } from '../../services/timezone-service.service';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html'
})
export class TimezoneComponent implements OnInit {

  constructor(public tzService:TimeZoneService) { }

  ngOnInit(): void {
  }

}
