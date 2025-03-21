import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

/** @title Async why you should join page */
@Component({
  selector: 'async-why-you-should-join',
  standalone: true,
  imports: [MatFormFieldModule, RouterModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule],
  template: `
    <div class="training-approach">
      <h1>Why You Should Join?</h1>

      <section class="approach-cards">
        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="rocket_launch"></mat-icon>
            <h1>Financial Success</h1>
          </div>
          <div class="content">
            <p>
            Earn money while you sleep by signing up and purchasing a digital space.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="lightbulb"></mat-icon>
            <h1>Reduced Stress</h1>
          </div>
          <div class="content">
            <p>
            The MarketSpase platform enables you to manage, grow, and run your business with 90% less effort.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="approval_delegation"></mat-icon>
            <h1>Proven System</h1>
          </div>
          <div class="content">
            <p>
            Our system has a proven track record of success backed with continuous support, offering a dependable way to secure an alternative income stream.
            </p>
          </div>
        </div>

      </section>

      <section class="call-to-action">
        <!-- <p>
        Click the button below to join our WhatsApp community for updates and real-time communication.
        </p> -->

        <p>
        Download our Business Guide and gain comprehensive knowledge about our business
        </p>

        <div class="down-arrow">
          <mat-icon>arrow_downward</mat-icon>
        </div>

        <!-- <button mat-raised-button (click)="lunchWhatsAppGroup()">
          <span class="fa fa-whatsapp"></span> WhatsApp Group
        </button> -->

        <a mat-raised-button routerLink="guide-download" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Download Business Guide PDF</a>
      </section>
    </div>
  `,
  styleUrls: ['why-you-should-join.component.scss']
})
export class AboutWhyYouShouldJoinComponent {

  @Input() partnerWhatsappGroupLink!: string | undefined;

  lunchWhatsAppGroup() {
    if (this.partnerWhatsappGroupLink) {
      window.open(this.partnerWhatsappGroupLink, '_blank');
    } else {
      window.open('https://chat.whatsapp.com/EO6Xl6zsDwwA9yZrcVUwP2', '_blank');
    }
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}