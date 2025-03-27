import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
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
import { PaystackService } from '../../../../_common/services/paystack.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

/**
 * @title Stepper vertical
 */
@Component({
  selector: 'async-linkedin',
  templateUrl: 'linkedin.component.html',
  styles: `
  
.form {
    display: flex;
    flex-direction: row;
    align-items:flex-start;
    justify-content: flex-start;
    mat-form-field {
        padding: 0.5em;
    }
    .ad-preference {
        border: 1px solid gray;
        border-radius: 2%;
        padding: 0 1em;
        margin-top: 0.7em;
    }

    .no-end-date {
        margin-top: 1em;
    }
}
       
.publish {
    float: right;
}

.summary {  
    display: flex;  
    flex-wrap: wrap;  
    div {  
        flex: 1; /* Equal sizing for all elements */  
        margin: 10px; /* Add spacing between elements */  
        details {
            summary {
                font-size:small;
                font-weight: bold;
            }
        }
      }  
}  
  
.togglePayment {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1em;
    margin-bottom: 1em;

    .mat-slide-toggle {
        margin-right: 1em;
    }
}

  
@media (max-width: 768px) {  
.summary {  
    flex-direction: column; /* Stack elements vertically on smaller screens */  
}  
}
  `,
  imports: [
    MatButtonModule, MatSelectModule, MatCheckboxModule,
    MatStepperModule, MatDatepickerModule, CommonModule,
    FormsModule, RouterModule, MatProgressBarModule,
    ReactiveFormsModule, MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [PaystackService, provideNativeDateAdapter(), CreateCampaignService],

})
export class LinkedinComponent implements OnInit, OnDestroy {
  targetAudienceFormGroup!: FormGroup;
  marketingObjectivesFormGroup!: FormGroup;
  budgetFormGroup!: FormGroup;
  adDurationFormGroup!: FormGroup;
  adFormatFormGroup!: FormGroup;

  minDate!: Date; // New property to store the minimum allowed date
  duration!: null | number;

  @Input() partner!: PartnerInterface;

  subscriptions: Array<Subscription> = [];

  @ViewChild('stepper') stepper!: MatStepper;
  isChecked = false;

  constructor(
    private _formBuilder: FormBuilder,
    private createCampaignService: CreateCampaignService,
    private accountBalanceService: AccountBalanceService,
    private paystackService: PaystackService
  ) { }

  ngOnInit() {
    this.targetAudienceFormGroup = this._formBuilder.group({
      ageRangeTarget: ['', Validators.required],
      industryTarget: ['', Validators.required],
      educationTarget: ['', Validators.required],
      //relationshipTarget: ['', Validators.required]
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

  onSubmit() {
    if (this.isChecked) {
     // User wants to pay from card
      this.paystackService.initiatePayment(this.budgetFormGroup.get('budgetAmount')?.value, this.partner, this.handlePaymentSuccess.bind(this));
  
    } else {
      // User wants to pay from account balance
      this.handleSubmit();
    }
  }

  
  /**
   * Handles successful payment callback.
   * @param response - Paystack response object.
  */
  private handlePaymentSuccess(response: any, amount: number): void {
    // TODO: Send transaction update to the backend
   this.handleSubmit();
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }


  private handleSubmit(): void {

    if (
      this.targetAudienceFormGroup.valid 
      && this.marketingObjectivesFormGroup.valid 
      && this.budgetFormGroup.valid 
      && this.adDurationFormGroup 
      && this.adFormatFormGroup) {

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
          },
          createdBy: this.partner._id,
          campaignName: 'LinkedIn',
          deliveryStatus: 'Pending',
          isCard: this.isChecked
        };
    
        this.subscriptions.push(
          this.createCampaignService.linkedin(campaignData).subscribe({
            next: () => {
              Swal.fire({
                position: "bottom",
                icon: 'success',
                text: 'Your LinkedIn ads published successfully',
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

}