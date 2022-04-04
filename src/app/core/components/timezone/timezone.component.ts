import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TimeZoneService } from '../../services/timezone-service.service';
import { TimezoneChangeComponent } from './timezone-change/timezone-change.component';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html'
})
export class TimezoneComponent implements OnInit {

  modalRef: MdbModalRef<TimezoneChangeComponent> | null = null;


  private config = {
    animation: true,
    backdrop: true,
    containerClass: 'right',
    data: {
      title: 'Custom title'
    },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-top-right'
  }

  constructor(
    public tzService: TimeZoneService,
    private modalService: MdbModalService) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalRef = this.modalService.open(TimezoneChangeComponent, this.config);
    this.modalRef.onClose.subscribe((message: any) => {
      if (message !== null || message !== undefined)
        this.tzService.updateTimeZone(message);
    });
  }
}
