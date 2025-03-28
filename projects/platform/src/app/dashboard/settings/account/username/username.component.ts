import { Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import { PartnerInterface } from '../../../../_common/services/partner.service';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../settings.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../../../_common/help-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Username component
 */
@Component({
  selector: 'async-username-info',
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
    <form class="flex-form" [formGroup]="usernameForm" (ngSubmit)="onUsernameSubmit()">
        <div class="form-group" style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
            <mat-form-field appearance="outline" style="width: 50%;">
                <mat-label>Username</mat-label>
                <input matInput formControlName="username" required>
            </mat-form-field>
            <mat-icon style="margin: 0  0 1em 6px; cursor: pointer;" (click)="showDescription()">help</mat-icon>
        </div>
        <div class="form-group"></div>
        <div class="form-group">
            Landing page URL: <a href="http://marketspase.com/{{partner.username | lowercase}}" target="_blank">www.marketspase.com/{{partner.username | lowercase}}</a>
        </div>
        <div class="form-group"></div>

        <div class="btn-group">
            <button mat-flat-button>Submit</button>
        </div>
       
    </form>
    </div>
  `,
    styles: `
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
    `
})
export class UsernameInfoComponent implements OnInit, OnDestroy {
    subscriptions: Array<Subscription> = [];
    @Input() partner!: PartnerInterface;
    usernameForm!: FormGroup;
    readonly dialog = inject(MatDialog);
    
    constructor(
        private settingsService: SettingsService
    ) { }

    ngOnInit() {
      if (this.partner) {
            this.usernameForm = new FormGroup({
              username: new FormControl(this.partner.username, Validators.required),
              id: new FormControl(this.partner._id),
          });
      }
    }

      onUsernameSubmit() {
        if (this.usernameForm.valid) {
            const usernameObject = this.usernameForm.value;
        
            this.subscriptions.push(
              this.settingsService.updateUsername(usernameObject).subscribe({
                next: (response) => {
                  if (response.success) {
                    Swal.fire({
                      position: "bottom",
                      icon: 'success',
                      text: response.message,//'Your username has been updated successfully',
                      confirmButtonColor: 'rgb(5, 1, 17)',
                      timer: 4000,
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

      showDescription () {
        this.dialog.open(HelpDialogComponent, {
          data: {help: `
            Make sure your username, which is part of your unique link, is meaningful and easy to remember. 
            A good example is marketspase.com/business.
    
            <p>Other examples of good unique link:
              <ul>
                <li>marketspase.com/join</li>
                <li>marketspase.com/link</li>
              </ul>
            </p>
          `},
        });
      }
}