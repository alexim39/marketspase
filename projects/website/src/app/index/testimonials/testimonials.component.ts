import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-index-testimonials',
  standalone: true,
  styleUrls: ['testimonials.component.scss'],
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterModule, CommonModule],
  template: `
   <article class="testimonial">
      <h1>Testimonials</h1>

      <div class="carousel">
        <section [@carouselAnimation]="currentIndex">
          <figure class="snip1139" *ngFor="let testimonial of visibleTestimonials(); let i = index">
            <blockquote class="quote">
              {{ testimonial.quote }}
              <div class="arrow"></div>
            </blockquote>
            <div class="author" style="text-align: center;">
              <img src="img/default_pp.png" alt="Customer image">
              <h5>{{ testimonial.author.name }} </h5>
              <div class="social">
                  <a class="facebook" href="{{testimonial.author.facebook}}" target="_blank"><i class="fa fa-facebook" title="Facebook"></i></a>
                  <!-- <a class="facebook" routerLink="#" target="_blank"><i class="fa fa-facebook" title="Facebook"></i></a> -->
              </div>
            </div>
          </figure>
        </section>
        <button mat-icon-button (click)="prevTestimonial()" class="nav-button">
          <mat-icon>chevron_left</mat-icon>
        </button>
        <button mat-icon-button (click)="nextTestimonial()" class="nav-button">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </article>
  `,
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials = [
    {
      quote: `
      MarketSpase has transformed my online business experience. 
      Their integrated platform gave me the tools and confidence to launch my business and secure a stable income. 
      I'm more stable and in control of my life.
      `,
      author: { name: "Eunice Woko", role: "", facebook: "https://web.facebook.com/eunice.woko" },
    },
    {
      quote: `
      MarketSpase is a game-changer. 
      With their user-friendly platform and low startup costs, I launched my business and I am building a residual income stream for myself. 
      The support truly top-notch!`,
      author: { name: "Imenwo Alex", role: "", facebook: "https://www.facebook.com/imenwo/" },
    },
    {
      quote: `
      MarketSpase turned my entrepreneurial dreams into reality. 
      The platform and supportive community made launching an online business simple and affordable. 
      Now, I'm earning income from home
      `,
      author: { name: "Okeke Angela ", role: "", facebook: "https://web.facebook.com/angela.okeke.961"  },
    },
    {
      quote: `I will always recommend this platform to anyone who needs alternative and reliable sources of income`,
      author: { name: "Favour Wobo", role: "", facebook: "https://web.facebook.com/favour.wobo.5"  },
    },
  ];

  currentIndex = 0;
  private destroy$ = new Subject<void>();

  private intervalSubscription: Subscription | undefined;

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.currentIndex =
      this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }

  visibleTestimonials(): any[] {
    const startIndex = this.currentIndex;
    const endIndex = (this.currentIndex + 2) % this.testimonials.length;

    if (startIndex < endIndex) {
      return this.testimonials.slice(startIndex, endIndex + 1);
    } else {
      return [
        ...this.testimonials.slice(startIndex),
        ...this.testimonials.slice(0, endIndex + 1),
      ];
    }
  }

  ngOnInit(): void {
    this.startAutoSlideInterval();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutoSlideInterval();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.stopAutoSlideInterval();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.startAutoSlideInterval();
  }

  private startAutoSlideInterval() {
    this.intervalSubscription = interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.nextTestimonial());
  }

  private stopAutoSlideInterval() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
  }
}
