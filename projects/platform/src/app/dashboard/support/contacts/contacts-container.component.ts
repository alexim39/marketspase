import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { SubmitRequestComponent } from './contacts.component';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';


/**
 * @title Submit Request Form for support
 */
@Component({
  selector: 'async-contacts-container',
  standalone: true,
  imports: [CommonModule, SubmitRequestComponent],
  providers: [],
  template: `
  <async-contacts *ngIf="partner" [partner]="partner"/>
  `,
})
export class SubmitRequestContainerComponent implements OnInit, OnDestroy {

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