import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ContactFormData, ContactService } from './contacts.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

/**
 * @title Customer feedback
 */
@Component({
  selector: 'async-contacts',
  standalone: true,
  providers: [ContactService],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: "contacts.component.html",
  styleUrls: ['contacts.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  contactForm: FormGroup = new FormGroup({}); // Default initialization
  subscriptions: Subscription[] = [];
  isSpinning = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  /**
   * Scrolls the window to the top smoothly.
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Submits the contact form data to the backend.
   * Marks all form controls as touched, shows a spinner, and uses SweetAlert2 for notifications.
   */
  onSubmit(): void {
    this.isSpinning = true;
    // Mark all form controls as touched to trigger error messages
    this.markAllAsTouched();

    if (!this.contactForm.valid) {
      this.isSpinning = false;
      return;
    }

    const formData: ContactFormData = this.contactForm.value;
    const subscription = this.contactService.submit(formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          position: "bottom",
          icon: 'success',
          text: 'Thank you for reaching out to us. We will respond to your message via email shortly',
          confirmButtonColor: "rgb(5, 1, 17)",
          timer: 10000
        });
        this.isSpinning = false;
        // Uncomment if you want to navigate after a successful submission:
        // this.router.navigateByUrl('get-started/connected-economy');
      },
      error: (error: Error) => {
        this.isSpinning = false;
        Swal.fire({
          position: "bottom",
          icon: 'info',
          text: 'Server error occurred, please try again',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
    this.subscriptions.push(subscription);
  }

  /**
   * Marks all controls in the contact form as touched.
   */
  private markAllAsTouched(): void {
    Object.keys(this.contactForm.controls).forEach(controlName => {
      this.contactForm.get(controlName)?.markAsTouched();
    });
  }

  /**
   * Unsubscribes from all subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
