// Angular Component (change-password.component.ts)
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'async-change-password',
  imports: [
    MatButtonModule, CommonModule, MatIconModule, RouterModule, ReactiveFormsModule,
    MatCardModule, MatInputModule, MatFormFieldModule,
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
        <mat-card-title class="forgot-password-title">Change Password</mat-card-title>
        <mat-card-content>
          <p class="forgot-password-description">Enter your new password.</p>

          <form [formGroup]="changePasswordForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="form-field">
              <mat-label>New Password</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hidePassword">
                <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="changePasswordForm.get('password')?.invalid && changePasswordForm.get('password')?.touched">Password is required and must be at least 6 characters.</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="form-field">
              <mat-label>Confirm Password</mat-label>
              <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword" required>
              <button mat-icon-button matSuffix type="button" (click)="hideConfirmPassword = !hideConfirmPassword" [attr.aria-label]="'Hide confirm password'" [attr.aria-pressed]="hideConfirmPassword">
                <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="changePasswordForm.get('confirmPassword')?.invalid && changePasswordForm.get('confirmPassword')?.touched">Passwords must match.</mat-error>
            </mat-form-field>

            <div class="button-container">
              <button mat-flat-button color="primary" type="submit" [disabled]="changePasswordForm.invalid || loading">
                <span *ngIf="!loading">Change Password</span>
              </button>
              <button mat-button routerLink="/" class="back-button">Back</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </section>
  `,
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      const password = this.changePasswordForm.value.password;
      const token = this.route.snapshot.queryParams['token'];
      //let url = 'http://localhost:3000/auth/reset-password';
      let url = 'https://marketspase.com/auth/reset-password';
      let payload = { password, token };

      this.http.post<{ success: boolean; message: string }>(url, payload)
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
            }).then((result) => {
              if (result.isConfirmed) {
                // redirect to home page.
                this.router.navigate(['/']);
              }
            });
            /* if (response.success) {
              this.router.navigate(['/']);
            } */
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