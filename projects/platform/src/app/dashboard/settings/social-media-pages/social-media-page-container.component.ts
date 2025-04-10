import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { SocialMediaPageSettingComponent } from './social-media-page.component';


/**
 * @title Social Media Page Settings
 */
@Component({
  selector: 'async-social-media-page-setting-container',
  imports: [CommonModule, SocialMediaPageSettingComponent],
  providers: [],
  template: `
  <async-social-media-page-setting *ngIf="partner" [partner]="partner"/>
  `,
})
export class SocialMediaPageSettingContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
  ) { }

  ngOnInit() {
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface;
        }
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}