import { Component } from '@angular/core';
import { DashboardCardsComponent } from './dashboard-cards.component';

/**
 * @title Cards Container
 */
@Component({
  selector: 'async-dashboard-cards-container',
  template: `
  <section>

    <async-dashboard-cards 
    [title]="expenseTitle" 
    [value]="expenseValue"
    [mainValue]="expenseMainValue"
    [borderColor]="expenseBorderColor"
    [growthColor]="expenseGrowthColor"
    [icon]="expenseIcon"

    />

    <async-dashboard-cards 
    [title]="incomeTitle" 
    [value]="incomeValue"
    [mainValue]="incomeMainValue"
    [borderColor]="incomeBorderColor"
    [growthColor]="incomeGrowthColor"
    [icon]="incomeIcon"

    />

    <async-dashboard-cards 
    [title]="planTitle" 
    [value]="planValue"
    [mainValue]="planMainValue"
    [borderColor]="planBorderColor"
    [growthColor]="planGrowthColor"
    [icon]="planIcon"

    />

    <async-dashboard-cards 
    [title]="adsTitle" 
    [value]="adsValue"
    [mainValue]="adsMainValue"
    [borderColor]="adsBorderColor"
    [growthColor]="adsGrowthColor"
    [icon]="adsIcon"

    />


  </section>
  `,
  imports: [DashboardCardsComponent],
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
  ]
})
export class DashboardCardsContainerComponent {

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
    planTitle = "Total Plans";
    planValue = 59;
    planMainValue = 60;
    planBorderColor = 'orange';
    planGrowthColor = 'orange';
    planIcon = 'cottage';

    // ads
    adsTitle = "Total Ads";
    adsValue = 39;
    adsMainValue = 60;
    adsBorderColor = 'blue';
    adsGrowthColor = 'blue';
    adsIcon = 'ads_click';

}