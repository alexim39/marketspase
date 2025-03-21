import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DownloadFormData, GuideDownloadService } from './guide.service';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@angular/cdk/platform';

/**
 * @title Guide Download
 */
@Component({
  selector: 'async-guide-download',
  providers: [GuideDownloadService],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  templateUrl: 'guide.component.html',
  styleUrls: ['guide.component.scss']
})
export class GuideDownloadComponent implements OnInit, OnDestroy {
  downloadForm: FormGroup = new FormGroup({}); // Default initialization
  subscriptions: Subscription[] = [];
  isSpinning = false;
  isDownloadReady = true;
  userDevice = '';
  username!: string;

  constructor(
    private fb: FormBuilder,
    private guideDownloadService: GuideDownloadService,
    private http: HttpClient,
    private platform: Platform
  ) {
    // Determine the user's device type
    this.userDevice = (this.platform.ANDROID || this.platform.IOS) ? 'mobile' : 'desktop';

    // Retrieve username from local storage, if available
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  ngOnInit(): void {
    this.downloadForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      userDevice: this.userDevice,
      username: this.username
    });
  }

  /**
   * Scrolls the window to the top smoothly.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Submits the download form data to the backend.
   * Marks all form controls as touched, shows a spinner, and uses SweetAlert2 for notifications.
   */
  onSubmit(): void {
    this.isSpinning = true;
    // Mark all form controls as touched to trigger error messages
    this.markAllAsTouched();

    if (this.downloadForm.valid) {
      const formData: DownloadFormData = this.downloadForm.value;
      const subscription = this.guideDownloadService.submit(formData).subscribe({
        next: (res: any) => {
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            text: 'Thank you for your interest in our guide. Click the download button.',
            confirmButtonColor: "rgb(5, 1, 17)",
            timer: 10000
          });
          this.isSpinning = false;
          this.isDownloadReady = false;
        },
        error: (error: Error) => {
          this.isSpinning = false;
          Swal.fire({
            position: 'bottom',
            icon: 'error',
            text: 'Server error occurred, please try again',
            showConfirmButton: false,
            timer: 4000
          });
        }
      });
      this.subscriptions.push(subscription);
    } else {
      this.isSpinning = false;
    }
  }

  /**
   * Initiates the download of the PDF guide.
   */
  downloadPdf(): void {
    const pdfUrl = 'doc/marketspase_business_guide.pdf';
    this.http.get(pdfUrl, { responseType: 'blob' as 'json' }).subscribe((res: any) => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'marketspase_business_guide.pdf';
      downloadLink.click();
    });
  }

  /**
   * Marks all controls in the download form as touched.
   */
  private markAllAsTouched(): void {
    Object.keys(this.downloadForm.controls).forEach(controlName => {
      this.downloadForm.get(controlName)?.markAsTouched();
    });
  }

  /**
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
