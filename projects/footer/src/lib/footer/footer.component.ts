import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FooterContactComponent } from './footer.contact.component';
import { FooterConnectedComponent } from './footer.connected.component';
import { FooterIntroComponent } from './footer.intro.component';

@Component({
  selector: 'async-footer',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FooterContactComponent,
    FooterConnectedComponent,
    FooterIntroComponent
  ],
  template: `
    <footer>
      <article>
        <async-footer-intro></async-footer-intro>
        <async-footer-contact></async-footer-contact>
        <async-footer-connected></async-footer-connected>
      </article>

      <aside>
        <div class="courtesy">
          © {{ currentYear }} MarketSpase by Async Groups. All Rights Reserved
        </div>
        <div class="policies">
          <a href="https://marketspase.com/legal/terms" target="_blank">T&amp;C</a>
          <a href="https://marketspase.com/legal/privacy" target="_blank">Privacy</a>
          <a href="https://marketspase.com/legal/cookies" target="_blank">Cookies</a>
        </div>
      </aside>
    </footer>
  `,
  styles: [`
    footer {
      position: relative; /* Create stacking context */
      text-align: center;
      background: rgb(66, 66, 66); /* Solid background for better text readability */
      
      /* Pseudo-element for the top gradient shadow */
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 20px; /* Adjust thickness as needed */
        background: linear-gradient(to bottom, rgba(5, 1, 17, 0.7), transparent);
        pointer-events: none;
        z-index: 0; /* Place behind the content */
      }
      
      /* Ensure the inner content appears above the pseudo-element */
      article,
      aside {
        position: relative;
        z-index: 1;
      }
      
      article {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 4em 10em;
        text-align: left;
      }
      
      aside {
        color: #ccc;
        font-size: 0.6em;
        display: flex;
        justify-content: space-around;
        padding-bottom: 1em;
        
        .courtesy {
          color: white;
        }
        
        .policies {
          a {
            color: white;
            text-decoration: none;
            margin-left: 2em;
          }
        }
      }
    }
    
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      footer {
        article {
          display: flex;
          flex-direction: column;
          padding: 1em;
        }
        aside {
          display: flex;
          flex-direction: column;
          .policies {
            margin-top: 1em;
          }
        }
      }
    }
    
    /* iPads/tablet (portrait and landscape) */
    @media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
      footer {
        article {
          display: flex;
          flex-direction: column;
          padding: 1em;
        }
      }
    }
  `]
})
export class BaseFooterComponent {
  currentYear: number = new Date().getFullYear();

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
