import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, NavigationStart, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { LogoComponent } from '../_common/logo.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
//import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { Emitters } from '../_common/emitters/emitters';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from '../_common/services/loader/spinner.service';
import { ThemeTogglerService } from '../_common/services/theme-toggler.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LogoLibrary } from '../../../../logo/src/public-api';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';

@Component({
  selector: 'async-nav',
  providers: [],
  imports: [
    MatToolbarModule, 
    MatProgressBarModule, 
    MatDialogModule, 
    RouterModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    CommonModule, 
    MatMenuModule, 
    LogoLibrary, 
    NotificationBannerComponent
],
  template: `
  
  <!-- THIS IS A TEMPORARY NOTIFICATION BANNER - FOR TRAILING EVENT -->
  <async-notification-banner></async-notification-banner>


   <mat-toolbar class="nav">
    <mat-toolbar-row class="desktop-nav">

    <span class="logo">
      <lib-logo/>
    </span>
     

    <span class="spacer"></span>

    <a class="view-on-desktop" mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Home</a>
    <a class="view-on-desktop" mat-button routerLink="about-us" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">About Us</a>
    <a class="view-on-desktop" mat-button routerLink="testimonials" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Testimonials</a>
    <a class="view-on-desktop" mat-button routerLink="plans" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Plans</a>
    <!-- <a class="view-on-desktop" mat-stroked-button href="https://shop.marketspase.com" target="_blank">eShop</a> -->
    <a class="view-on-desktop" mat-button [matMenuTriggerFor]="resources">Resources <i class="fa fa-angle-double-down"></i></a>
    <a class="view-on-desktop" mat-button [matMenuTriggerFor]="support">Support <i class="fa fa-angle-double-down"></i></a>
    <!-- <a class="view-on-desktop" color="accent" mat-raised-button routerLink="booking" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Book 1:1 Session</a> -->
    <a class="view-on-desktop" mat-stroked-button href="https://platform.marketspase.com" target="_blank">Login</a>
    


    <!-- light and dark theme toggle -->
    <i matTooltip="Toggle light to dark mode" class="fa fa-moon-o" (click)="toggleTheme()" *ngIf="!isDarkMode"></i>
    <i matTooltip="Toggle dark to light mode" class="fa fa-sun-o" (click)="toggleTheme()" *ngIf="isDarkMode"></i>

      <i class="fa fa-bars" (click)="toggleMobileNav()" id="toggle"></i>

    </mat-toolbar-row>



    <mat-toolbar-row class="mobile-nav" id="mobile-nav" *ngIf="showMobileNav">
      <a mat-button routerLink="/" (click)="scrollToTop()">Home</a>
      <a mat-button routerLink="about-us" (click)="scrollToTop()">About Us</a>
      <a mat-button routerLink="testimonials" (click)="scrollToTop()">Testimonial</a>
      <a mat-button routerLink="plans" (click)="scrollToTop()">Plans</a>
      <!-- <a class="mobile-btn partners" mat-stroked-button href="https://shop.marketspase.com" target="_blank">eShop</a> -->
      <a mat-button [matMenuTriggerFor]="resources">Resources <i class="fa fa-angle-double-down"></i></a>
      <a mat-button [matMenuTriggerFor]="support">Support <i class="fa fa-angle-double-down"></i></a>
      <!-- <a class="mobile-btn" color="accent" mat-raised-button routerLink="booking" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Book 1:1 Session</a> -->
      <a class="mobile-btn partners" mat-stroked-button href="https://platform.marketspase.com" target="_blank">Login</a>
      
      <span class="spacer"></span>

    </mat-toolbar-row>

   </mat-toolbar>

   <div *ngIf="isLoading">
    <mat-progress-bar mode="indeterminate" color="accent"></mat-progress-bar>
  </div>


   <!-- Support -->
   <mat-menu #support="matMenu">
      <a mat-menu-item routerLink="contacts" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Contacts</a>
      <a mat-menu-item routerLink="faq" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">FAQs</a>
    </mat-menu>

   <!-- resources -->
   <mat-menu #resources="matMenu">
      <!-- <a mat-menu-item routerLink="videos" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Videos</a> -->
      <a mat-menu-item routerLink="guide-download" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Business Guide Download</a>
    </mat-menu>

  `,
  styleUrls: [`nav.component.scss`, `nav.mobile.scss`]
})
export class NavComponent implements OnInit, OnDestroy {
  // init subscriptions list
  subscriptions: Subscription[] = [];

  isDarkMode: boolean = false;
  showMobileNav = false;

  authenticated = false;

  isLoading: boolean = false; // Flag for loading state

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private themeTogglerService: ThemeTogglerService,
    public loadingSpinnerService: LoadingSpinnerService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; // Set loading to true on navigation start
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false; // Set loading to false on navigation end
      }
    });
   }

  ngOnInit() {
    // listern to auth event emitter to check if user is signed in or not
    this.subscriptions.push(
      Emitters.authEmitter.subscribe(
        (auth: boolean) => {
          this.authenticated = auth;
        }
      )
    )

    const currentTheme = this.themeTogglerService.getTheme();
    this.themeTogglerService.setTheme(currentTheme);
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // close menu for mobile view
    this.toggleMobileNav();
  }


  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  toggleTheme() {
    const currentTheme = this.themeTogglerService.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    // toggle icon
    if (newTheme === 'dark') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
    this.themeTogglerService.setTheme(newTheme);
  }

  lunchWhatsAppGroup() {
    window.open('https://wa.me/message/BQ4PN6TYXNE5D1', '_blank');
  }



  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
