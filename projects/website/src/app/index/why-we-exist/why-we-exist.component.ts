import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'async-index-why-we-exist',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule,  MatFormFieldModule, MatInputModule, CommonModule],
  template: `
    <aside class="why-we-exist">
      <div>

      <span class="mark">
        <strong>Sign Up To Get Started: </strong>Secure a spot now by signing up and begin your journey as a business owner.
        <div class="more">
          <a routerLink="get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Sign up <i class="fa fa-angle-double-right"></i></a>
        </div>
      </span>


      <span class="mark">
        <strong>Start Running Your Business: </strong>Use our simple, user-friendly platform to manage, run and grow your business, with support from other business owners.
        <div class="more">
          <!-- <a routerLink="tow-services" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Know more <i class="fa fa-angle-double-right"></i></a> -->
          <a href="http://platform.marketspase.com" target="_blank">Sign in <i class="fa fa-angle-double-right"></i></a>
        </div>
      </span>

       
      <span>
        <strong>Book a Session: </strong>If needed, you can schedule a session for comprehensive clarification.
        <div class="more">
          <a routerLink="booking" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Book now <i class="fa fa-angle-double-right"></i></a>
        </div>
      </span>

      </div>


      <h1>MarketSpase: Your Online Business space for passive income!</h1>

      <!-- <a mat-flat-button color="primary" routerLink="plans" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Start Your Own Business Now</a> -->
    </aside>
  `,
  styles: [`
  aside {
    padding: 3em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      margin: 1em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .mark {
          border-right: 1px dotted #bbb;
          padding-right: 1em;
        }
      span {
        margin: 0.4em;
        //color: #AD1457;
        color: rgb(10, 0, 38);
        font-family: Verdana;
        strong {
          display: block;
          margin-bottom: 0.5em;
          color:rgb(98, 67, 4);
        }
        .more {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          a {
            font-size: 0.8em;
            color:rgb(98, 56, 0);
            font-weight: bolder;
            text-decoration: none;
          }
        }
      }
    }
    h1 {
      font-weight: bolder;
      margin: 1em;
    }
    small {
      text-align: justify;
      margin: 0 1em;
    }
  }


  /* Media Query for Mobile Responsiveness */
@media screen and (max-width: 600px) {
  aside {
    div {
      margin: 1em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span {
        font-size: 13px;
        text-align: justify;
      }
      .mark {
        border-bottom: 1px dotted #bbb;
        border-right: 0px dotted #bbb;
        padding-bottom: 1em;
      }
    }
  }
}
  `],
})
export class WhyWeExistComponent{   
  
  // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
