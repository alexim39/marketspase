import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PayoutsInterface } from '../index.service';

@Component({
  selector: 'async-recent-payouts',
  imports: [CommonModule],
  template: `
  <div class="payouts-container">
    <h3 class="title">💸 Recent Payouts</h3>
    <div class="scroll-box">
      <div class="scroll-content">
        <!-- Original List -->
        <div class="payout-item" *ngFor="let payout of payouts">
          <span class="name">{{ payout.name }}</span>
          <span class="amount">{{ payout.amount }}</span>
          <span class="time">{{ getTimeAgo(payout.time) }}</span>
        </div>
        <!-- Duplicated List -->
       <!--  <div class="payout-item" *ngFor="let payout of payouts">
          <span class="name">{{ payout.name }}</span>
          <span class="amount">{{ payout.amount }}</span>
          <span class="time">{{ getTimeAgo(payout.time) }}</span>
        </div> -->
      </div>
    </div>
  </div>
  `,
  styles: `
  .payouts-container {
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

    .title {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 10px;
      text-align: center;
    }

    .scroll-box {
      max-height: 400px;
      overflow: hidden; /* Hide the scrollbar */
      position: relative;
    }

    .scroll-content {
      display: flex;
      flex-direction: column;
      animation: scroll 20s linear infinite; /* Apply the scrolling animation */
    }

    .payout-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 8px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0.9rem;
      color: #444;

      .name {
        font-weight: 600;
        flex: 1;
      }

      .amount {
        color: green;
        flex: 1;
        text-align: center;
      }

      .time {
        font-size: 0.8rem;
        color: #888;
        flex: 1;
        text-align: right;
      }
    }

    @keyframes scroll {
      0% {
        transform: translateY(0); /* Start at the top */
      }
      100% {
        transform: translateY(-50%); /* Scroll up by half the height of the content */
      }
    }
  }
  `
})
export class RecentPayoutsComponent {
    @Input() payouts: Array<PayoutsInterface> = [];

 /*  payouts = [
    { name: 'Grace U.', amount: '₦25,000', time: '2025-04-08 10:45 AM' },
    { name: 'Samuel O.', amount: '₦15,500', time: '2025-04-08 11:30 AM' },
    { name: 'Jane D.', amount: '₦30,000', time: '2025-04-09 09:10 AM' },
    { name: 'Michael T.', amount: '₦12,000', time: '2025-04-09 04:30 PM' },
    { name: 'Angela A.', amount: '₦20,000', time: '2025-04-10 07:50 AM' },
    { name: 'Tunde K.', amount: '₦18,000', time: '2025-04-10 09:20 AM' },
  ]; */


  getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleString(); // Show full date and time for older entries
    }
  }
}