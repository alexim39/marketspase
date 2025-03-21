import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { SettingsService } from '../../settings.service';
import Swal from 'sweetalert2';

/**
 * @title Professional info component
 */
@Component({
  selector: 'async-professional-info',
  providers: [SettingsService],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule
    ],
  template: `
  <div class="form-container">
    <form class="flex-form" [formGroup]="professionalForm" (ngSubmit)="onProfessionalSubmit()">
      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Job Title</mat-label>
          <input matInput formControlName="jobTitle" required maxlength="50">
          <mat-error *ngIf="professionalForm.get('jobTitle')?.hasError('required')">
            This is required
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Educational Background</mat-label>
          <mat-select formControlName="educationBackground" required>
            <mat-option value="Basic Education Certificate (Primary School)">Basic Education Certificate (Primary School)</mat-option>
            <mat-option value="WASSCE">WASSCE</mat-option>
            <mat-option value="NECO">NECO</mat-option>
            <mat-option value="GCE">GCE</mat-option>
            <mat-option value="ND">ND</mat-option>
            <mat-option value="HND">HND</mat-option>
            <mat-option value="B.Sc., B.A., B.Eng.">B.Sc., B.A., B.Eng.</mat-option>
            <mat-option value="M.Sc., M.A., M.B.A.">M.Sc., M.A., M.B.A.</mat-option>
            <mat-option value="Ph.D.">Ph.D.</mat-option>
            <mat-option value="NCE">NCE</mat-option>
            <mat-option value="None">None</mat-option>
          </mat-select>
          <mat-error *ngIf="professionalForm.get('educationBackground')?.hasError('required')">
            This field is required.
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Best Hobby</mat-label>
          <input matInput formControlName="hobby" required maxlength="50">
          <mat-error *ngIf="professionalForm.get('hobby')?.hasError('required')">
            This is required
          </mat-error>
        </mat-form-field>
      </div>

      <div class="form-group">
        <mat-form-field appearance="outline">
          <mat-label>Best Skill</mat-label>
          <input matInput formControlName="skill" required maxlength="50">
          <mat-error *ngIf="professionalForm.get('skill')?.hasError('required')">
            This is required
          </mat-error>
        </mat-form-field>
      </div>

      <div class="btn-group">
        <button mat-flat-button color="primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
  `,
  styles: `
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
  `
})
export class ProfessionalInfoComponent implements OnInit, OnDestroy {
  professionalForm!: FormGroup;
   subscriptions: Array<Subscription> = [];
    @Input() partner!: PartnerInterface;

   constructor(
      private settingsService: SettingsService
    ) { }

  ngOnInit(): void {
    if (this.partner) {
        this.professionalForm = new FormGroup({
            jobTitle: new FormControl(this.partner.jobTitle, [Validators.required]),
            educationBackground: new FormControl(this.partner.educationBackground, [Validators.required]),
            hobby: new FormControl(this.partner.hobby, [Validators.required]),
            skill: new FormControl(this.partner.skill, [Validators.required]),
            id: new FormControl(this.partner._id),
        });
    }
  }

  onProfessionalSubmit(): void {
    if (this.professionalForm.valid) {
        const professionalForm = this.professionalForm.value;

            this.subscriptions.push(
              this.settingsService.updateProfession(professionalForm).subscribe({
                next: () => {
                    Swal.fire({
                        position: "bottom",
                        icon: 'success',
                        text: 'Your professional details has been updated successfully',
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