import { Component, OnInit } from '@angular/core';
import { ManageAdsDetailComponent } from './manage-ads-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsInterface, AdsService } from '../manage-ads.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'async-manage-ads-detail-container',
  template: `
  <ng-container *ngIf="!isEmptyRecord">
    <async-manage-ads-detail *ngIf="ad" [ad]="ad"/>
  </ng-container>
    <ng-container *ngIf="isEmptyRecord">
        <div class="container">
          <p class="no-content">Something Went Wrong</p>
          <button mat-flat-button (click)="back()"><mat-icon>arrow_back</mat-icon>Go back</button>
        </div>
    </ng-container>
  `,
  standalone: true,
  providers: [AdsService],
  imports: [ManageAdsDetailComponent, CommonModule, MatButtonModule, MatIconModule],
  styles: `
  .container {
    padding: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .no-content {
    color: rgb(196, 129, 4);
    font-weight: bold;
  }
   
  `
})
export class ManageAdsDetailContainerComponent implements OnInit {

  ad!: AdsInterface;
  adId!: string | null;
  isEmptyRecord = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private adsService: AdsService
  ) { }

  back(): void {
    this.router.navigateByUrl('dashboard/marketing/ads');
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.adId = params.get('id');
        if (this.adId) {
          // Fetch campaign details using the ID
          this.adsService.getCampaignById(this.adId).subscribe({
           next: (ad) => {
            this.ad = ad;
           },
           error: () => {
            this.isEmptyRecord = true;
           }
          });
        }
      });
  }

 /*  browserBackHistory () {
    window.history.back();  
  } */
}
