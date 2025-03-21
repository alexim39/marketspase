import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdsInterface, AdsService } from '../manage-ads.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


/** @title Disabled select */
@Component({
  selector: 'async-manage-ads-detail',
  templateUrl: 'manage-ads-detail.component.html',
  styleUrls: ['manage-ads-detail.component.scss'],
  providers: [AdsService],
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule, MatExpansionModule,
    MatIconModule, MatButtonModule, RouterModule,
    MatDividerModule, MatListModule, CommonModule
  ],
})
export class ManageAdsDetailComponent implements OnInit, OnDestroy {

  @Input() ad!: AdsInterface;
  adData!: any; 
  duration!: null | number;
  subscriptions: Subscription[] = [];
  

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private adsService: AdsService
  ) { }

  back(): void {
    this.router.navigateByUrl('dashboard/marketing/ads');
  }

  
  ngOnInit(): void { 
    //console.log(this.adData)
    if (this.ad.data) {
      this.adData = this.ad.data;
      
    }
    this.calculateDuration();
   }

  private calculateDuration() {

    if (!this.adData.adDuration.noEndDate) {

      const startDateControl = this.adData.adDuration.campaignStartDate;
      const endDateControl = this.adData.adDuration.campaignEndDate;
      if (startDateControl && endDateControl) {
        const startDate = new Date(startDateControl);
        const endDate = new Date(endDateControl);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          const durationInMilliseconds = endDate.getTime() - startDate.getTime();
          this.duration = durationInMilliseconds / (1000 * 3600 * 24);
        } 
      }
    }
  }


  getSelectedAdPreferences(): string[] {
    const adPreferencesGroup = this.adData.adFormat.adPreferences;
    if (!adPreferencesGroup) {
      return [];
    }

    const selectedPreferences = Object.keys(adPreferencesGroup)
      .filter(key => adPreferencesGroup[key])
      .map(key => this.separateCamelCase(key));

    return selectedPreferences;
  }

  private separateCamelCase(input: string): string {
    let result = '';

    for (let i = 0; i < input.length; i++) {
      const char = input.charAt(i);
      // Check if the character is uppercase and not the first character
      if (char === char.toUpperCase() && i !== 0) {
        // Separate the words at this position
        result = `${input.substring(0, i)} ${input.substring(i)}`;
        break;
      }
    }

    return result.trim();
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getProgression(campaign: any): number {  
    if (campaign.deliveryStatus === 'Active' && campaign.budget.budgetAmount > 0) {  
      //return (campaign.reach / campaign.adsBudget) * 100;  
      return (campaign.leads / campaign.budget.budgetAmount) * 100;  
    }  
    return 0; // Return 0% if the campaign is not active or budget is not defined  
  }

  deleteAd(ad: any): void {

    Swal.fire({
      title: "Are you sure of this delete action?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.adsService.deleteAd(ad._id).subscribe({
            next: (ads: AdsInterface) => {
              Swal.fire({
                position: "bottom",
                icon: 'success',
                text: 'Your Ad is deleted successfully',
                confirmButtonColor: 'rgb(5, 1, 17)',
                timer: 8000,
              }).then (() => {
                this.back();
              })
            },
            error: () => {
              Swal.fire({
                position: "bottom",
                icon: 'error',
                text: 'Server error occured, please and try again',
                showConfirmButton: false,
                timer: 4000
              })
            }
          })
        )
      }
    });
   /*   */
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
