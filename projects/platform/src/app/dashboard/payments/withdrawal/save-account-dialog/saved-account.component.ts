import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { PaymentService, SavedAccountInterface } from '../../payment.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Saved Accounts Dialog
 */
@Component({
  selector: 'async-help-dialog',
  template: `
    <h2 mat-dialog-title>Saved Accounts</h2>
    <mat-dialog-content class="saved-accounts-container">
      <section>
        <article *ngFor="let account of data.savedAccounts" class="saved-account-item">
          <div class="account-details">
            <strong class="bank-name">{{ account.bank }}</strong>
            <span class="account-info">{{ account.accountNumber }} - {{ account.accountName }}</span>
          </div>
          <button mat-icon-button color="warn" (click)="confirmRemoveAccount(account._id, data)" class="remove-icon" title="Remove Account">
            <mat-icon>delete</mat-icon>
          </button>
        </article>
      </section>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button color="primary" (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule, MatIconModule, MatDialogContent, MatDialogActions],
  providers: [PaymentService],
  styles: [`


.saved-accounts-container {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

}

.saved-account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
  margin: 1em 0;

  &:last-child {
    border-bottom: none;
  }

  .account-details {
    flex: 1;
    display: flex;
    white-space: nowrap; /* Prevent text wrapping */
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 16px;
    align-items: center; /* Vertically center content */
  }

  .bank-name {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
    margin-right: 8px; /* Space between bank name and account info */
  }

  .account-info {
    font-size: 0.9rem;
    color: #666;
  }

  .remove-icon {
    color: #f44336;
    flex-shrink: 0;
    transition: transform 0.2s ease, color 0.2s ease;
    align-self: center;
  }
}

mat-dialog-actions {
 margin: 0.5em 0;
}


  `],
})
export class SavedAccountsComponent implements OnDestroy {
  readonly dialogRef = inject(MatDialogRef<SavedAccountsComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  subscriptions: Subscription[] = [];

   constructor(
      private paymentService: PaymentService,
    ) { }

  close(): void {
    this.dialogRef.close();
  }

  confirmRemoveAccount(accountId: string, data: any): void {

        Swal.fire({
          title: "Are you sure of this delete action?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.subscriptions.push(
              this.paymentService.removedSavedAcount(accountId, data.partnerId, ).subscribe({
                next: (response) => {
                  Swal.fire({
                    position: "bottom",
                    icon: 'success',
                    text: response.message, //'Your Ad is deleted successfully',
                    confirmButtonColor: 'rgb(5, 1, 17)',
                    timer: 8000,
                  })
                  this.removeAccount(accountId);
                    this.dialogRef.close();
                },
                error: (error: HttpErrorResponse) => {
                    let errorMessage = 'Server error occurred, please try again.';
                    if (error.error && error.error.message) {
                        errorMessage = error.error.message;
                    }
                    Swal.fire({
                        position: 'bottom',
                        icon: 'error',
                        text: errorMessage,
                        showConfirmButton: false,
                        timer: 4000,
                    });
                }
              })
            )
          }
        });

  }

  removeAccount(accountId: string): void {
    const index = this.data.savedAccounts.findIndex((account: SavedAccountInterface) => account._id === accountId);
    if (index !== -1) {
      this.data.savedAccounts.splice(index, 1);
      //console.log('Account removed:', accountId);
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

/* @Component({
  selector: 'confirm-remove-account-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Removal</h2>
    <mat-dialog-content>
      Are you sure you want to remove {{ data.account.bank }} - {{ data.account.accountNumber }}?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Remove</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmRemoveAccountDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmRemoveAccountDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any // Use @Inject to specify the injection token
      ) {}
} */