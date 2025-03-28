import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SideGraphComponent } from './side-graph.component';
import { MainGraphComponent } from './main-graph.component';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IndexService } from '../index.service';

/**
 * @title graphs container
 */
@Component({
  selector: 'async-graphs-contaner',
  providers: [IndexService],
  template: `
    <section class="container">

      <section class="main">
        <async-main-graph *ngIf="partner" [partner]="partner"/>
      </section>

      <section class="side">
        <async-side-graph *ngIf="partner && calculatedProfit" [partner]="partner" [calculatedProfit]="calculatedProfit"/>
      </section>

    </section>
  `,
    imports: [SideGraphComponent,CommonModule, MainGraphComponent],
  styles: [`
    .container {
      display: flex;
      flex-wrap: wrap; /* Allow wrapping on smaller screens */
      justify-content: space-between;
      align-items: space-between;
      margin: 1em;
    }

    .main {
      flex: 65%; /* Takes 70% of the available space */
      //min-height: 200px; /* Ensure a minimum height */
     // margin-right: 2em;
    }

    .side {
      flex: 29%; /* Takes 30% of the available space */
      //min-height: 200px; /* Ensure a minimum height */
      margin-left: 2em;
    }

    /* Responsive adjustments for smaller screens */
    @media (max-width: 768px) {

      .main {
        margin-right: 0;
        flex: 100%; /* Take full width on smaller screens */
      }
      .side {
        margin-top: 1em;
        margin-left: 0;
        flex: 100%; /* Take full width on smaller screens */
      }
    }
  `],
})
export class GraphsContainerComponent implements OnInit {
  
    @Input() partner!: PartnerInterface;
    calculatedProfit: number = 0;

    constructor(
      private indexService: IndexService,
    ) {

    }

    ngOnInit(): void {
      if (this.partner) {

        /**
        * Method to get the statistics of the income on the dashboard
        * @param {string} partnerId - The partner id  
        * @param {Date} startDate - The start date of the income
        * @param {Date} endDate - The end date of the income
        * @returns {Observable} - The plan statistics: user income within the specified date range
        * 
        */
         this.indexService.getProfitForAPeriodDasboard(this.partner._id).subscribe({
          next: (getProfit: any) => {
            this.calculatedProfit = getProfit.totalIncome;
            //console.log(this.calculatedProfit)
          }
        });

      }
    }
}