import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TimeZoneService } from '../../services/timezone-service.service';
import { TimezoneChangeComponent } from './timezone-change/timezone-change.component';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimezoneComponent implements OnInit {

  modalRef: MdbModalRef<TimezoneChangeComponent> | null = null;

  constructor(
    public tzService: TimeZoneService,
    private modalService: MdbModalService) { }

  locallyStoredTimeZone: string = "";

  ngOnInit(): void {    
    this.locallyStoredTimeZone = this.tzService.getBrowserTimeZone();    
  }

  private config = {
    animation: true,
    backdrop: true,
    containerClass: 'right',
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right'
  }

  openModal(): void {
    this.modalRef = this.modalService.open(TimezoneChangeComponent, {
      ...this.config, data: {
        locallyStoredTZ: this.locallyStoredTimeZone
      }
    });
    this.modalRef.onClose.subscribe((message: any) => {
      if (message != null || message != undefined)
        this.tzService.updateTimeZone(message);
    });
  }
}
