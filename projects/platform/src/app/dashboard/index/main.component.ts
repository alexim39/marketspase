import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardsContainerComponent } from './dashboard-cards/dashboard-cards-container.component';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { GraphsContainerComponent } from './graphs/graphs-container.component';

@Component({
  selector: 'async-dashboard-main',
  imports: [
    CommonModule,
    DashboardCardsContainerComponent, 
    NotificationBannerComponent,
    DashboardHeaderComponent,
    GraphsContainerComponent,
  ],
  template: `

  <async-dashboard-header/>
  <async-notification-banner/>
  <async-dashboard-cards-container/>
  <async-graphs-contaner/>

  `,
styles: [``],
})
export class DashboradMainComponent {}
