import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FacebookComponent } from './facebook/facebook.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { PartnerInterface, PartnerService } from '../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { RouterModule } from '@angular/router';
import { GoogleComponent } from './google/google.component';
import { TiktokComponent } from "./tiktok/tiktok.component";

/**
 * @title marketing channel tabs
 */
@Component({
  selector: 'async-marketing-channels',
  template: `
  <section class="breadcrumb-wrapper">
    <div class="breadcrumb">
      <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="scrollToTop()">Dashboard</a> &gt;
      <a>Business</a> &gt;
      <a>Ads</a> &gt;
      <span>new ads </span>
    </div>
</section>

<section class="async-background ">
    <h2>Choose a Channel to Promote Your Business <mat-icon (click)="showDescription()">help</mat-icon></h2>

    <section class="async-container">

        <mat-tab-group>

            <mat-tab label="Facebook"> 
                <async-facebook *ngIf="partner" [partner]="partner"/>
            </mat-tab>

            <mat-tab label="Youtube">
                <async-youtube *ngIf="partner" [partner]="partner"/>
            </mat-tab>

            <mat-tab label="LinkedIn">
                 <async-linkedin *ngIf="partner" [partner]="partner"/>
             </mat-tab>

            <mat-tab label="Google (Search Engine)">
                <async-google *ngIf="partner" [partner]="partner"/>
            </mat-tab>

            <mat-tab label="Tiktok">
                <async-tiktok *ngIf="partner" [partner]="partner"/>
            </mat-tab>
            
        </mat-tab-group>
        
    </section>
    
</section>
  
  `,
  styles: [`
  .async-background {
    margin: 2em;
    .async-container {
        border-radius: 1%;
        height: 100%;
        padding: 1em;
        mat-tab-group {
            border-radius: 10px;
        }
    }
    mat-icon {
        cursor: pointer;
    }
}
  `],
  imports: [MatTabsModule, RouterModule, FacebookComponent, YoutubeComponent, GoogleComponent, LinkedinComponent, CommonModule, MatIconModule, TiktokComponent],
})
export class MarketingChannelsComponent implements OnInit, OnDestroy {
  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private partnerService: PartnerService
  ) { }

  ngOnInit() {

    // get current signed in user
    this.subscriptions.push(
      this.partnerService.getSharedPartnerData$.subscribe({
        next: (partnerObject) => {
            this.partner = partnerObject as PartnerInterface
        }
      })
    )
  }

  showDescription() {
    this.dialog.open(HelpDialogComponent, {
      data: { help: 'In this section, you can create a paid ads campaign on your selected social media platform to promote your business' },
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}