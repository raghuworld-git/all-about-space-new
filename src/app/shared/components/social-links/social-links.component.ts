import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SocialLinksComponent implements OnInit {

  @Input() mapsUrl:string|null=null;
  @Input() wikiUrl:string|null=null;
  @Input() instaUrl:string|null=null;
  @Input() twitterUrl:string|null=null;
  @Input() websiteUrl:string|null=null;

  constructor() { }

  ngOnInit(): void {
  }




}
