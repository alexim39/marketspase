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

/**
 * @title New Plan Component
 * Manages plan purchases and transaction updates to the backend.
 */
@Component({
  selector: 'async-new-buy',
  templateUrl: 'new-buy.component.html',
  styleUrls: ['new-buy.component.scss'],
  standalone: true,
  providers: [PlanService],
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
export class NewBuyComponent implements OnInit, OnDestroy {
  @Input() partner!: PartnerInterface;
  readonly dialog = inject(MatDialog);
  private subscriptions: Subscription[] = [];

  constructor(
    private planService: PlanService,
    private router: Router,
    private accountBalanceService: AccountBalanceService,
  ) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  /**
   * Initiates the payment process using Paystack.
   * @param amount - The amount to be paid in Naira.
   */
  buy(amount: number): void {
    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid amount provided');
      return;
    }

    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_1d5627d8d06cb2c937cee6ce4b0ed56c7fe2159a', // Replace with your Paystack public key
      //key: 'pk_live_ef4b274402e6786a901e106596f1904e3e08a713', // Replace with your Paystack public key
      email: this.partner.email,
      amount: amount * 100, // Paystack accepts amount in kobo
      currency: 'NGN',
      ref: `SPASE-${Date.now()}`, // Unique reference
      metadata: {
        custom_fields: [
          { display_name: 'First Name', variable_name: 'first_name', value: this.partner.name },
          { display_name: 'Surname', variable_name: 'surname', value: this.partner.surname },
        ],
      },
      callback: (response: any) => this.handlePaymentSuccess(response, amount),
      onClose: () => console.log('Payment dialog closed'),
    });

    handler.openIframe();
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
      this.planService.submit(transactionData).subscribe({
        next: (res: any) => {
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            text: 'Spase plan purchase completed',
            confirmButtonColor: 'rgb(5, 1, 17)',
            timer: 8000,
          }).then((result) => {
            //if (result.isConfirmed) {
              this.accountBalanceService.notifyBalanceUpdated();
            //}
          })
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            position: "bottom",
            icon: 'error',
            text: 'Server error occurred, please try again',
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
      data: { help: 'Choose any of the Spase plans to own or expand your digital assets.' },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
