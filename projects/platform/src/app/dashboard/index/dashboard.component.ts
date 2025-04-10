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

@Component({
  selector: 'async-dashboard',
  providers: [IndexService],
  imports: [
    CommonModule,
    DashboardCardsContainerComponent, 
    NotificationBannerComponent,
    DashboardHeaderComponent,
    GraphsContainerComponent,
    TestimonialsComponent
  ],
  template: `

<async-dashboard-header></async-dashboard-header>
<async-notification-banner *ngIf="partner" [partner]="partner"></async-notification-banner>
<async-dashboard-cards-container *ngIf="partner" [partner]="partner"></async-dashboard-cards-container>

<div class="testimonial-container">
  <div class="left-section">
    <async-dashboard-testimonials *ngIf="partner" [partner]="partner" [testimonials]="testimonials"/>
  </div>
  <div class="right-section">
    <!-- <async-dashboard-testimonials></async-dashboard-testimonials> -->
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
    //background: #f9f9f9; /* Optional: Add a background color */
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
  }

  .right-section {
    flex: 2; /* 40% of the width */
    //background: #ffffff; /* Optional: Add a background color */
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
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
}
