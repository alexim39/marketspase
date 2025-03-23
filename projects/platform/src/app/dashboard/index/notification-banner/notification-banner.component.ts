import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'async-notification-banner',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div *ngIf="visible" class="info-alert">
      <mat-icon class="info-icon">info</mat-icon>
      <span>
        This dashboard example was created using only the available elements and components, 
        no additional SCSS was written!
      </span>
      <mat-icon class="close-icon" (click)="closeAlert()">close</mat-icon>
    </div>
  `,
  styles: [
    `
      .info-alert {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #d9edf7;
        color: #31708f;
        padding: 12px;
        border-radius: 5px;
        font-size: 14px;
        border-left: 4px solid #31708f;
        position: relative;
        margin: 1em;
      }
      .info-icon {
        font-size: 20px;
        color: #31708f;
        margin-right: 10px;
      }
      .close-icon {
        font-size: 20px;
        cursor: pointer;
        color: #31708f;
        margin-left: auto;
      }
      .close-icon:hover {
        color: #25586a;
      }

      @media (max-width: 768px) {
        .info-alert {
          flex-direction: column;
          align-items: flex-start;
          font-size: 12px; /* Adjust font size for small screens */
          padding: 8px; /* Adjust padding for small screens */
        }
        .info-icon {
          margin-bottom: 8px; /* Add margin to separate icon from text */
        }
        .close-icon {
          margin-top: 8px; /* Add margin to separate close icon from text */
          margin-left: 0; /* Reset left margin */
          align-self: flex-end; /* Align close icon to the end */
        }
      }
    `
  ]
})
export class NotificationBannerComponent {
  visible = true;

  closeAlert() {
    this.visible = false;
  }
}