import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * @title Application top notification banner
 */
@Component({
  selector: 'async-notification-banner',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section>
      <p>
        <span>
          <a mat-button routerLink="plans" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="scrollToTop()" class="blinking-link">Get started</a> with EliteSpace (N50,000) and get a free branded cap or EmpireSpace (N100,000) and get a free branded clothe. Available while stock last.
        </span>
      </p>
    </section>
  `,
  styles: [`
    section {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #050111;
      color: white;
      font-family: ui-rounded;
      padding: 0.5em;
      a {
        text-decoration: underline;
        color: #ff9900;
        font-size: 1em;
        font-weight: bolder;
      }

      span {
        text-decoration: none;
        color: #ff9900;
        font-size: 1em;
        font-weight: bolder;
      }
    }

    .blinking-link {
      animation: blinker 3s linear infinite;
    }

    @keyframes blinker {
      50% {
        opacity: 0;
      }
    }
  `]
})
export class NotificationBannerComponent {
  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}