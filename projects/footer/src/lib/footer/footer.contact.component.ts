import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'async-footer-contact',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
      <section>
        <h2>Contact Us</h2>

        <article>
          <strong>MarketSpase</strong>
          <p>
            <!-- <a routerLink="about-us" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">About Us</a> -->
            <a href="https://marketspase.com/about-us">About Us</a>
          </p>
          <p>
            <!-- <a routerLink="contacts" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Contact Us</a> -->
            <a href="https://marketspase.com/contacts">Contact Us</a>
          </p>
          <!-- <p> Main Office: <br>  15 Agudama Street D-line Port Harcourt, Rivers State Nigeria.</p> -->
        </article>

        <article>
          <strong>Email</strong>
          <p> <!-- contacts&#64;async.ng, <br> -->  contacts&#64;marketspase.com</p>
        </article>

        <!-- <article>
          <strong>Phone</strong>
          <p> +234 816 008 6326, <br>  080 8038 6208<br>
        </p>
        </article> -->

      </section>
  `,
  styles: [`
    section {
      display: flex;
      flex-direction: column;
      color: white;
      article {
        p {
          font-size: 14px;
          font-family:"Open Sans", sans;
          a {
            text-decoration: none;
            color: white;
          }
        }
        button {
          margin-top: 6px;
          font-size: 10px;
        }
      }
    }
  `]
})
export class FooterContactComponent {
  lunchWhatsAppGroup() {
    window.open('https://wa.me/message/BQ4PN6TYXNE5D1', '_blank');
  }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
