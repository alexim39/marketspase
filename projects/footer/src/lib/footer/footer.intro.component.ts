import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoLibrary } from '../../../../logo/src/public-api';

@Component({
  selector: 'async-footer-intro',
  standalone: true,
  imports: [
    MatToolbarModule, 
    RouterModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    LogoLibrary
  ],
  template: `
 
      <section>
        <lib-logo/>

        <p>
        MarketSpase is pioneering a new era of digital entrepreneurship.
        Backed by Async Groups, a leader in enterprise-level software development, we've created a platform that redefines accessibility and profitability in the online space.       
        </p>

        <p>
        MarketSpase is straightforward: You begin by securing a digital Spase plan, or as we call it, a your online shop.       </p>

        <p>
        MarketSpase is not just another innovation; it's the <strong>Online Business Space</strong> you've been waiting for.
        </p>
      </section>
      
  `,
  styles: [`
    section {
        width: 20em;
        text-align: left;
        p {
        font-size: 14px;
        text-align: justify;
        font-family:"Open Sans", sans;
        }
    }
    p {
    color: #ccc;
    font-size: 0.6em;
    }


/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {

    section {
    width: 100%;
    margin-top: 1.5em;
    }
}  

/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {

    section {
    width: 100%;
    }
}

`]
})
export class FooterIntroComponent {}
