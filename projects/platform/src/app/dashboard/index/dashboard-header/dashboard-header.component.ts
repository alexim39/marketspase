import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'async-dashboard-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSelectModule],
  template: `
    <div class="header">
      <div class="left-section">
        <mat-icon>dashboard</mat-icon>
        <div>
          <h3 class="title">MarketSpase Dashboard</h3>
          <p class="breadcrumb">Dashboard / MarketSpase platform </p>
        </div>
      </div>

      <div class="right-section">
       <!--  <mat-form-field appearance="outline" class="period-select">
          <mat-select placeholder="Select period">
            <mat-option value="weekly">Weekly</mat-option>
            <mat-option value="monthly">Monthly</mat-option>
            <mat-option value="yearly">Yearly</mat-option>
          </mat-select>
        </mat-form-field> -->
        <button mat-icon-button class="settings-btn">
          <mat-icon>settings</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      border-bottom: 1px solid #ddd;
    }
    .left-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .title {
      margin: 0;
      font-size: 18px;
      font-weight: bold;

    }
    .breadcrumb {
      margin: 0;
      font-size: 12px;
      color: #777;
      
    }
    .right-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .period-select {
      width: 150px;
      font-size: 14px;
    }
    .settings-btn {
      background: #fff;
      border-radius: 5px;
      border: 1px solid #ddd;
      padding: 5px;
    }
  `]
})
export class DashboardHeaderComponent {}
