import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'async-index-video-ads',
  standalone: true,
  imports: [RouterModule, MatButtonModule, CommonModule],
  template: `
    <section class="hero-section">
      <div class="hero-overlay">
        <div class="content-grid">
          <div class="hero-text">
            <h1>
              We Are Offering You a Space to<br>
              <span>Build a Residual Income Online</span>
            </h1>
            <p>
              Tired of worrying about bills and overwhelmed by debt? Join MarketSpase, a community where digital empowerment unlocks the limitless potential of the internet.
            </p>
            <p>
             Start an online business that pays you while you sleep.
            </p>
            <a
              mat-flat-button
              color="primary"
              routerLink="/plans"
              (click)="scrollToTop()"
            >
              Compare Our Business Spase Plans
            </a>
          </div>
          <div class="hero-video">
            <div class="video-container">
              <video controls>
                <source src="vid/John_Paul_Kato_of_Uganda.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <div class="video-caption">
                <h2>Proven through testimonials</h2>
                <!-- <h2>How It Works</h2> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      //font-family: 'Poppins', sans-serif;
    }
    /* Fullscreen Hero Section with Background */
    .hero-section {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* Semi-transparent overlay for better text contrast */
    .hero-overlay {
      background: rgba(0, 0, 0, 0.6);
      width: 100%;
      height: 100%;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /* Responsive Grid Layout */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 1200px;
      width: 100%;
      color: #fff;
    }
    /* Left Column: Text */
    .hero-text h1 {
      font-size: 2em;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .hero-text h1 span {
      color: #ffab40;
      display: block;
      font-weight: 600;
    }
    .hero-text p {
      margin-bottom: 1.5rem;
      line-height: 1.5;
      text-align: justify;

    }
    .hero-text a {
      background: #ffab40;
      color: #000;
      transition: background 0.3s ease, transform 0.3s ease;
    }
    .hero-text a:hover {
      background: #ffab40;
      transform: translateY(-3px);
    }
    /* Right Column: Video */
    .hero-video {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .video-container {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      width: 100%;
    }
    .video-container video {
      width: 100%;
      height: 100%;
      height: auto;
      display: block;
    }
    .video-caption {
      padding: 1rem;
      background: #333;
      text-align: center;
    }
    .video-caption h2 {
      margin: 0;
      font-size: 1em;
      color: #ffab40;
    }
    /* Responsive Adjustments */
    @media (max-width: 992px) {
      .content-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .hero-text h1 {
        font-size: 2.5rem;
      }
      .hero-text p {
        font-size: 1.125rem;
        text-align: justify;
      }
    }
    @media (max-width: 576px) {
      .hero-text h1 {
        font-size: 2rem;
      }
      .hero-text p {
        font-size: 1rem;
      }
      .hero-text a {
        font-size: 0.875rem;
        padding: 0.5rem 1.5rem;
      }
    }
  `]
})
export class VideoAdsComponent {
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
