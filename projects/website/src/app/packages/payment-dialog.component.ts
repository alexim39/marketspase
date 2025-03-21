import { CommonModule } from '@angular/common';
import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import Swal from 'sweetalert2';

/**
 * @title Payment Dialog
 */
@Component({
  selector: 'async-payment-dialog',
  standalone: true,
  imports: [ MatDialogModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  template: `

<h2 mat-dialog-title>Plans Payment</h2>  
<mat-dialog-content>  

  <p>Fill out the form with details to complete your payment and get started with Diamond Project</p>  

  <form #paymentForm="ngForm" (ngSubmit)="pay(paymentForm)" novalidate>  

    <mat-form-field appearance="outline">  
      <mat-label>First name</mat-label>  
      <input matInput [(ngModel)]="firstName" name="firstName" required />  
      <mat-error *ngIf="paymentForm.submitted && !firstName">First name is required.</mat-error>  
    </mat-form-field>  

    <mat-form-field appearance="outline">  
      <mat-label>Surname</mat-label>  
      <input matInput [(ngModel)]="surname" name="surname" required />  
      <mat-error *ngIf="paymentForm.submitted && !surname">Surname is required.</mat-error>  
    </mat-form-field>  

    <mat-form-field appearance="outline">  
      <mat-label>Phone number</mat-label>  
      <input matInput [(ngModel)]="phoneNumber" name="phoneNumber" required/>  
      <mat-error *ngIf="paymentForm.submitted && !phoneNumber">Phone number is required.</mat-error>  
      <!-- <mat-error *ngIf="paymentForm.submitted && phoneNumber && !phoneNumber.match(/^[0-9]*$/)">Phone number must be numeric.</mat-error>   -->
    </mat-form-field>  

    <mat-form-field appearance="outline">  
      <mat-label>Email address</mat-label>  
      <input matInput [(ngModel)]="emailAddress" name="emailAddress" required email />  
      <mat-error *ngIf="paymentForm.submitted && !emailAddress">Email address is required.</mat-error>  
      <!-- <mat-error *ngIf="paymentForm.submitted && emailAddress && !emailAddress.match(/^[^@]+@[^@]+\.[^@]+$/)">Invalid email address.</mat-error>   -->
    </mat-form-field>  

    <mat-form-field appearance="outline">  
      <mat-label>Amount</mat-label>  
      <input matInput disabled [value]="data.amount | currency:'₦':'symbol':'1.0-0'" />  
    </mat-form-field>  

    <div class="button">
      <button mat-button type="button" (click)="onNoClick()">Cancel</button>  
      <button mat-flat-button color="primary" type="submit">Pay</button> 
    </div> 

  </form>  

</mat-dialog-content>
  `,
  styles: `
form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .button {
    display: flex;
    justify-content: space-between;
    button {
      width: 50%;
    }
  }
}
  `
})
export class PaymentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<PaymentDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  firstName: string = '';  
  surname: string = '';  
  phoneNumber: string = '';  
  emailAddress: string = '';  

  constructor() {}  

  pay(form: any): void {
    if (form.valid) {
      const paymentDetails = {
        firstName: this.firstName,
        surname: this.surname,
        phoneNumber: this.phoneNumber,
        emailAddress: this.emailAddress,
        amount: this.data.amount,
      };

      const handler = (<any>window).PaystackPop.setup({
        key: 'pk_live_ef4b274402e6786a901e106596f1904e3e08a713', // Replace with your Paystack public key
        email: this.emailAddress,
        amount: this.data.amount * 100, // Paystack accepts amount in kobo
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1), // Generate a random reference
        metadata: {
          custom_fields: [
            {
              display_name: 'First Name',
              variable_name: 'first_name',
              value: this.firstName,
            },
            {
              display_name: 'Surname',
              variable_name: 'surname',
              value: this.surname,
            },
            {
              display_name: 'Phone Number',
              variable_name: 'phone_number',
              value: this.phoneNumber,
            },
          ],
        },
        callback: (response: any) => {
          console.log('Payment successful. Reference:', response.reference);
          this.dialogRef.close({ success: true, reference: response.reference });

          Swal.fire({
            position: "bottom",
            icon: 'success',
            text: 'Payment successful. You will be contacted in few minutes.',
            showConfirmButton: true,
            timer: 15000,
          })

        },
        onClose: () => {
          console.log('Payment dialog closed');
        },
      });

      handler.openIframe();
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}