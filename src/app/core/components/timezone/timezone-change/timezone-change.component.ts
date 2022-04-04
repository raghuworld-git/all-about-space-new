import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TimeZoneService } from 'src/app/core/services/timezone-service.service';

@Component({
  selector: 'app-timezone-change',
  templateUrl: './timezone-change.component.html',
  styleUrls: ['./timezone-change.component.scss']
})
export class TimezoneChangeComponent implements OnInit {

  @ViewChild("timezoneSelectRef") tzSelectRef!: ElementRef;

  constructor(
    private modalRef: MdbModalRef<TimezoneChangeComponent>,
    public tzService: TimeZoneService
  ) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalRef.close(this.tzSelectRef.nativeElement.value);
  }

}
