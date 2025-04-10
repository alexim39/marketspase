import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PartnerInterface } from '../../../_common/services/partner.service';

@Component({
  selector: 'async-side-graph',
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule],
  template: `
    <div class="dashboard-card">
      <div class="header">
        <span>{{ partner.incomeTarget.period ? partner.incomeTarget.period.toLocaleUpperCase() : 'N/A' }} INCOME TARGET</span>
      </div>

      <div class="chart-container">
        <!-- Background Circle -->
        <div class="background-circle"></div>

        <!-- Progress Spinner -->
        <mat-progress-spinner 
          mode="determinate" 
          [value]="progressPercentage" 
          diameter="100" 
          color="primary">
        </mat-progress-spinner>

        <!-- Percentage Text -->
        <div class="percentage-text">{{ progressPercentage }}%</div>
      </div>

      <div class="progress-section">
        <span class="progress-label">{{ progressPercentage }}%</span>
        <mat-progress-bar mode="determinate" [value]="progressPercentage" color="warn"></mat-progress-bar>
        <span class="progress-text">
          Current progress towards a {{ partner.incomeTarget.period ? (partner.incomeTarget.period | titlecase) : 'N/A' }} income target of 
          {{ partner.incomeTarget.targetAmount ? (partner.incomeTarget.targetAmount | currency:'₦':'symbol':'1.2-2') : 'N/A' }}.
        </span>
      </div>
    </div>
  `,
  styles: [
    `
    .dashboard-card {
      padding: 1em;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      font-size: 14px;
    }
    .menu-icon {
      cursor: pointer;
      font-size: 20px;
    }

    .chart-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;

      .background-circle {
        position: absolute;
        width: 100px; /* Match the diameter of the spinner */
        height: 100px; /* Match the diameter of the spinner */
        border-radius: 50%;
        border: 10px solid #e0e0e0; /* Light gray background circle */
        box-sizing: border-box;
      }

      mat-progress-spinner {
        position: relative;
        z-index: 1; /* Ensure the spinner is above the background circle */
      }

      .percentage-text {
        position: absolute;
        font-size: 22px;
        font-weight: bold;
        z-index: 2; /* Ensure the text is above both the spinner and background circle */
      }
    }
    .progress-section {
      text-align: left;
      margin-top: 15px;
    }
    .progress-label {
      font-weight: bold;
      color: #f39c12;
    }
    mat-progress-bar {
      width: 100%;
      margin: 5px 0;
    }
    .progress-text {
      font-size: 12px;
    }

    @media (max-width: 1200px) {
      .dashboard-card {
        padding: 10px; /* Adjust padding for medium screens */
        font-size: 12px; /* Adjust font size for medium screens */
      }
    }

    @media (max-width: 768px) {
      .dashboard-card {
        padding: 8px; /* Adjust padding for small screens */
        font-size: 10px; /* Adjust font size for small screens */
        text-align: left; /* Align text to the left for small screens */
      }
      .chart-container {
        flex-direction: column; /* Stack chart and text vertically */
        align-items: center; /* Align items to the start */
        margin-top: 5px; /* Adjust margin for small screens */
      }
      .percentage-text {
        position: absolute; 
        margin-top: 5px; /* Add margin to separate text from chart */
        font-size: 18px; /* Adjust font size for small screens */
      }
    }
    `
  ]
})
export class SideGraphComponent implements OnInit {
  @Input() partner!: PartnerInterface;
  @Input() calculatedProfit: number = 0; // default
  incomeTarget: number = 0; // default

  ngOnInit(): void {
    // Ensure partner and incomeTarget are properly initialized
    if (!this.partner) {
      this.partner = {
        incomeTarget: {
          period: 'N/A',
          targetAmount: 0,
        },
      } as PartnerInterface;
    }

    if (!this.partner.incomeTarget) {
      this.partner.incomeTarget = {
        period: 'N/A',
        targetAmount: 0,
      };
    }

    this.incomeTarget = this.partner.incomeTarget.targetAmount || 10000;
  }

  get progressPercentage(): number {
    if (this.incomeTarget <= 0) return 0;
    const percent = (this.calculatedProfit / this.incomeTarget) * 100;
    return Math.min(100, Math.round(percent));
  }
}