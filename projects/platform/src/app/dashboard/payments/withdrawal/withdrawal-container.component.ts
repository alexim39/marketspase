import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { WithdrawalComponent } from './withdrawal.component';


/**
 * @title Funds withdrawal container
 */
@Component({
  selector: 'async-withdraw-container',
  imports: [CommonModule, WithdrawalComponent],
  providers: [],
  template: `
  <async-withdrawal *ngIf="partner" [partner]="partner"/>
  `,
})
export class WithdrawalContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
  ) { }

  ngOnInit() {
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface
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