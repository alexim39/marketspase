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
    [mainValue]="expenseMainValue"
    [borderColor]="expenseBorderColor"
    [growthColor]="expenseGrowthColor"
    [icon]="expenseIcon"
    />

    <async-dashboard-short-cards 
    [title]="incomeTitle" 
    [mainValue]="incomeMainValue"
    [borderColor]="incomeBorderColor"
    [growthColor]="incomeGrowthColor"
    [icon]="incomeIcon"
    />

    <async-dashboard-long-cards 
    [title]="planTitle" 
    [mainValue]="planMainValue"
    [borderColor]="planBorderColor"
    [growthColor]="planGrowthColor"
    [icon]="planIcon"
    />

    <async-dashboard-long-cards 
    [title]="adsTitle" 
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

// If you need the month as a string (e.g., "January", "February"):
today = new Date();
monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
currentMonthName = this.monthNames[this.today.getMonth()];

    // expense
    expenseTitle = `${this.currentMonthName}  Expenses`;
    expenseMainValue: any;
    expenseBorderColor = 'red';
    expenseGrowthColor = 'red';
    expenseIcon = '₦';

    // income
    incomeTitle = `${this.currentMonthName} Income Stats`
    incomeMainValue: any;
    incomeBorderColor = 'green';
    incomeGrowthColor = 'green';
    incomeIcon = '₦';

    // plan
    planTitle = "Plans / Team Plans";
    planMainValue: any;
    planBorderColor = 'orange';
    planGrowthColor = 'orange';
    planIcon = 'cottage';

    // ads
    adsTitle = "Active / Total Ads";
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

        /**
        * Method to get the statistics of the plan on the dashboard
        * @param {string} partnerId - The partner id  
        * @returns {Observable} - The plan statistics: total number of plans, total number of user active plans, total of all plans on the system
        * 
        */
        this.indexService.getPlansCountForDasboard(this.partner._id).subscribe({
          next: (getPlansCount: any) => {
            this.planMainValue = getPlansCount;
          }
        });
  

        /**
        * Method to get the statistics of the ads on the dashboard
        * @param {string} partnerId - The partner id
        *  @returns {Observable} - The ads statistics: total number of active ads, total of all user ads on the system
        */
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


        /**
        * Method to get the statistics of the income on the dashboard
        * @param {string} partnerId - The partner id  
        * @param {Date} startDate - The start date of the income
        * @param {Date} endDate - The end date of the income
        * @returns {Observable} - The plan statistics: user income within the specified date range
        * 
        */
         this.indexService.getProfitForDasboard(this.partner._id).subscribe({
          next: (getProfit: any) => {
            this.incomeMainValue = getProfit;
          }
        });


        /**
        * Method to get the statistics of the expenses on the dashboard
        * @param {string} partnerId - The partner id  
        * @param {Date} startDate - The start date of the income
        * @param {Date} endDate - The end date of the income
        * @returns {Observable} - The plan statistics: user expenses within the specified date range
        * 
        */
        this.indexService.getExpensesForDasboard(this.partner._id).subscribe({
          next: (getExpenses: any) => {
            this.expenseMainValue = getExpenses;
          }
        });
  
      }
    }

}