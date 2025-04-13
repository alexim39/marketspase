import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { PlanService } from '../new-plan.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountBalanceService } from '../../profile/account-balance/account-balance.service';
import { PaystackService } from '../../../_common/services/paystack.service';

/**
 * @title New Plan Component
 * Manages plan purchases and transaction updates to the backend.
 */
@Component({
  selector: 'async-new-buy',
  templateUrl: 'new-buy.component.html',
  styleUrls: ['new-buy.component.scss'],
  standalone: true,
  providers: [PlanService, PaystackService],
  imports: [
    CommonModule,
    RouterModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
})
export class NewBuyComponent implements OnDestroy {
  @Input() partner!: PartnerInterface;
  readonly dialog = inject(MatDialog);
  private subscriptions: Subscription[] = [];

  constructor(
    private planService: PlanService,
    private router: Router,
    private accountBalanceService: AccountBalanceService,
    private paystackService: PaystackService
  ) {}

  /**
   * Initiates the payment process using Paystack.
   * @param amount - The amount to be paid in Naira.
  */
  buy(amount: number): void {
    this.paystackService.initiatePayment(amount, this.partner, this.handlePaymentSuccess.bind(this));
  }

  /**
   * Handles successful payment callback.
   * @param response - Paystack response object.
   */
  private handlePaymentSuccess(response: any, amount: number): void {
    //console.log('Payment successful. Reference:', response);

     // Create transaction data to send to the backend
     const transactionData = {
      partnerId: this.partner._id,
      amount: amount,
      currency: 'NGN',
      reference: response.reference,
      status: response.status,
      message: response.message,
      trans: response.trans,
      //date: new Date().toISOString()
    };
   

    // TODO: Send transaction update to the backend
    this.subscriptions.push(
      this.planService.purchase(transactionData).subscribe({
        next: (response) => {
          if (response.success) {
            Swal.fire({
              position: 'bottom',
              icon: 'success',
              text: response.message,//'Spase plan purchase completed',
              confirmButtonColor: 'rgb(5, 1, 17)',
              timer: 4000,
            }).then((result) => {
              //if (result.isConfirmed) {
                this.accountBalanceService.notifyBalanceUpdated();
              //}
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

  /**
   * Displays help dialog with information about the plans.
   */
  showDescription(): void {
    this.dialog.open(HelpDialogComponent, {
      data: { help: 'Choose any of the Spase plans to own or expand your plan.' },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
