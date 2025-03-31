import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsService } from './analytics.services';


/**
 * @title AnalyticsContainerComponent
 */
@Component({
  selector: 'async-analytics-container',
  imports: [CommonModule, AnalyticsComponent],
  providers: [AnalyticsService],
  template: `
  <async-analytics *ngIf="partner" [partner]="partner"/>
  `,
})
export class AnalyticsContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  constructor(
    private partnerService: PartnerService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
          this.partner = partnerObject as PartnerInterface;
  
          if (this.partner) {
           
          }
        }
      })
    );
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}