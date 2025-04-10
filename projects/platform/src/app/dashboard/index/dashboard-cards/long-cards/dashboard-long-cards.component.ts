import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { PowerOfTenPipe } from '../../../../_common/pipes/power-of-ten';

@Component({
  selector: 'async-dashboard-long-cards',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, PowerOfTenPipe],
  template: `


<mat-card class="card" [ngStyle]="{'border-bottom-color': borderColor}">
  <div class="card-content">
    <div class="text-section">
      <p class="title">{{ title }}</p>
      <div class="growth" [ngStyle]="{'color': growthColor}">
        <span class="arrow">
          <mat-icon>{{ icon }}</mat-icon>
        </span>
        <span class="percentage">
          {{ mainValue.count }}
          <span *ngIf="mainValue?.total && mainValue.total > 0">/ {{ mainValue.total | powerOfTen }}</span>
        </span>
      </div>
    </div>
    <div class="progress-circle">
      <!-- Background Circle -->
      <div class="background-circle"></div>

      <!-- Progress Spinner -->
      <mat-spinner 
        diameter="60" 
        mode="determinate" 
        [value]="mainValue.total && mainValue.total > 0 ? (mainValue.count / mainValue.total) * 100 : 0"
        class="spinner">
      </mat-spinner>

      <!-- Progress Text -->
      <span class="progress-text">
        <ng-container *ngIf="mainValue?.total && mainValue.total > 0; else zeroProgress">
          {{ ((mainValue.count / mainValue.total) * 100) | number:'1.1-1' }}%
        </ng-container>
        <ng-template #zeroProgress>
          0%
        </ng-template>
      </span>
    </div>
  </div>
</mat-card>

  `,
  styles: [
    `
      .card {
        min-width: 250px;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        border-bottom: 2px solid;
        margin: 1em;
      }
      .card-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .title {
        font-size: 12px;
        margin: 0;
        text-transform: uppercase;
        margin-bottom: 10px;
      }
      .growth {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
      }
      .arrow {
        font-size: 18px;
        margin-right: 5px;
      }

      .progress-circle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .background-circle {
          position: absolute;
          width: 60px; /* Match the diameter of the spinner */
          height: 60px; /* Match the diameter of the spinner */
          border-radius: 50%;
          border: 5px solid #e0e0e0; /* Light gray background circle */
          box-sizing: border-box;
        }

        .spinner {
          position: relative;
          z-index: 1; /* Ensure the spinner is above the background circle */
        }

        .progress-text {
          position: absolute;
          font-size: 10px;
          font-weight: bold;
          z-index: 2; /* Ensure the text is above both the spinner and background circle */
        }
      }

      ::ng-deep .spinner svg circle {
        stroke: var(--spinner-color) !important;
      }

      @media (max-width: 1200px) {
        .card {
          width: 150px; /* Adjust card width for medium screens */
        }
      }

      @media (max-width: 768px) {
        .card {
          width: 100%; /* Full width for small screens */
          max-width: 300px; /* Maximum width for small screens */
          margin-left:auto; /* Center align for small screens */
          margin-right:auto; /* Center align for small screens */
        }
      }
    `
  ]
})
export class DashboardLongCardsComponent implements OnInit {
  @Input() title!: string;
  @Input() value!: number;
  @Input() mainValue: { count: number; total: number } = { count: 0, total: 1 }; // Default values
  @Input() borderColor: string = 'green';  // Default color
  @Input() growthColor: string = '#2e7d32'; // Default text color
  @Input() icon: string = 'arrow_upward'; // Default icon

  @HostBinding('style.--spinner-color') get spinnerColor() {
    return this.borderColor;
  }

  ngOnInit(): void {
    // Ensure mainValue is properly initialized
    if (!this.mainValue) {
      this.mainValue = { count: 0, total: 1 };
    }
  }
}