import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardsContainerComponent } from './dashboard-cards/dashboard-cards-container.component';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { GraphsContainerComponent } from './graphs/graphs-container.component';
import { PartnerInterface, PartnerService } from '../../_common/services/partner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'async-dashboard',
  imports: [
    CommonModule,
    DashboardCardsContainerComponent, 
    NotificationBannerComponent,
    DashboardHeaderComponent,
    GraphsContainerComponent,
  ],
  template: `

  <async-dashboard-header/>
  <async-notification-banner *ngIf="partner" [partner]="partner" />
  <async-dashboard-cards-container *ngIf="partner" [partner]="partner" />
  <async-graphs-contaner/>

  `,
styles: [``],
})
export class DashboradComponent {
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
          this.partner = partnerObject as PartnerInterface;
          //console.log(this.partner)
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
