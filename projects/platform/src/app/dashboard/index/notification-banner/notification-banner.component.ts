import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { IndexService } from '../index.service';
import { PlanInterface, PlanService } from '../../business/new-plan.service';
import { AdsInterface, AdsService } from '../../marketing/manage-ads/manage-ads.service';

@Component({
  selector: 'async-notification-banner',
  imports: [CommonModule, MatIconModule],
  providers: [IndexService, PlanService],
  template: `

    <!-- If user has no plan -->
    @if (plans.length === 0) {
      <div *ngIf="planVisible" class="info-alert">
      <mat-icon class="info-icon">info</mat-icon>
      <span>
      There are no plan running on your account. You will not be able to earn if no plan is active. Navigate to the business section to start a new plan.
      </span>
      <mat-icon class="close-icon" (click)="closePlanAlert()">close</mat-icon>
    </div>
    } <!-- @else {
      <div>The user is not logged in</div>
    } -->

    <!-- If no active ad running -->
    @if (!hasActiveAds) {
      <div *ngIf="adVisible" class="info-alert">
      <mat-icon class="info-icon">info</mat-icon>
      <span>
      There are no active ads running on your account. You will not be able to earn if no ads are active. Navigate to the marketing section to start an ad campaign.
      </span>
      <mat-icon class="close-icon" (click)="closeAdAlert()">close</mat-icon>
    </div>
    }
  `,
  styles: [
    `
      .info-alert {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color:rgb(247, 232, 217);
        color:rgb(104, 39, 19);
        padding: 12px;
        border-radius: 5px;
        font-size: 14px;
        border-left: 4px solid rgb(172, 76, 46);
        position: relative;
        margin: 1em;
      }
      .info-icon {
        font-size: 20px;
        color: rgb(104, 39, 19);
        margin-right: 10px;
      }
      .close-icon {
        font-size: 20px;
        cursor: pointer;
        color: rgb(104, 39, 19);
        margin-left: auto;
      }
      .close-icon:hover {
        color: rgb(104, 39, 19);
      }

      @media (max-width: 768px) {
        .info-alert {
          flex-direction: column;
          align-items: flex-start;
          font-size: 12px; /* Adjust font size for small screens */
          padding: 8px; /* Adjust padding for small screens */
        }
        .info-icon {
          margin-bottom: 8px; /* Add margin to separate icon from text */
        }
        .close-icon {
          margin-top: 8px; /* Add margin to separate close icon from text */
          margin-left: 0; /* Reset left margin */
          align-self: flex-end; /* Align close icon to the end */
        }
      }
    `
  ]
})
export class NotificationBannerComponent implements OnInit {
  planVisible = true;
  adVisible = true;
  @Input() partner!: PartnerInterface;
  plans: Array<PlanInterface> = [];
  ads!: AdsInterface;
  hasActiveAds = false;

  constructor(
    private indexService: IndexService,
    private planService: PlanService,
    private adsService: AdsService,
    
  ) {}

  ngOnInit(): void {
    if (this.partner) {
      this.planService.getPlans(this.partner._id).subscribe({
        next: (response) => {
          this.plans = response.plans;
        }
      });

      this.adsService.getCampaignCreatedBy(this.partner._id).subscribe({
        next: (ads: AdsInterface) => {
          this.ads = ads;
      
          // Check if there are any active ads
          this.hasActiveAds = this.ads.data?.some(ad => ad.isActive) || false;
      
          // if (!hasActiveAds) {
          //   console.log(false);
          //   return false;
          // }
      
          // Count the number of inactive ads
          //const inactiveAdsCount = this.ads.data?.filter(ad => !ad.isActive).length || 0;
          //console.log(`The number of inactive ads is: ${inactiveAdsCount}`);
        }
      });

    }
  }

  closePlanAlert() {
    this.planVisible = false;
  }

  closeAdAlert() {
    this.adVisible = false;
  }
}