import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LaunchUtilService } from 'src/app/core/services/launch/launchUtil.service';

@Component({
  selector: 'app-launch-filter',
  templateUrl: './launch-filter.component.html',
  styleUrls: ['./launch-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchFilterComponent implements OnInit {

  constructor(public launchUtilService: LaunchUtilService) { }

  @Output() searchEvent = new EventEmitter<{ name: string, value: string } | null>();
  @Input() isUpcoming: boolean = false;
  @ViewChild("statusFilterRef") statusFilterRef!: ElementRef;

  statusFilter: boolean = true;
  listofStatus: { id: number, abbrev: string }[] = [];

  private filterValue: string = "";

  ngOnInit(): void {
    this.listofStatus = this.launchUtilService.getlaunchStatusList(this.isUpcoming);
  }

  onFilterChange(selectedOption: any) {
    this.filterValue = selectedOption.target.value;
    let statusFilterValue: string = this.statusFilterRef.nativeElement.value;
    if (this.filterValue == "status") {
      this.statusFilter = false;
      if (statusFilterValue.trim() != "") {
        this.searchEvent.emit({ name: this.filterValue, value: statusFilterValue });
      }
    }
    else {
      this.statusFilter = true;
      this.searchEvent.emit({ name: this.filterValue, value: "" });
    }
  }

  onFilterStatusChange() {
    let val: string = this.statusFilterRef.nativeElement.value;
    if (val.trim() != "") {
      this.searchEvent.emit({ name: this.filterValue, value: this.statusFilterRef.nativeElement.value });
    } else {
      this.searchEvent.emit(null);
    }
  }
}
