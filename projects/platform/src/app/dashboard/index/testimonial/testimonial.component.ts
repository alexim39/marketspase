import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { TestimonialInterface } from '../index.service';

@Component({
  selector: 'async-dashboard-testimonials',
  imports: [CommonModule], // Add any necessary imports here
  template: `
 
 <div class="testimonial-section">
  <h3 class="section-title">What Our Members Say</h3>
  <div 
    class="testimonial-carousel" 
    (mouseenter)="pauseProgress()" 
    (mouseleave)="resumeProgress()"
  >
    <button class="nav-button" (click)="prevTestimonial()">&#8249;</button>

    <div class="testimonial-card">
      <img [src]="testimonials[currentIndex].avatar" class="avatar" alt="User photo" />
      <div class="testimonial-content">
        <p class="message">"{{ testimonials[currentIndex].message }}"</p>
        <p class="author">{{ testimonials[currentIndex].name }}</p>
        <p class="location">{{ testimonials[currentIndex].location }}</p>
      </div>
    </div>

    <button class="nav-button" (click)="nextTestimonial()">&#8250;</button>
  </div>

  <!-- Progress bar -->
  <div class="progress-bar">
    <div class="progress" [style.width.%]="progress"></div>
  </div>
</div>

`,
  styles: [`

.testimonial-section {
  //background: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  .section-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 16px;
    color: #333;
  }

  .testimonial-carousel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    .testimonial-card {
      flex: 1;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      text-align: left;
      display: flex;
      align-items: center;
      gap: 16px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #ddd;
      }

      .testimonial-content {
        flex: 1;

        .message {
          font-size: 0.9rem;
          color: #555;
          margin-bottom: 8px;
        }

        .author {
          font-weight: bold;
          font-size: 0.95rem;
          color: #333;
        }

        .location {
          font-size: 0.85rem;
          color: #777;
        }
      }
    }

    .nav-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #555;
      transition: color 0.3s;

      &:hover {
        color: #000;
      }
    }
  }

  .progress-bar {
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 16px;

    .progress {
      height: 100%;
      background: #007bff; /* Progress bar color */
      transition: width 0.1s linear;
    }
  }

  @media (max-width: 768px) {
    .testimonial-carousel {
      flex-direction: column;

      .testimonial-card {
        flex-direction: column;
        text-align: center;
      }

      .nav-button {
        font-size: 1.2rem;
      }
    }
  }
}

  `],
})

export class TestimonialsComponent implements OnInit {
  @Input() partner!: PartnerInterface;
  @Input() testimonials: TestimonialInterface[] = []; // Default to an empty array

  currentIndex = 0;
  progress = 0; // Progress percentage
  intervalTime = 20000; // 20 seconds for each testimonial
  progressInterval: any;
  autoSwitchInterval: any;
  isPaused = false; // Flag to track if the progress is paused

  ngOnInit() {
    if (!this.testimonials || this.testimonials.length === 0) {
      // Provide a default testimonial if none are provided
      this.testimonials = [
        {
          avatar: 'assets/default-avatar.png', // Path to a default avatar image
          message: 'No testimonials available.',
          name: 'Anonymous',
          location: '',
        },
      ];
    }

    this.startProgress();
    this.autoSwitchInterval = setInterval(() => {
      this.nextTestimonial();
    }, this.intervalTime);
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.resetProgress();
  }

  prevTestimonial() {
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetProgress();
  }

  startProgress() {
    const step = 100 / (this.intervalTime / 100); // Calculate progress increment
    this.progressInterval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(this.progressInterval);
      } else {
        this.progress += step;
      }
    }, 100); // Update progress every 100ms
  }

  resetProgress() {
    clearInterval(this.progressInterval);
    this.progress = 0;

    // Only restart progress if not paused
    if (!this.isPaused) {
      this.startProgress();
    }
  }

  pauseProgress() {
    this.isPaused = true; // Set the paused flag
    clearInterval(this.progressInterval); // Stop the progress bar
    clearInterval(this.autoSwitchInterval); // Stop auto-switching testimonials
  }

  resumeProgress() {
    this.isPaused = false; // Clear the paused flag
    this.startProgress(); // Resume the progress bar
    this.autoSwitchInterval = setInterval(() => {
      this.nextTestimonial();
    }, this.intervalTime); // Resume auto-switching testimonials
  }

  ngOnDestroy() {
    clearInterval(this.progressInterval);
    clearInterval(this.autoSwitchInterval);
  }
}