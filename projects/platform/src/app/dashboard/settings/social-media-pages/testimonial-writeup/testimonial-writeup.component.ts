import { Component, inject, Input, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { SocialPageService } from '../social-media-page.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

/**
 * @title Testimonial Writeup Settings
 * @description This component is used to update the testimonial writeup for the partner's landing page.
 */
@Component({
  selector: 'async-testimonial-writeup-settings',
  imports: [MatExpansionModule, CommonModule, MatSelectModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule],
  providers: [SocialPageService],
  template: `

<section>
  <mat-accordion>
    <mat-expansion-panel [expanded]="true">
      <mat-expansion-panel-header>
        <mat-panel-title> Testimonial Page </mat-panel-title>
      </mat-expansion-panel-header>

      <form [formGroup]="testimonialForm" (ngSubmit)="onSubmit()">  
        <!-- Testimonial Textarea -->
        <mat-form-field appearance="outline">
          <mat-label>Write your testimonial</mat-label>
          <textarea matInput formControlName="message" #message maxlength="500" class="custom-textarea"></textarea>
          <mat-hint align="start"><strong>Write your experience to motivate prospects</strong></mat-hint>
          <mat-hint align="end">{{message.value.length}} / 500</mat-hint>
        </mat-form-field>
        <br>

        <!-- Country Dropdown -->
        <mat-form-field appearance="outline">
          <mat-label>Country</mat-label>
          <mat-select formControlName="country" (selectionChange)="onCountryChange($event.value)">
            <mat-option *ngFor="let country of countries" [value]="country">{{ country }}</mat-option>
          </mat-select>
        </mat-form-field>

        <!-- State Field -->
        <mat-form-field appearance="outline">
          <mat-label *ngIf="isNigeria">State</mat-label>
          <mat-select *ngIf="isNigeria" formControlName="state">
            <mat-option *ngFor="let state of states" [value]="state">{{ state }}</mat-option>
          </mat-select>
          <mat-label *ngIf="!isNigeria">Enter State</mat-label>
          <input *ngIf="!isNigeria" matInput formControlName="state" placeholder="Enter your state of origin" />
        </mat-form-field>

        <!-- Submit Button -->
        <button mat-flat-button color="primary" type="submit" [disabled]="testimonialForm.invalid">Submit</button>  
      </form>
    </mat-expansion-panel>
  </mat-accordion>
</section>

  `,
styles: [`

section {
  margin-top: 1em;

  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;

    mat-hint {
      color: gray;
      margin: 0.5em 0;
    }

    button {
      width: 20%;
      margin-top: 1em;
    }

    .custom-textarea {  
      min-width: 300px;
      min-height: 200px; 
    }
  }
}

/* Responsive styles remain unchanged */

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  section {
      margin-top: 1em;
      form {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: auto;
          mat-hint {
              color: gray;
              margin: 0.5em 0;
          }
          button {
              width: 20%;
              margin-top: 2em;
          }
          .custom-textarea {  
              min-width: 300px;
              min-height: 200px; 
          }
      }
  }
    
}


/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  section {
      margin-top: 1em;
      form {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: auto;
          mat-hint {
              color: gray;
              margin: 0.5em 0;
          }
          button {
              width: 20%;
              margin-top: 1em;
          }
          .custom-textarea {  
              min-width: 300px;
              min-height: 200px; 
          }
      }
  }
}
`],
})
export class TestimonialWriteupSettingsComponent {
  @Input() partner!: PartnerInterface;
  subscriptions: Array<Subscription> = [];
  
  testimonialForm!: FormGroup;  
  countries: string[] = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'United States',
    'Egypt',
    'Morocco',
    'Algeria',
    'Ethiopia',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'Senegal',
    'Cameroon',
    'Ivory Coast',
    'Zimbabwe',
    'Zambia',
    'Botswana',
    'Namibia',
    'Mozambique',
    'Madagascar',
    'Tunisia',
    'Libya',
    'Sudan',
    'Angola',
    'Democratic Republic of the Congo',
    'Somalia',
    'Mauritius',
    'Seychelles',
    'Cape Verde',
    'Gambia',
    'Burkina Faso',
    'Mali',
    'Niger',
    'Chad',
    'Malawi',
    'Eswatini',
    'Lesotho',
    'Djibouti',
    'Eritrea',
    'Central African Republic',
    'Equatorial Guinea',
    'Gabon',
    'Sao Tome and Principe',
    'Comoros',
    'Israel',
    'Jordan',
    'Lebanon',
    'Syria',
    'Saudi Arabia',
    'Yemen',
    'Oman',
    'United Arab Emirates',
    'Qatar',
    'Kuwait',
    'Bahrain'
  ];
  // Example country list
  states: string[] = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT (Abuja)'
  ]; // List of Nigerian states
  isNigeria = true; // Tracks whether the selected country is Nigeria

  constructor(
    private fb: FormBuilder,
    private socialPageService: SocialPageService,
  ) {}

  ngOnInit(): void {
    this.testimonialForm = this.fb.group({  
      message: [this.partner?.testimonial?.message, [Validators.required]],
      country: ['Nigeria', [Validators.required]], // Default to Nigeria
      state: ['', [Validators.required]], // State is required
    });

    // Initialize `isNigeria` based on the default country
    this.isNigeria = this.testimonialForm.get('country')?.value === 'Nigeria';
  }

  onCountryChange(selectedCountry: string): void {
    this.isNigeria = selectedCountry === 'Nigeria';

    // Reset the state field when the country changes
    this.testimonialForm.get('state')?.reset();

    // Update validation for the state field
    if (this.isNigeria) {
      this.testimonialForm.get('state')?.setValidators([Validators.required]);
    } else {
      this.testimonialForm.get('state')?.setValidators([Validators.required, Validators.minLength(2)]);
    }
    this.testimonialForm.get('state')?.updateValueAndValidity();
  }

  onSubmit() {  
    if (this.testimonialForm.valid) {  
      const updateObject = {
        message: this.testimonialForm.value.message,
        country: this.testimonialForm.value.country,
        state: this.testimonialForm.value.state,
        partnerId: this.partner._id,
      };

      this.subscriptions.push(
        this.socialPageService.updateTestimonial(updateObject).subscribe({
          next: (response) => {
            Swal.fire({
              position: "bottom",
              icon: 'success',
              text: response.message,
              confirmButtonColor: 'rgb(5, 1, 17)',
              timer: 4000,
            });
          },
          error: (error: HttpErrorResponse) => {
            let errorMessage = 'Server error occurred, please try again.';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            Swal.fire({
              position: "bottom",
              icon: 'error',
              text: errorMessage,
              showConfirmButton: false,
              timer: 4000,
            });   
          }
        })
      );
    }  
  } 

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}