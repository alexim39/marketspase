import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { RouterModule } from '@angular/router';
import { CreateCampaignService } from '../create-ads.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountBalanceService } from '../../../profile/account-balance/account-balance.service';

/**
 * @title Stepper vertical
 */
@Component({
  selector: 'async-facebook',
  templateUrl: 'facebook.component.html',
  styleUrl: 'facebook.component.scss',
  standalone: true,
  imports: [
    MatButtonModule, MatSelectModule, MatCheckboxModule,
    MatStepperModule, MatDatepickerModule, CommonModule,
    FormsModule, RouterModule, MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [provideNativeDateAdapter(), CreateCampaignService],

})
export class FacebookComponent implements OnInit, OnDestroy {
  targetAudienceFormGroup!: FormGroup;
  marketingObjectivesFormGroup!: FormGroup;
  budgetFormGroup!: FormGroup;
  adDurationFormGroup!: FormGroup;
  adFormatFormGroup!: FormGroup;
  adPreferences!: FormGroup;

  minDate!: Date; // New property to store the minimum allowed date
  duration!: null | number;

  @Input() partner!: PartnerInterface;

  subscriptions: Array<Subscription> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private createCampaignService: CreateCampaignService,
    private accountBalanceService: AccountBalanceService,
  ) { }

  ngOnInit() {
    this.targetAudienceFormGroup = this._formBuilder.group({
      ageRangeTarget: ['', Validators.required],
      genderTarget: ['', Validators.required],
      educationTarget: ['', Validators.required],
      relationshipTarget: ['', Validators.required]
    });

    this.marketingObjectivesFormGroup = this._formBuilder.group({
      adObjective: ['', Validators.required],
      successMeasurement: ['', Validators.required]
    });

    this.budgetFormGroup = this._formBuilder.group({
      budgetType: ['', Validators.required],
      budgetAmount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.adDurationFormGroup = this._formBuilder.group({
      campaignStartDate: ['', Validators.required],
      campaignEndDate: new FormControl({ value: '', disabled: false }), // Initially disabled
      noEndDate: [false]
    });

    this.adFormatFormGroup = this._formBuilder.group({
      adFormat: ['', Validators.required],
      deviceType: ['', Validators.required]
    });

    this.adPreferences = this._formBuilder.group({
      FacebookFeed: new FormControl(false),
      InstagramFeed: new FormControl(false),
      InstagramStories: new FormControl(false),
      FacebookStories: new FormControl(false),
      AudienceNetwork: new FormControl(false),
      MessengerInbox: new FormControl(false),
    })

    // Set minimum date to today
    this.minDate = new Date();

    this.adDurationFormGroup.valueChanges.subscribe(() => {
      this.calculateDuration();
    });

    //console.log(this.partner)
  }

  onNoEndDateChange(event: any) {
    const isChecked = event.source.checked;
    const endDateControl = this.adDurationFormGroup.get('campaignEndDate');
    if (isChecked) {
      endDateControl?.disable();
      endDateControl?.setValue(''); // Set empty value when disabled
    } else {
      endDateControl?.enable();
    }
  }

  private calculateDuration() {

    if (!this.adDurationFormGroup.get('noEndDate')?.value) {

      const startDateControl = this.adDurationFormGroup.get('campaignStartDate');
      const endDateControl = this.adDurationFormGroup.get('campaignEndDate');
      if (startDateControl && endDateControl) {
        const startDate = new Date(startDateControl.value);
        const endDate = new Date(endDateControl.value);
        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          const durationInMilliseconds = endDate.getTime() - startDate.getTime();
          this.duration = durationInMilliseconds / (1000 * 3600 * 24);
        } else {
          this.duration = null;
        }
      }
    } else {
      this.duration = null;
    }
  }


  getSelectedAdPreferences(): string[] {
    const adPreferencesGroup = this.adPreferences.value;
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

  onSubmit() {
    if (
      this.targetAudienceFormGroup.valid 
      && this.marketingObjectivesFormGroup.valid 
      && this.budgetFormGroup.valid 
      && this.adDurationFormGroup 
      && this.adFormatFormGroup) {

        // charge for facebook ads
        //this.chargeForFacebookAds();

        const campaignData = {
          targetAudience: this.targetAudienceFormGroup.value,
          marketingObjectives: this.marketingObjectivesFormGroup.value,
          budget: this.budgetFormGroup.value,
          adDuration: {
            campaignStartDate: this.adDurationFormGroup.get('campaignStartDate')?.value,
            noEndDate: this.adDurationFormGroup.get('noEndDate')?.value,
            // If noEndDate is true, set campaignEndDate to null (optional)
            campaignEndDate: this.adDurationFormGroup.get('noEndDate')?.value ? null : this.adDurationFormGroup.get('campaignEndDate')?.value
          },
          adFormat: {
            ...this.adFormatFormGroup.value,
            adPreferences: this.adPreferences.value,
          },
          createdBy: this.partner._id,
          campaignName: 'Facebook',
          deliveryStatus: 'Pending',
        };
    
        this.subscriptions.push(
          this.createCampaignService.facebook(campaignData).subscribe({
            next: () => {
              Swal.fire({
                position: "bottom",
                icon: 'success',
                text: 'Your Facebook ads published successfully',
                confirmButtonColor: 'rgb(5, 1, 17)',
                timer: 8000,
              }).then((result) => {
                //if (result.isConfirmed) {
                  this.accountBalanceService.notifyBalanceUpdated();
                //}
              })
            },
            error: (error: HttpErrorResponse) => {
              if (error.status == 401) {
                Swal.fire({
                  position: "bottom",
                  icon: 'info',
                  text: 'Insufficient balance, please fund your account',
                  showConfirmButton: false,
                  timer: 4000
                })
              } else if (error.status == 402) {
                Swal.fire({
                  position: "bottom",
                  icon: 'info',
                  text: 'Invalid amount, please enter a valid account',
                  showConfirmButton: false,
                  timer: 4000
                })
              } else {
                Swal.fire({
                  position: "bottom",
                  icon: 'error',
                  text: 'Server error occured, please and try again',
                  showConfirmButton: false,
                  timer: 4000
                })
              }
            }
          })
        )
    }
  }

/*   private chargeForFacebookAds() {
    //partnerId:  this.partner._id,

    this.subscriptions.push(
      this.createCampaignService.facebookCharge(this.partner._id).subscribe((fbCharge: any) => {
        console.log('fbCharge ',fbCharge)
  
      }, (error: any) => {
        //console.log(error)
        if (error.code == 401) {
          Swal.fire({
            position: "bottom",
            icon: 'info',
            text: 'Insufficient balance for transaction, please fund your account.',
            showConfirmButton: false,
            timer: 4000
          })
        } else {
          Swal.fire({
            position: "bottom",
            icon: 'info',
            text: 'Server error occured, please and try again',
            showConfirmButton: false,
            timer: 4000
          })
        }
        
      })
    )

  } */

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }



}