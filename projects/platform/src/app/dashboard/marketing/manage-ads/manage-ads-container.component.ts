import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { ManageAdsComponent } from './manage-ads.component';
import { AdsInterface, AdsService } from './manage-ads.service';


/**
 * @title Manage ads container
 */
@Component({
  selector: 'async-manage-ads-container',
  standalone: true,
  imports: [CommonModule, ManageAdsComponent],
  providers: [AdsService],
  template: `
  <async-manage-ads *ngIf="partner && ads" [partner]="partner" [ads]="ads"/>
  `,
})
export class ManageAdsContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  ads!: AdsInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
    private adsService: AdsService
  ) { }

  ngOnInit() {
      
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next:  (partnerObject) => {
            this.partner = partnerObject as PartnerInterface
            if (this.partner) {
              this.adsService.getCampaignCreatedBy(this.partner._id).subscribe({
                next: (ads: AdsInterface) => {
                  this.ads = ads;
                }
              })
            }
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