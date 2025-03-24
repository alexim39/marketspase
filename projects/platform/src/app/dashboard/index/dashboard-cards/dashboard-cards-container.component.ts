import { Component, Input, OnInit } from '@angular/core';
import { DashboardLongCardsComponent } from './long-cards/dashboard-long-cards.component';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { PlanInterface, PlanService } from '../../business/new-plan.service';
import { AdsInterface, AdsService } from '../../marketing/manage-ads/manage-ads.service';
import { IndexService } from '../index.service';
import { DashboardShortCardsComponent } from './short-cards/dashboard-short-cards.component';

/**
 * @title Cards Container
 */
@Component({
  selector: 'async-dashboard-cards-container',
  template: `
  <section>

    <async-dashboard-short-cards 
    [title]="expenseTitle" 
    [value]="expenseValue"
    [mainValue]="expenseMainValue"
    [borderColor]="expenseBorderColor"
    [growthColor]="expenseGrowthColor"
    [icon]="expenseIcon"
    />

    <async-dashboard-short-cards 
    [title]="incomeTitle" 
    [value]="incomeValue"
    [mainValue]="incomeMainValue"
    [borderColor]="incomeBorderColor"
    [growthColor]="incomeGrowthColor"
    [icon]="incomeIcon"
    />

    <async-dashboard-long-cards 
    [title]="planTitle" 
    [value]="planValue"
    [mainValue]="planMainValue"
    [borderColor]="planBorderColor"
    [growthColor]="planGrowthColor"
    [icon]="planIcon"
    />

    <async-dashboard-long-cards 
    [title]="adsTitle" 
    [value]="adsValue"
    [mainValue]="adsMainValue"
    [borderColor]="adsBorderColor"
    [growthColor]="adsGrowthColor"
    [icon]="adsIcon"
    />


  </section>
  `,
  imports: [DashboardLongCardsComponent, DashboardShortCardsComponent],
  styles: [
    `
      section {
          display: flex;
          justify-content: space-evenly;
          border-bottom: 1px solid #ccc;
          padding: 1em;
          flex-wrap: wrap;
      }

      @media (max-width: 1200px) {
        section {
            justify-content: space-between;
        }
      }

      @media (max-width: 768px) {
        section {
            flex-direction: column;
            align-items: center;
        }
      }

      async-dashboard-cards {
          margin: 1em;
          flex: 1;
          min-width: 250px; /* Ensure cards have a minimum width */
      }
    `
  ],
  providers: [IndexService, PlanService, AdsService]
})
export class DashboardCardsContainerComponent implements OnInit {
  @Input() partner!: PartnerInterface;

    // expense
    expenseTitle = "Total Expenses";
    expenseValue = 59;
    expenseMainValue = 60.50;
    expenseBorderColor = 'red';
    expenseGrowthColor = 'red';
    expenseIcon = '₦';

    // income
    incomeTitle = "Total Income"
    incomeValue = 59;
    incomeMainValue = 60.43;
    incomeBorderColor = 'green';
    incomeGrowthColor = 'green';
    incomeIcon = '₦';

    // plan
    planTitle = "Plans Stats";
    planValue = 59;
    planMainValue: any;
    planBorderColor = 'orange';
    planGrowthColor = 'orange';
    planIcon = 'cottage';

    // ads
    adsTitle = "Active / Total Ads";
    adsValue = 39;
    adsMainValue: any;
    adsBorderColor = 'blue';
    adsGrowthColor = 'blue';
    adsIcon = 'ads_click';


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

        this.indexService.getPlanDetailForDasboard(this.partner._id).subscribe({
          next: (getPlansCount: any) => {
            this.planMainValue = getPlansCount;
          }
        });
  
        this.adsService.getCampaignCreatedBy(this.partner._id).subscribe({
          next: (ads: AdsInterface) => {
            this.ads = ads;
        
            // Check if there are any active ads
            //this.hasActiveAds = this.ads.data?.some(ad => ad.isActive) || false;
        
            // if (!hasActiveAds) {
            //   console.log(false);
            //   return false;
            // }
        
            // Count the number of inactive ads
            const count = this.ads.data?.filter(ad => ad.isActive).length || 0;
            //console.log(`The number of inactive ads is: ${inactiveAdsCount}`);
            const total = this.ads.data?.length || '';
            
            this.adsMainValue = {
              count, total
            }
          }
        });
  
      }
    }

}