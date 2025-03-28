import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService, SignInInterface } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'async-signin',
  providers: [AuthService],
  imports: [
    MatButtonModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
  <p>Enter your Email and Password to get started</p>
<div class="page">
  <div class="login-panel">
    <form [formGroup]="signInForm" (submit)="onSubmit()">
      
      <!-- Email Field -->
      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" />
        <mat-error *ngIf="signInForm.get('email')?.hasError('required')">
          Email is required
        </mat-error>
        <mat-error *ngIf="signInForm.get('email')?.hasError('email')">
          Please enter a valid email address
        </mat-error>
      </mat-form-field>
      
      <!-- Password Field with Toggle -->
      <mat-form-field appearance="outline">
        <mat-label>Password</mat-label>
        <input
          matInput
          [type]="hidePassword ? 'password' : 'text'"
          formControlName="password"
        />
        <button
          mat-icon-button
          matSuffix
          type="button"
          (click)="hidePassword = !hidePassword"
          [attr.aria-label]="'Toggle password visibility'"
          [attr.aria-pressed]="hidePassword"
        >
          <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
        <mat-error *ngIf="signInForm.get('password')?.hasError('required')">
          Password is required
        </mat-error>
        <mat-error *ngIf="signInForm.get('password')?.hasError('minlength')">
          Password must be at least 8 characters long
        </mat-error>
      </mat-form-field>

      <button mat-flat-button color="primary" type="submit" [disabled]="signInForm.invalid">
        Login
      </button>
    </form>
    <p>
      <a routerLink="../forgot-password" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" target="_blank">I can't remember my password</a>
    </p>
    <p>
      Is this your first time here?
      <a href="https://marketspase.com/get-started" target="_blank">Sign up to Get Started</a>
    </p>
  </div>
</div>

  `,
  styles: [`
  .page {
     display: flex;
     justify-content: center;
     text-align: center;
     padding-top: 2em;
     .login-panel {
       display: flex;
       flex-direction: column;
       width: 100%;
       form {
         display: flex;
         flex-direction: column;
         mat-form-field {
          width: 100%;

        }
         .progress-bar {
           margin-bottom: 1em;
         }
         .error-message {
          margin-bottom: 0.5em;
         }
         button {
          margin-top: 0.5em;
         }
       }
       p {
         margin: 1em 0;
         //font-family: cursive;
         font-size: 14px;

         a {
           color: rgb(5, 1, 17);
           font-weight:bold;
           text-decoration: none;
         }
       }
       .line {
         border: 1px solid #ccc;
         margin: 1em 0;
       }
     }
 }


/* Mobile responsiveness */
@media (max-width: 768px) {
  .page {
    height: auto;
  }
}
`],

})
export class SigninComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup; // Use definite assignment operator or initialize in ngOnInit
  subscriptions: Subscription[] = [];
  hidePassword: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    this.markAllAsTouched();

    if (this.signInForm.valid) {
      const formData: SignInInterface = this.signInForm.value;

      this.subscriptions.push(
        this.authService.signIn(formData).subscribe({
          next: (response) => {
            //console.log(response)
            if (response.success) {
              localStorage.setItem('authToken', response.message); // Save token to localStorage
              this.router.navigateByUrl('dashboard');
            }
          },
          error: (error: HttpErrorResponse) => {
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
        }
        )
      );
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.signInForm.controls).forEach((controlName) =>
      this.signInForm.get(controlName)?.markAsTouched()
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
