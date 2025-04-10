import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'async-banner',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule],
  template: `
  <div class="container">
    <div class="left-column">
      <div class="info-box">
        <h2>{{ carouselItems[currentIndex].title }}</h2>
        <p>{{ carouselItems[currentIndex].description }}</p>
        <div class="carousel-controls">
          <mat-icon (click)="prevItem()">arrow_back</mat-icon>
          <span class="countdown">{{ countdown }}</span>
          <mat-icon (click)="nextItem()">arrow_forward</mat-icon>
        </div>
      </div>
    </div>

    <div class="right-column">
      <div class="auth-box">
        <h3>Welcome to <span>MarketSpase</span></h3>
        <!-- <p>Sign Up Get started</p> -->
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .container {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    margin-bottom: 1em;
    .left-column,
    .right-column {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .left-column {
      background: url("/img/img1.jpg");
      position: relative;
      color: white;

      .info-box {
        background: rgba(0, 0, 0, 0.6);
        padding: 1.5em;
        border-radius: 8px;
        text-align: left;
        position: relative;

        h2 {
          margin-bottom: 0.5em;
          font-size: 1.8rem;
        }

        p {
          font-size: 1rem;
          line-height: 1.5;
        }

        .carousel-controls {
          margin-top: 1em;
          display: flex;
          justify-content: space-between;
          align-items: center;

          mat-icon {
            color: #ffab40;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            &:hover {
              background-color:rgb(95, 94, 0);
            }
          }

          .countdown {
            font-size: 1.2rem;
            font-weight: bold;
            margin: 0 1em;
          }
        }
      }
    }

    .right-column {
      background: #ffffff;
      box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);

      .auth-box {
        background: #f9f9f9;
        padding: 2em;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        width: 100%;
        max-width: 400px;

        h3 {
          color: #333;

          span {
            color: rgb(5, 1, 17);
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
      .container {
        flex-direction: column;
        height: auto;
        margin: 1em 0;
        
        /* In mobile view, show the auth section on top */
        .right-column { 
          order: 1; 
          .auth-box {
            height: 10%;
             width: 70%;
          }
        }
        /* Carousel appears below with some spacing */
        .left-column { order: 2; margin-top: 1em; }
      }
    }
  `]
})
export class BannerComponent implements OnInit, OnDestroy {

  carouselItems = [
    { title: 'Welcome to MarketSpase', description: 'Your online business space for passive income. Get started today to join millions of online business owners worldwide!' },
    { title: 'Effortless Business Management', description: 'Experience fast, reliable tools and support to manage and grow your business.' },
    { title: 'Low Startup Costs', description: 'Launch and grow an online business with minimal capital and start earning passive income right away.' }
  ];

  currentIndex = 0;
  countdown: number = 10;
  countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    this.stopCountdown();
  }

  nextItem() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    this.resetCountdown();
  }

  prevItem() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.resetCountdown();
  }

  startCountdown() {
    this.resetCountdown();
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.nextItem();
      }
    }, 1000); // update every second
  }

  resetCountdown() {
    this.countdown = 10;
  }

  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
