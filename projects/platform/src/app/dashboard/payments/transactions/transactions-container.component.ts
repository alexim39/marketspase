import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { TransactionsComponent } from './transactions.component';
import { PaymentService, TransactionInterface } from '../payment.service';


/**
 * @title Funds withdrawal container
 */
@Component({
  selector: 'async-withdraw-container',
  imports: [CommonModule, TransactionsComponent],
  providers: [PaymentService],
  template: `
  <async-transactions *ngIf="partner && transactions" [partner]="partner" [transactions]="transactions"/>
  `,
})
export class TransactionContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  transactions!: TransactionInterface; 
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface;
          this.paymentService.getTransactions(this.partner._id).subscribe({
            next: (transactions: TransactionInterface) => {
              //console.log('t=',transactions)
              this.transactions = transactions;
            }
          })
        }
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}