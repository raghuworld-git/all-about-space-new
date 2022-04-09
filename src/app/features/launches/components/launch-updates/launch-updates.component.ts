import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ILaunchUpdatesModel } from 'src/app/shared/models/launch/launchUpdates.model';

@Component({
  selector: 'app-launch-updates',
  templateUrl: './launch-updates.component.html',
  styleUrls: ['./launch-updates.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LaunchUpdatesComponent implements OnInit {

  constructor() { }

  @Input() updates:ILaunchUpdatesModel[]=[];

  ngOnInit(): void {
  }

}
