import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AccountComponent } from './account.component';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';

/**
 * @title Container
 */
@Component({
  selector: 'async-account-container',
  template: `
  <async-account *ngIf="partner" [partner]="partner" ></async-account>
  `,
  providers: [],
  imports: [CommonModule, AccountComponent],
})
export class AccountContainerComponent implements OnInit, OnDestroy {

    
  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
  ) { }

  ngOnInit() {
      
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next:  (partnerObject) => {
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