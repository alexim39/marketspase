import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { NewBuyComponent } from './new-buy.component';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';


/**
 * @title New Plan Container
 */
@Component({
  selector: 'async-new-buy-container',
  standalone: true,
  imports: [CommonModule, NewBuyComponent],
  providers: [],
  template: `
  <async-new-buy *ngIf="partner" [partner]="partner"/>
  `,
})
export class NewBuyContainerComponent implements OnInit, OnDestroy {

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