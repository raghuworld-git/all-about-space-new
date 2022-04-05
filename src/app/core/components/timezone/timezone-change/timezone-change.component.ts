import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TimeZoneService } from 'src/app/core/services/timezone-service.service';
import { ITimeZone } from 'src/app/shared/models/timeZone.model';

@Component({
  selector: 'app-timezone-change',
  templateUrl: './timezone-change.component.html',
  styleUrls: ['./timezone-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimezoneChangeComponent implements OnInit {

  @ViewChild("timezoneSelectRef") tzSelectRef!: ElementRef;
  locallyStoredTZ: string = "";
  listOfTimeZones : ITimeZone[];
  constructor(
    private modalRef: MdbModalRef<TimezoneChangeComponent>    
  ) { }

  ngOnInit(): void {
    //this.locallyStoredTZ = this.tzService.getBrowserTimeZone();
  }

  closeModal(save: boolean): void {

    this.modalRef.close(save ? this.tzSelectRef.nativeElement.value : null);
  }

}
