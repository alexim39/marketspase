import { Component, inject, Input, OnInit } from '@angular/core';
import { AnalyticsService } from './analytics.services';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'async-analytics',
  providers: [AnalyticsService],
  imports: [CommonModule, MatIconModule, RouterModule, MatButtonModule],
  template: `

  
<section class="breadcrumb-wrapper">
  <div class="breadcrumb">
    <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="scrollToTop()">Dashboard</a> &gt;
    <a>Business</a> &gt;
    <!-- <a>Spase Plans</a> &gt; -->
    <span>business analytics </span>
  </div>
</section>


<section class="async-background">
  <h2>Business Analytics <mat-icon class="help" (click)="showDescription()">help</mat-icon></h2>

    <section class="async-container">
      <div class="title">
          <h3>Business Health Analytics</h3>
          <!-- <div class="action-area">
              <a mat-list-item routerLink="../../business/new" routerLinkActive="active" (click)="scrollToTop()" title="New Spase Plan" mat-raised-button><mat-icon>add</mat-icon>New Plan</a>
          </div> -->
      </div>

      <div class="content">

        <div class="analytics-container">

            <div class="stat-card">
                <h3>Total Campaigns</h3>
                <p>{{ analyticsData.totalCampaigns }}</p>
            </div>

            <div class="stat-card">
                <h3>Active Campaigns</h3>
                <p>{{ analyticsData.activeCampaigns }}</p>
            </div>

            <div class="stat-card">
                <h3>Total Leads</h3>
                <p>{{ analyticsData.totalLeads }}</p>
            </div>

            <div class="stat-card">
                <h3>Total Partners</h3>
                <p>{{ analyticsData.totalPartners }}</p>
            </div>

            <div class="stat-card">
                <h3>Active Partners</h3>
                <p>{{ analyticsData.activePartners }}</p>
            </div>

            <div class="stat-card">
                <h3>Total Revenue</h3>
                <p>₦{{ analyticsData.totalRevenue }}</p>
            </div>

            <div class="stat-card">
                <h3>Plan Distribution</h3>
                <ul>
                <li *ngFor="let plan of analyticsData.planDistribution">
                    {{ plan._id }}: {{ plan.count }} users
                </li>
                </ul>
            </div>
        </div>

    </div>
    </section>
</section>



  `,
styles: [`

.async-background {
  margin: 2em;
  .help {
      cursor: pointer;
  }
  .async-container {
    border-radius: 1%;
    height: 100%;
    padding: 1em;
    .title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        margin-bottom: 1em;
        padding: 1em;
        .action-area {
            .action {
                font-weight: bold;
                margin-top: 1em;
            }
        }
    }
    .content {
      border-radius: 6px;

      .search {
        padding: 0.5em 0;
        text-align: center;
        mat-form-field {
          width: 70%;
        }
      }

      .table {
        padding: 0 1em;
      }
    }
  }
}

.analytics-container {
  padding: 20px;
  text-align: center;
}

.stat-card {
  display: inline-block;
  width: 200px;
  margin: 10px;
  padding: 15px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

  `]
})
export class AnalyticsComponent implements OnInit {
  @Input() partner!: PartnerInterface;  
  analyticsData: any = {};
  planChart: any;

  readonly dialog = inject(MatDialog);

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.analyticsService.getBusinessAnalytics().subscribe((data) => {
      this.analyticsData = data;
      this.createPlanChart();
    });
  }

  createPlanChart() {
    const ctx = document.getElementById('planChart') as HTMLCanvasElement;
    this.planChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.analyticsData.planDistribution.map((p: any) => p._id),
        datasets: [
          {
            data: this.analyticsData.planDistribution.map((p: any) => p.count),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
          },
        ],
      },
    });
  }

   scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   }
  
    showDescription() {
      this.dialog.open(HelpDialogComponent, {
        data: { help: 'In this section, you can view and track your business plans' },
      });
    }
}
