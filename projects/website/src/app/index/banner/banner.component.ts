import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypingComponent } from './typing/typing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'async-index-banner',
  imports: [MatToolbarModule, CommonModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule, TypingComponent],
  template: `
    <section>
      <header>
        <aside>
          <video autoplay muted loop [poster]="posterSource">
            <source [src]="videoSource" type="video/webm">
          </video>

          <article>
            <h1>
            MarketSpase - An online business space leveling the playing field for passive income.
            </h1>

            <br><br>

            <h3>
              <async-typing></async-typing>
            </h3>

            <div class="btn">
              <!-- <a id="get-account" mat-raised-button href="tel:+2349130311019">GIVE US A CALL NOW</a> -->
              <a id="book-now" mat-raised-button color="accent" routerLink="get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">GET STARTED</a>
            </div>
          </article>

        </aside>
      </header>
    </section>
  `,
  styleUrls: [`banner.component.scss`],
})
export class BannerComponent implements OnInit, OnDestroy  {
  subscriptions: Subscription[] = [];

  posterSource: string = 'img/bck1.JPG';
  videoSource: string = 'vid/bck1.mp4';

  constructor() {}


  ngOnInit(): void {}

  lunchWhatsAppGroup() {
    window.open('https://wa.me/message/BQ4PN6TYXNE5D1', '_blank');
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  ngOnDestroy(): void {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
