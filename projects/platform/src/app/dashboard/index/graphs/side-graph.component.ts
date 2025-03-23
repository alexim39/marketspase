import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'async-side-graph',
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule, MatIconModule],
  template: `
    <div class="dashboard-card">
      <div class="header">
        <span>Income</span>
        <mat-icon class="menu-icon">more_vert</mat-icon>
      </div>

      <div class="chart-container">
        <mat-progress-spinner 
          mode="determinate" 
          [value]="75" 
          diameter="100" 
          color="primary">
        </mat-progress-spinner>
        <div class="percentage-text">75%</div>
      </div>

      <div class="progress-section">
        <span class="progress-label">32%</span>
        <mat-progress-bar mode="determinate" [value]="32" color="warn"></mat-progress-bar>
        <span class="progress-text">Spendings Target</span>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard-card {
        background: white;
        padding: 1em;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        //max-width: 320px;
      }
      .header {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 14px;
        color: #333;
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
        color: #333;
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
        color: #888;
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
export class SideGraphComponent {
  // Circular progress spinner value
  incomeProgress = 75;
  spendingTarget = 32;
}