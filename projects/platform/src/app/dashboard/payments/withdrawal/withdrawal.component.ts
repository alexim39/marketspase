import { Component, inject, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PartnerInterface } from '../../../_common/services/partner.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PaymentService, SavedAccountInterface } from '../payment.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../../../_common/help-dialog.component';
import { MatSelectChange, MatSelectModule, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { AccountBalanceService } from '../../profile/account-balance/account-balance.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { SavedAccountsComponent } from './save-account-dialog/saved-account.component';

/**
 * @title Withdrawal components
 */
@Component({
  selector: 'async-withdrawal',
  providers: [PaymentService],
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule, MatMenuModule,
    MatProgressBarModule, MatSlideToggleModule,
    RouterModule, CommonModule, CommonModule, ReactiveFormsModule
  ],
  styleUrls: ["withdrawal.component.scss"],
  templateUrl: "withdrawal.component.html",
})
export class WithdrawalComponent implements OnInit, OnDestroy {
  @Input() partner!: PartnerInterface;
  readonly dialog = inject(MatDialog);

  withdrawForm!: FormGroup;
  banks: any[] = [];
  filteredBanks: any[] = [];
  selectedBankName: string = '';
  subscriptions: Array<Subscription> = [];
  searchControl = new Subject<string>();
  private destroy$ = new Subject<void>();

  @ViewChild('bankSelect', { static: false }) bankSelect!: MatSelect;
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  savedAccounts: SavedAccountInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private paymentService: PaymentService,
    private accountBalanceService: AccountBalanceService,
  ) { }

  ngOnInit(): void {

    this.withdrawForm = this.fb.group({
      saveAccount: [false, Validators.required],
      bank: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      accountName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(100)]],
      partnerId: this.partner._id
    });

    this.getBanks();

    this.searchControl.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.filterBanks(searchTerm);
    });

    this.getSavedAccounts();
  }



  private getBanks() {
    this.http.get('https://api.paystack.co/bank').subscribe((response: any) => {
      this.banks = response.data;
      this.filteredBanks = [...this.banks];
    });
  }

  filterBanks(searchTerm: string) {
    if (!searchTerm) {
      this.filteredBanks = [...this.banks];
      return;
    }
    searchTerm = searchTerm.toLowerCase();
    this.filteredBanks = this.banks.filter(bank => bank.name.toLowerCase().includes(searchTerm));
  }

  resolveAccountName() {
    const accountNumber = this.withdrawForm.get('accountNumber')?.value;
    const bankCode = this.withdrawForm.get('bank')?.value;

    if (accountNumber && bankCode && accountNumber.length >= 10) { //Check for 11 digits
      const headers = new HttpHeaders({
        'Authorization': 'Bearer sk_test_2b176cfecf4bf2bf8ed1de53b55f868dc4ed9127'  // Replace with your Paystack secret key
      });

      const url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;

      this.subscriptions.push(
        this.http.get(url, { headers }).subscribe({
          next: (response: any) => {
            if (response.status) {
              //console.log('resp ',response)
                // Populate the account name field
                this.withdrawForm.patchValue({
                accountName: response.data.account_name
              });
            }
          },
          error: (error: HttpErrorResponse) => {
            Swal.fire({
              position: "bottom",
              icon: 'info',
              text: 'Account not found',
              showConfirmButton: false,
              timer: 4000
            })
          }
        })
      );
    } else if(accountNumber && accountNumber.length !== 11){
      this.withdrawForm.patchValue({
        accountName: ''
      });
    }
  }



  private getSavedAccounts() {
    // Fetch saved accounts (this could come from a service)
    this.savedAccounts = this.partner.savedAccounts || [];
   /*  this.savedAccounts = [
      { id: '1', bank: 'Access Bank', bankCode: '044', accountNumber: '0040342224', accountName: 'John Doe' },
      { id: '2', bank: 'GTBank', bankCode: '058', accountNumber: '0123456789', accountName: 'Jane Smith' }
    ]; */
  }

  populateForm(accountId: string) {
    const selected = this.savedAccounts.find(acc => acc._id === accountId);
    if (selected) {
      this.withdrawForm.patchValue({
        bank: selected.bankCode, // Set the bank field to the bank code
        accountNumber: selected.accountNumber,
        accountName: selected.accountName
      });
  
      // Update the selected bank name for display purposes
      this.selectedBankName = selected.bank;
    }
  }


  // Handle form submission
  onSubmit() {
    if (this.withdrawForm.valid) {
      const formData = this.withdrawForm.value;

      // Add the selected bank name to the formData
      formData.bankName = this.selectedBankName;

      // Proceed with withdrawal logic
      //console.log('Withdrawal request:', formData);

      this.subscriptions.push(
        this.paymentService.withdrawRequest(formData).subscribe({
          next: (response) => {
            //console.log('Payment successful and balance updated!',res);
            if (response.success) {
              Swal.fire({
                position: "bottom",
                icon: 'success',
                text:  response.message,//'Thank you for the request. Your account will be credited soon',
                confirmButtonColor: "rgb(5, 1, 17)",
                timer: 8000,
              }).then((result) => {
                if (result.isConfirmed) {
                  // reload the page.
                  //location.reload();
                  this.accountBalanceService.notifyBalanceUpdated();
                }
              });
            }
          },
          error: (error: HttpErrorResponse) => {
            //console.error('Error confirming payment:', error);
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
      );
    }
  }

  onBankChange(event: MatSelectChange) {
    const selectedBankCode = event.value;

    if (event.source && event.source.selected && event.source.selected instanceof MatOption) {
      const selectedOption = event.source.selected as MatOption;
      const selectedBankName = selectedOption.viewValue;
      this.selectedBankName = selectedBankName;
    } else {
      this.selectedBankName = '';
    }

    this.withdrawForm.patchValue({ bank: selectedBankCode });

    this.withdrawForm.patchValue({
      accountNumber: '',
      accountName: ''
    });
  }

  onSearchChange(event: any) {
    this.searchControl.next(event.target.value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showDescription() {
    this.dialog.open(HelpDialogComponent, {
      data: { help: 'In this section, you can request for fund transfer into a regular bank account' },
    });
  }

  openSavdAccount() {
    this.dialog.open(SavedAccountsComponent, {
      data: {
        savedAccounts: this.savedAccounts,
        partnerId: this.partner._id, // Include the partner ID
      },
    });
  }

 
}