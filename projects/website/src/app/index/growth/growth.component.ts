import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'async-growth',
  template: `
    <div class="features-container">
      <div class="feature">
        <!-- <span class="icon">👥</span> -->
        <mat-icon class="icon">group_add</mat-icon>
        <span>600K+ active business owners</span>
      </div>
      <div class="feature">
        <!-- <span class="icon">🤖</span> -->
        <mat-icon class="icon">precision_manufacturing</mat-icon>
        <span>Simple AI platform</span>
      </div>
      <div class="feature">
        <!-- <span class="icon">🎧</span> -->
        <mat-icon class="icon">support_agent</mat-icon>
        <span>24/7 community support</span>
      </div>
    </div>
  `,
  imports: [MatIconModule],
  styles: [`
    .features-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 30px;
      padding: 2em 10%;
      
    }
    .feature {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 16px;
      color: #333;
      white-space: nowrap;
      border-bottom: 1px solid #ddd;
      padding-bottom: 2em;
    }
    .icon {
      font-size: 22px;
      color: rgb(5, 1, 17);
    }
    @media (max-width: 768px) {
      .features-container {
        flex-direction: column;
        padding: 20px 5%;
        text-align: center;
      }
      .feature {
        justify-content: flex-left;
        width: 100%;
      }
    }
  `]
})
export class GrowthComponent {}
