import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { GetStartedService, GetStartedFormData } from './get-started.service';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

/**
 * @title Survey form for getting started
 */
@Component({
  selector: 'async-get-started',
  providers: [GetStartedService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: 'get-started.component.html',
  styleUrls: ['get-started.component.scss', 'get-started.mobile.scss'],
})
export class GetStartedComponent implements OnInit, OnDestroy {
  surveyForm!: FormGroup;
  subscriptions: Subscription[] = [];
  isSpinning = false;
  userDevice = '';
  referer: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private surveyService: GetStartedService,
    private platform: Platform
  ) {
    this.userDevice = this.platform.ANDROID || this.platform.IOS ? 'mobile' : 'desktop';
    this.referer = localStorage.getItem('username') || 'system';
  }

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      ageRange: ['', Validators.required],
      socialMedia: this.fb.array([], Validators.required),
      onlinePurchaseSchedule: ['', Validators.required],
      onlineBusinessTimeDedication: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      userDevice: this.userDevice,
      referer: this.referer,
    });
  }

  get socialMedia(): FormArray {
    return this.surveyForm.get('socialMedia') as FormArray;
  }

  onCheckboxChange(event: any): void {
    const formArray = this.socialMedia;
    if (event.checked) {
      formArray.push(this.fb.control(event.source.value));
    } else {
      const index = formArray.controls.findIndex((x) => x.value === event.source.value);
      formArray.removeAt(index);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(): void {
    this.isSpinning = true;
    this.markAllAsTouched();

    if (this.surveyForm.valid) {
      const formData: GetStartedFormData = this.surveyForm.value;
      this.subscriptions.push(
        this.surveyService.submitSurvey(formData).subscribe({
          next: () => {

            this.isSpinning = false;
            const email = this.surveyForm.get('email')?.value;
            localStorage.setItem('userEmail', email);
            this.router.navigateByUrl('get-started/new-confirmation');
            
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {

              this.isSpinning = false;
              const email = this.surveyForm.get('email')?.value;
              localStorage.setItem('userEmail', email);
              this.router.navigateByUrl('get-started/returning-confirmation');

            } else {
              let errorMessage = 'Server error occurred, please try again.'; // default error message.
              if (error.error && error.error.message) {
                errorMessage = error.error.message; // Use backend's error message if available.
              }
              Swal.fire({
                position: "bottom",
                icon: 'error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 4000
              });
            }
          },
        })
      );
    } else {
      this.isSpinning = false;
      this.surveyForm.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.surveyForm.controls).forEach((controlName) => {
      this.surveyForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}