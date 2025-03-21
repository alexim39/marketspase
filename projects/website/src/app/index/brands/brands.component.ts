import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'async-brands-logos',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  template: `
    <div class="brand-display-container" (mouseover)="stopScroll()" (mouseleave)="startScroll()">
      <!-- Partner title inside the container -->
      <div class="partner-title">Brands with MarketSpase</div>
      
      <button mat-icon-button class="nav-button left" (click)="scrollLeft()">
        <mat-icon>chevron_left</mat-icon>
      </button>
      
      <div class="brand-display-wrapper" #brandWrapper>
        <div class="brand-logo" *ngFor="let brand of brands">
          <img [src]="brand.logo" [alt]="brand.name" />
        </div>
      </div>
      
      <button mat-icon-button class="nav-button right" (click)="scrollRight()">
        <mat-icon>chevron_right</mat-icon>
      </button>
    </div>
  `,
  styles: `
    .brand-display-container {
      position: relative;
      background: rgba(0, 0, 0, 0.6);
      padding: 2em 0 1em 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .partner-title {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #aaa;
      z-index: 3;
    }
    
    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
    }
    
    .nav-button.left {
      left: 10px;
    }
    
    .nav-button.right {
      right: 10px;
    }
    
    .brand-display-wrapper {
      display: flex;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding: 10px 0;
      animation: scroll 20s linear infinite;
    }
    
    .brand-display-wrapper:hover {
      animation-play-state: paused;
    }
    
    .brand-logo {
      flex: 0 0 auto;
      margin: 0 10px;
    }
    
    .brand-logo img {
      max-width: 16em;
      max-height: 6em;
      display: block;
    }
    
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `
})
export class BrandsComponent implements AfterViewInit {
  @ViewChild('brandWrapper') brandWrapper!: ElementRef;

  brands = [
    { name: 'MarketSpase', logo: 'img/logo.JPG' },
    //{ name: 'Empowered Consumerism', logo: 'img/partner2.png' },
    // Add more brands as needed
  ];

  scrollLeft() {
    this.brandWrapper.nativeElement.scrollBy({
      left: -600,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.brandWrapper.nativeElement.scrollBy({
      left: 600,
      behavior: 'smooth'
    });
  }

  ngAfterViewInit() {
    this.startScroll();
  }
  
  startScroll() {
    this.brandWrapper.nativeElement.style.animationPlayState = 'running';
  }
  
  stopScroll() {
    this.brandWrapper.nativeElement.style.animationPlayState = 'paused';
  }
}
