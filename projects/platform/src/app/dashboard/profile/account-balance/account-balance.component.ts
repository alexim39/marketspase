import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';
import { AccountBalanceService } from './account-balance.service';

@Component({
  selector: 'async-account-balance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="balance-value" [ngClass]="{'low-balance': balance < 1000}">
      {{ balance | currency:'₦':'symbol':'1.2-2'}}
    </div>
  `,
  styles: [`
    .balance-value {
      font-weight: bold;
      color: #2e7d32;
      font-size: 0.8em;
    }
    .balance-value.low-balance {
      color: gray;
    }
  `],
  providers: [ProfileService]
})
export class AccountBalanceComponent implements OnInit, OnDestroy {
  partner: PartnerInterface | undefined; // Initialize as undefined
  subscriptions: Subscription[] = [];
  balance!: number;

  constructor(
    private partnerService: PartnerService,
    private profileService: ProfileService,
    private accountBalanceService: AccountBalanceService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface;

          if (this.partner && this.partner._id) { // Check if partner and _id exist
            this.getBalance(this.partner._id);
          }
        }
      }),
      this.accountBalanceService.balanceUpdated$.subscribe(() => {
        if (this.partner && this.partner._id) { // Check before accessing _id
          this.getBalance(this.partner._id);
        }
      })
    );
  }

  private getBalance(id: string): void {
    this.subscriptions.push(
      this.profileService.getCurrentBalance(id).subscribe({
        next: (balance) => {
          this.balance = balance;
        },
        error: (error) => {
          console.error('Error fetching balance:', error);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}