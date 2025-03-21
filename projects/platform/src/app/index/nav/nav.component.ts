import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, RouterModule, } from '@angular/router';
import { LogoLibrary } from '../../../../../logo/src/public-api';

@Component({
  selector: 'async-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, LogoLibrary, CommonModule, RouterModule],
  template: `
  
<mat-toolbar color="primary">
  <mat-toolbar-row>
    <span class="logo">
      <lib-logo/>
    </span>

    <span class="nav-spacer"></span>
    
    <ng-content>
      <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">
        Home
      </a>

      <a mat-button href="https://marketspase.com" target="_blank">
        <mat-icon>input</mat-icon> Sign Up
      </a>
    </ng-content>
  </mat-toolbar-row>


</mat-toolbar>

  `,
  styles: `
  .nav-spacer {
    flex: 1 1 auto;
  }
  `
})
export class NavComponent implements OnInit {
  isMobile!: boolean;
  isTablet!: boolean;
  isDesktop!: boolean;

  constructor(private deviceService: DeviceDetectorService,  private router: Router  ) {  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktop = this.deviceService.isDesktop();
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
