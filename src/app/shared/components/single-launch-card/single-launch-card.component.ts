import { Component, Input, OnInit } from '@angular/core';
import { LaunchUtilService } from '../../../core/services/launch/launchUtil.service';
import { LaunchInfoModel } from '../../models/launch/launchInfo.model';

@Component({
  selector: 'app-single-launch-card',
  templateUrl: './single-launch-card.component.html',
  styleUrls: ['./single-launch-card.component.css']
})
export class SingleLaunchCardComponent implements OnInit {

  @Input() launchInfo!:LaunchInfoModel;
  @Input() url!:string;

  ngOnInit(): void {
  }

}
