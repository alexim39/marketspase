import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'async-dashboard-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule],
  template: `
   <mat-card class="card" [ngStyle]="{'border-bottom-color': borderColor}">
      <div class="card-content">
        <div class="text-section">
          <p class="title">{{ title }}</p>
          <div class="growth" [ngStyle]="{'color': growthColor}">
            <span class="arrow">
              <mat-icon>{{icon}}</mat-icon>
            </span>
            <span class="percentage">{{ mainValue }}</span>
          </div>
        </div>
        <div class="progress-circle">
          <mat-spinner 
            diameter="50" 
            mode="determinate" 
            [value]="value"
            class="spinner">
          </mat-spinner>
          <span class="progress-text">{{ value }}%</span>
        </div>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .card {
        width: 200px;
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
        color: #777;
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
      }
      .progress-text {
        position: absolute;
        font-size: 14px;
        font-weight: bold;
        color: #333;
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
export class DashboardCardsComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() mainValue!: number;
  @Input() borderColor: string = 'green';  // Default color
  @Input() growthColor: string = '#2e7d32'; // Default text color
  @Input() icon: string = 'arrow_upward'; // Default text color

  @HostBinding('style.--spinner-color') get spinnerColor() {
    return this.borderColor;
  }
}