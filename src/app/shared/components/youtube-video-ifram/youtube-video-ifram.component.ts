import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-video-ifram',
  templateUrl: './youtube-video-ifram.component.html',
  styleUrls: ['./youtube-video-ifram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideoIframComponent implements OnInit {

  @Input() videoURL: SafeResourceUrl | null = null
  @Input() height: string = "315px";
  constructor() { }

  ngOnInit(): void {
  }

}
