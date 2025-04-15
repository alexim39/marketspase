import { Component, Input,  OnDestroy,  OnInit } from '@angular/core';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IndexService } from '../index.service';
import { RecentPayoutsComponent } from './recent-payment.component';
import { WeeklyIncomeGraphComponent } from './weekly-income-graph.component';

/**
 * @title graphs container
 */
@Component({
  selector: 'async-graphs-contaner',
  providers: [IndexService],
  template: `
    <section class="container">

      <section class="main">
      <async-weekly-income-graph
        *ngIf="partner && hasWeeklyProfits()"
        [partner]="partner"
        [weeklyProfits]="weeklyProfits"
      />
        <!-- <async-monthly-income-graph *ngIf="partner" [partner]="partner"/> -->
      </section>

      <section class="side">
        <async-recent-payouts *ngIf="payouts" [payouts]="payouts"/>
      </section>

    </section>
  `,
    imports: [CommonModule, WeeklyIncomeGraphComponent, RecentPayoutsComponent],
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
export class GraphsContainerComponent implements OnInit, OnDestroy {
  @Input() partner!: PartnerInterface;
  payouts = [];
  weeklyProfits: any = {}; // Initialize as an empty object
  subscriptions: Subscription[] = [];

  constructor(private indexService: IndexService) {}

  ngOnInit(): void {
    if (this.partner && this.partner._id) {
      this.subscriptions.push(
        this.indexService.getWeeklyProfits(this.partner._id).subscribe({
          next: (weeklyProfits: any) => {
            this.weeklyProfits = weeklyProfits.profits || {}; // Ensure a fallback value
          },
          error: (err) => {
            console.error('Error fetching weekly profits:', err);
            this.weeklyProfits = {}; // Fallback to an empty object on error
          }
        }),

        this.indexService.getRecentPayout().subscribe({
          next: (getPayout: any) => {
            this.payouts = getPayout.data;
            //console.log('payouts', this.payouts);
          }
        }),
      );
    }
  }

  hasWeeklyProfits(): boolean {
    return this.weeklyProfits && Object.keys(this.weeklyProfits).length > 0;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}