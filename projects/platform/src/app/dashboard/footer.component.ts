import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'async-dashboard-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <p>© {{ year }} MarketSpase by Async Groups. All rights reserved.</p>
    </footer>
  `,
  styles: [
    `
      .footer {
       /*  position: fixed;
        bottom: 0;
        right: 0; */
        text-align: right;
        color: #aaa;
        font-size: 11px;
        padding: 5px 10px 2px 2px;
        //background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
      }

      @media (max-width: 600px) {
        .footer {
          font-size: 12px; /* Adjust font size for small screens */
          padding: 8px; /* Adjust padding for small screens */
        }
      }
    `
  ],
})
export class DashboardFooterComponent {
  year = new Date().getFullYear();
}