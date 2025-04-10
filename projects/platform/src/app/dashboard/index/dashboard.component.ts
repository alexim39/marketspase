import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardsContainerComponent } from './dashboard-cards/dashboard-cards-container.component';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { GraphsContainerComponent } from './graphs/graphs-container.component';
import { PartnerInterface, PartnerService } from '../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { TestimonialsComponent } from './testimonial/testimonial.component';
import { IndexService, TestimonialInterface } from './index.service';
import { SideGraphComponent } from './graphs/side-graph.component';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'async-dashboard',
  providers: [IndexService],
  imports: [
    CommonModule,
    DashboardCardsContainerComponent, 
    NotificationBannerComponent,
    DashboardHeaderComponent,
    GraphsContainerComponent,
    TestimonialsComponent,
    SideGraphComponent,
    MatButtonModule,
    RouterModule,
  ],
  template: `

<async-dashboard-header></async-dashboard-header>
<async-notification-banner *ngIf="partner" [partner]="partner"></async-notification-banner>
<async-dashboard-cards-container *ngIf="partner" [partner]="partner"></async-dashboard-cards-container>

<div class="testimonial-container">
  <div class="left-section">
    <div class="action-button">
      <a mat-stroked-button  routerLink="settings/social-pages" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()" title="Add testimonial">Add</a>
    </div>
    <async-dashboard-testimonials *ngIf="partner" [partner]="partner" [testimonials]="testimonials"/>
  </div>
  <div class="right-section">
    <div class="action-button">
      <a mat-stroked-button  routerLink="settings/system" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()" title="Add testimonial">Set</a>
    </div>
    <async-side-graph *ngIf="partner" [partner]="partner" [calculatedProfit]="calculatedProfit"/> 
  </div>
</div>

<async-graphs-contaner *ngIf="partner" [partner]="partner"></async-graphs-contaner>

`,

styles: [`

  .testimonial-container {
    display: flex;
    gap: 16px; /* Add spacing between the sections */
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
  }

  .left-section {
    flex: 3; /* 60% of the width */
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
    .action-button {
      margin-bottom: 16px;
      display: flex;
      justify-content: flex-end; 
      &:hover {
      }
    }
  }

  .right-section {
    flex: 2; /* 40% of the width */
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
    .action-button {
      margin-bottom: 16px;
      display: flex;
      justify-content: flex-end; 
      &:hover {
      }
    }
  }

  @media (max-width: 768px) {
    .testimonial-container {
      flex-direction: column; /* Stack sections vertically on smaller screens */
    }

    .left-section,
    .right-section {
      flex: 1; /* Equal width when stacked */
    }
  }

`],
})
export class DashboradComponent {
  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];
  testimonials: Array<TestimonialInterface> = [];
  calculatedProfit: number = 0;

  constructor(
    private partnerService: PartnerService,
    private indexService: IndexService,
  ) { }

  ngOnInit() {
      
    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next:  (partnerObject) => {
          this.partner = partnerObject as PartnerInterface;
          //console.log(this.partner)
          if (this.partner ) {

            this.indexService.getProfitForAPeriodDasboard(this.partner._id).subscribe({
              next: (getProfit: any) => {
                this.calculatedProfit = getProfit.totalIncome;
              }
            });
            
          }
        }
      }),

      this.indexService.getRandomTestimonials().subscribe({
        next: (response) => {
          //console.log('r=',response)
          this.testimonials = response.data;
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
