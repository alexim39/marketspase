import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PartnerInterface } from '../../../_common/services/partner.service';

@Component({
  selector: 'async-side-graph',
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule, MatIconModule],
  template: `
    <div class="dashboard-card">
      <div class="header">
        <span>{{partner.incomeTarget.period.toLocaleUpperCase()}} INCOME TARGET</span>
        <mat-icon class="menu-icon">more_vert</mat-icon>
      </div>

      <div class="chart-container">
        <mat-progress-spinner 
          mode="determinate" 
          [value]="progressPercentage" 
          diameter="100" 
          color="primary">
        </mat-progress-spinner>
        <div class="percentage-text">{{progressPercentage}}%</div>
      </div>

      <div class="progress-section">
        <span class="progress-label">{{progressPercentage}}%</span>
        <mat-progress-bar mode="determinate" [value]="progressPercentage" color="warn"></mat-progress-bar>
        <span class="progress-text">
          Current progress towards a {{ partner.incomeTarget.period | titlecase }} income target of 
          {{ partner.incomeTarget.targetAmount | currency:'₦':'symbol':'1.2-2' }}.
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
    }
    .percentage-text {
      position: absolute;
      font-size: 22px;
      font-weight: bold;
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
  @Input() incomeTarget: number = 10000; // default

  

  ngOnInit(): void {


    this.incomeTarget = this.partner.incomeTarget.targetAmount;

    // console.log(this.calculatedProfit)
    // console.log(this.incomeTarget)
    // console.log(this.partner.incomeTarget.period)
  }

  get progressPercentage(): number {
    if (this.incomeTarget <= 0) return 0;
    const percent = (this.calculatedProfit / this.incomeTarget) * 100;
    return Math.min(100, Math.round(percent));
  }
}