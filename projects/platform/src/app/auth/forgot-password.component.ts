// Angular Component (forgot-password.component.ts)
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'async-forgot-password',
  imports: [
    MatButtonModule, CommonModule, MatIconModule, RouterModule, ReactiveFormsModule,
    MatCardModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule
  ],
  styles: [`
    .forgot-password-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 90vh;
      background: #f0f4f8;
      padding: 1em;
    }

    .forgot-password-card {
      width: 90%;
      max-width: 500px;
      padding: 2em;
      border-radius: 16px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      background: white;
      text-align: center;
    }

    .forgot-password-title {
      font-size: 1.8em;
      margin-bottom: 0.8em;
      color: #333;
    }

    .forgot-password-description {
      margin-bottom: 1.5em;
      color: #666;
    }

    .form-field {
      width: 100%;
      margin-bottom: 1.5em;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-top: 1em;
    }

    .back-button {
      margin-top: 0.5em;
    }

    @media (max-width: 600px) {
      .forgot-password-card {
        padding: 1.5em;
      }
    }
  `],
  template: `
    <section class="forgot-password-page">
      <mat-card class="forgot-password-card">
        <mat-card-title class="forgot-password-title">Forgot Password</mat-card-title>
        <mat-card-content>
          <p class="forgot-password-description">Enter your email to receive password reset instructions.</p>

          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="email?.invalid && email?.touched">Valid email is required.</mat-error>
            </mat-form-field>

            <div class="button-container">
              <button mat-flat-button color="primary" type="submit" [disabled]="forgotPasswordForm.invalid || loading">
                <span *ngIf="!loading">Send Reset Link</span>
              </button>
              <button mat-button routerLink="/" class="back-button">Back</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      const email = this.forgotPasswordForm.value.email;
      //const url = 'http://localhost:3000/auth/forgot-password';
      const url = 'https://marketspase-96hm2qxb.b4a.run/auth/forgot-password';

      this.http.post<{ success: boolean; message: string }>(url, { email })
        .subscribe({
          next: (response) => {
            this.loading = false;
            //this.showSnackbar(response.message, response.success ? 'success-snackbar' : 'error-snackbar');
            Swal.fire({
              position: "bottom",
              icon: 'success',
              text: response.message,
              confirmButtonColor: "rgb(5, 1, 17)",
              timer: 10000,
            })
          },
          error: (error) => {
            console.error('Error:', error);
            this.loading = false;
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
          },
        });
    }
  }
}