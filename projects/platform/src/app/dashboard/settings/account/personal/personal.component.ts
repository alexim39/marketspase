import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileImageUploaderComponent } from '../profile-image.component';
import { Subscription } from 'rxjs';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { SettingsService } from '../../settings.service';
import Swal from 'sweetalert2';

/**
 * @title Personal Information Component
 */
@Component({
  selector: 'async-personal-infor',
  providers: [SettingsService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    ProfileImageUploaderComponent
  ],
  template: `
    <div class="form-container">
      <form class="flex-form" [formGroup]="profileMgrForm">
        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" required>
            <mat-error *ngIf="profileMgrForm.get('name')?.hasError('required')">This is required</mat-error>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Surname</mat-label>
            <input matInput formControlName="surname" required>
            <mat-error *ngIf="profileMgrForm.get('surname')?.hasError('required')">This is required</mat-error>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Email Address</mat-label>
            <input matInput type="email" formControlName="email">
            <mat-error *ngIf="profileMgrForm.get('email')?.hasError('required')">This is required</mat-error>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" required>
            <mat-error *ngIf="profileMgrForm.get('phone')?.hasError('required')">This is required</mat-error>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Residential Address</mat-label>
            <textarea matInput formControlName="address"></textarea>
            <mat-hint>Address will be used in case of shipping</mat-hint>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Short Bio</mat-label>
            <textarea matInput formControlName="bio"></textarea>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field appearance="outline">
            <mat-label>Date of Birth</mat-label>
            <input matInput [matDatepicker]="dobDatePicker" formControlName="dobDatePicker" [max]="minDate">
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matIconSuffix [for]="dobDatePicker"></mat-datepicker-toggle>
            <mat-datepicker #dobDatePicker></mat-datepicker>
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-slide-toggle [checked]="status" [disabled]="partner.status" (change)="activateAccount($event)">
            Active Account
          </mat-slide-toggle>
          <small style="color: gray;">Account Status</small>
        </div>

        <div class="form-group">
          <async-profile-image-uploader *ngIf="partner" [partner]="partner"></async-profile-image-uploader>
        </div>

        <div class="form-group"></div>

        <div class="btn-group">
          <button mat-flat-button color="primary" (click)="onProfileSubmit()">Submit</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 20px;
      background-color: white;
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
export class PersonalInfoComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  @Input() partner!: PartnerInterface;
  profileMgrForm!: FormGroup;

  status = false;
  disabled = false;
  minDate = new Date(1900, 0, 1);
  

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // Set the minimum date to today  
    this.minDate = new Date();

    // set account status
    this.status = this.partner.status;

    if (this.partner) {
        this.profileMgrForm = new FormGroup({
            name: new FormControl(this.partner.name, Validators.required),
            surname: new FormControl(this.partner.surname, Validators.required),
            address: new FormControl(this.partner.address),
            email: new FormControl(this.partner.email, [Validators.required, Validators.email]),
            phone: new FormControl(this.partner.phone, Validators.required),
            dobDatePicker: new FormControl(this.partner.dobDatePicker),
            bio: new FormControl(this.partner.bio),
            id: new FormControl(this.partner._id),
          });
    }

    this.profileMgrForm.get('email')?.disable();

  }

  activateAccount(event: MatSlideToggleChange) {
    if (event.checked) {

      const formObject = {
        state: event.checked,
        partnerId: this.partner._id 
      }

      this.subscriptions.push(
        this.settingsService.activateAccount(formObject).subscribe({
            next: () => {
                Swal.fire({
                    position: "bottom",
                    icon: 'success',
                    text: 'Check your email inbox now to activate your account',
                    confirmButtonColor: 'rgb(5, 1, 17)',
                    timer: 8000,
                })
            },
            error: () => {
                Swal.fire({
                    position: "bottom",
                    icon: 'error',
                    text: 'Server error occured, please try again',
                    showConfirmButton: false,
                    timer: 4000
                })
            }
        })
    )

    }    
  }

  onProfileSubmit() {
    if (this.profileMgrForm.valid) {
        const profileObject = this.profileMgrForm.value;

      
        this.subscriptions.push(
            this.settingsService.updateProfile(profileObject).subscribe({
                next: () => {
                    Swal.fire({
                        position: "bottom",
                        icon: 'success',
                        text: 'Your profile details has been updated successfully',
                        confirmButtonColor: 'rgb(5, 1, 17)',
                        timer: 4000,
                    })
                },
                error: () => {
                    Swal.fire({
                        position: "bottom",
                        icon: 'error',
                        text: 'Server error occured, please try again',
                        showConfirmButton: false,
                        timer: 4000
                    })
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