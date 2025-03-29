import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControlOptions } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GetStartedService } from '../get-started.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'async-confirmation',
  imports: [
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  template: `
    <section class="head success-head">
      <article class="success-article">
        <mat-icon class="success-icon">task_alt</mat-icon>
        <h2 class="success-message">Thank You for Joining Our Community!</h2>
        <p class="success-paragraph">Your registration was successful. We're excited to have you join us.</p>
      </article>
    </section>

    <section class="body">
      <article class="writeup">
        <h3>Set Your Password</h3>
        <form class="password-form" [formGroup]="passwordForm" (ngSubmit)="setPassword()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" [attr.disabled]="true ? '' : null">
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-hint align="start">Your password should be a minimum of 8 characters long</mat-hint>
            <mat-error *ngIf="passwordForm.get('password')?.hasError('required')">Password is required</mat-error>
            <mat-error *ngIf="passwordForm.get('password')?.hasError('minlength')">
              Password must be at least 8 characters long
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Confirm Password</mat-label>
            <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword" required>
            <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
              <mat-icon>{{ hideConfirmPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
            <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
              Confirm Password is required
            </mat-error>
            <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('passwordMismatch')">
              Passwords do not match
            </mat-error>
          </mat-form-field>

          <mat-progress-bar mode="indeterminate" *ngIf="isSpinning"></mat-progress-bar><br>


          <div class="btn-container">
            <button mat-raised-button class="back-button" (click)="onPrevious()">Back</button>
            <button mat-flat-button color="primary" type="submit" [disabled]="passwordForm.invalid">
              Set Password <i class="fa fa-angle-double-right"></i>
            </button>
          </div>
        </form>
        
      </article>
    </section>
  `,
  providers: [GetStartedService],
  styles: [`
    .success-head {
      background-color: #f0f9f4;
      text-align: center;
      padding: 40px 20px;
    }

    .success-article {
      max-width: 600px;
      margin: 0 auto;

    }

    .success-icon {
      font-size: 10em;
      color: #4caf50;
      display: block;
      margin: 0 auto 20px;
      width: auto;
      height: auto;
    }

    .success-message {
      color: #2e7d32;
      font-size: 28px;
      margin-bottom: 10px;
    }

    .success-paragraph {
      color: #666;
      font-size: 16px;
    }

    .body {
      padding: 40px 20px;
    }

    .writeup {
      max-width: 600px;
      margin: 0 auto;
    }

    .password-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
    }

    mat-form-field {
      width: 100%;
      mat-hint {
        color: gray;
      }
    }

    button{
      width: 70%;
    }

    .btn-container {
      display: flex;
      justify-content: space-between;
      gap: 10px; /* Adjust the gap as needed */
    }

    @media (max-width: 600px) {
      .btn-container {
        flex-direction: column;
      }

      .back-button {
        display: none;
      }
    }
  `],
})
export class ConfirmationComponent implements OnInit {

  subscriptions: Subscription[] = [];
  isSpinning = false;

  passwordForm!: FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
  }>;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private getStartedService: GetStartedService,
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail'); // Retrieve email from local storage or elsewhere
    this.passwordForm = this.fb.group({
      email: new FormControl({ value: email, disabled: true }, Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator } as AbstractControlOptions);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      // Clear the passwordMismatch error while keeping other potential errors intact
      const errors = formGroup.get('confirmPassword')?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          formGroup.get('confirmPassword')?.setErrors(null);
        }
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onPrevious(): void {
    this.router.navigateByUrl('get-started');
  }

  setPassword() {
    this.isSpinning = true;
    if (this.passwordForm.valid) {
      const passwordData = this.passwordForm.getRawValue();
      // Implement password setting logic and backend communication here.

            this.subscriptions.push(
              this.getStartedService.signUp(passwordData).subscribe({
                next: () => {
      
                  this.isSpinning = false;
                  Swal.fire({
                    //title: "You Should Login",
                    position: 'bottom',
                    icon: 'success',
                    text: 'Account created successfully',//error.statusText,
                    showCancelButton: false,
                    confirmButtonColor: "rgb(5, 1, 17)",
                    timer: 10000,
                  }).then((result) => {
                    // Redirect to login page
                    window.open('https://platform.marketspase.com', '_self');
                  });               

                  localStorage.removeItem('username');
                  localStorage.clear();
                },
                error: (error: HttpErrorResponse) => {
                  if (error.status === 400) {
      
                    this.isSpinning = false;

                    Swal.fire({
                      position: 'bottom',
                      icon: 'error',
                      text: 'Error with input information',//error.statusText,
                      showConfirmButton: false,
                      timer: 4000,
                    });
      
                  }
                  if (error.status === 409) { // Account Exist
      
                    this.isSpinning = false;

                    Swal.fire({
                      //title: "You Should Login",
                      position: 'bottom',
                      icon: 'info',
                      text: 'Account already exist, try login',//error.statusText,
                      showCancelButton: false,
                      confirmButtonColor: "rgb(5, 1, 17)",
                      timer: 10000,
                    }).then((result) => {
                      // Redirect to login page
                      window.open('https://platform.marketspase.com', '_self');
                    });
      
                  } else {
                    this.isSpinning = false;

                    Swal.fire({
                      position: 'top-end',
                      icon: 'info',
                      text: 'Server error occured, please try again',//error.statusText,
                      showConfirmButton: false,
                      timer: 4000,
                    });
                  }
                },
              })
            );

    } else {
      this.passwordForm.markAllAsTouched();
      this.isSpinning = false;

    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
