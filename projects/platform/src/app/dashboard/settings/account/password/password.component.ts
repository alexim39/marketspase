import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import { Subscription } from 'rxjs';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Pasword Change component
 */
@Component({
  selector: 'async-password-changer',
  providers: [SettingsService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
  template: `
    <div class="form-container">
    <form class="flex-form" [formGroup]="passwordForm" (ngSubmit)="onChangeSubmit()">
        <div class="form-group">
            <mat-form-field appearance="outline">
                <mat-label>Current Password</mat-label>
                <input matInput [type]="hideCurrent() ? 'password' : 'text'" formControlName="currentPassword" required/>
                    <a
                    mat-icon-button
                    matSuffix
                    (click)="onHideCurrent($event)"
                    [attr.aria-label]="'Hide password'"
                    [attr.aria-pressed]="hideCurrent()"
                    >
                    <mat-icon>{{hideCurrent() ? 'visibility_off' : 'visibility'}}</mat-icon>
                    </a>
                    <mat-error *ngIf="passwordForm.get('currentPassword')?.hasError('required') ">
                        Password is required
                    </mat-error>
                    <mat-error *ngIf="passwordForm.get('currentPassword')?.errors?.['minlength'] && passwordForm.get('currentPassword')?.touched">  
                        Password must be at least 6 characters long.  
                    </mat-error> 
            </mat-form-field>
        </div>
        <div class="form-group">
            <mat-form-field appearance="outline">
                <mat-label>New Password</mat-label>
                <input matInput [type]="hideNew() ? 'password' : 'text'" formControlName="newPassword" required/>
                <a
                mat-icon-button
                matSuffix
                (click)="onHideNew($event)"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hideNew()"
                >
                <mat-icon>{{hideNew() ? 'visibility_off' : 'visibility'}}</mat-icon>
                </a>
                <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required') ">
                    Password is required
                </mat-error>
                <mat-error *ngIf="passwordForm.get('newPassword')?.errors?.['minlength'] && passwordForm.get('newPassword')?.touched">  
                    Password must be at least 6 characters long.  
                </mat-error> 
            </mat-form-field>
        </div>
        <div class="form-group"></div>

        <div class="btn-group">
            <button mat-flat-button color="primary">Submit</button>
        </div>
        
    </form>
    </div>
`,
styles: [`
    .form-container {
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
    .flex-form {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .form-group {
      flex: 1 1 calc(50% - 20px);
      display: flex;
      flex-direction: column;
    }
    .btn-group {
        display: flex;
        justify-content: center;
        width: 100%;
        button {
            width: 20%;
        }
    }
    @media (max-width: 600px) {
      .form-group {
        flex: 1 1 100%;
      }
    }
  `]
})
export class PasswordChangeComponent implements OnInit, OnDestroy {
    subscriptions: Array<Subscription> = [];
    @Input() partner!: PartnerInterface;
    passwordForm!: FormGroup;
    hideCurrent = signal(true);
    hideNew = signal(true);

    constructor(
        private settingsService: SettingsService
    ) { }


    onHideCurrent(event: MouseEvent) {
        this.hideCurrent.set(!this.hideCurrent());
        event.stopPropagation();
    }

    onHideNew(event: MouseEvent) {
        this.hideNew.set(!this.hideNew());
        event.stopPropagation();
    }

    ngOnInit() {
      if (this.partner) {
          this.passwordForm = new FormGroup({
          currentPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
          newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
          id: new FormControl(this.partner._id),
          });
      }
    }

    onChangeSubmit() {
      if (this.passwordForm.valid) {
       const passwordObject = this.passwordForm.value;

      this.subscriptions.push(
          this.settingsService.changePassword(passwordObject).subscribe({
            next: (response) => {
              if (response.success) {
                Swal.fire({
                  position: "bottom",
                  icon: 'success',
                  text: response.message,
                  confirmButtonColor: 'rgb(5, 1, 17)',
                  timer: 4000,
                }).then((result) => {
                  if (result.isConfirmed) {
                  // Reset the form and clear validation errors
                  this.passwordForm.reset();
                  this.passwordForm.markAsPristine(); // Mark the form as pristine
                  this.passwordForm.markAsUntouched(); // Mark the form as untouched
                  }
                })
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
          })
        )
      }
    }

    ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
    }
}