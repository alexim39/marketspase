import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../_common/services/api.service';

export interface TransactionInterface {
  message: string;
  data: Array<{
    amount: number;
    reference: string;
    status: string;
    paymentStatus?: boolean;
    date: Date;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class PaystackService {
  
 constructor(private apiService: ApiService) {}

  
    
  /**
 * Submits the contact form data to the backend.
 * @param formObject The contact form data.
 * @returns An observable of the submitted form data.
 */
/*   confirmPayment(reference: string, partnerId: string): Observable<any> {
    return this.apiService.post<any>('transaction/confirm-payment', { reference, partnerId: partnerId });
  } */

   
  
   /**
   * Submits the contact form data to the backend.
   * @param formObject The contact form data.
   * @returns An observable of the submitted form data.
   */
   getTransactions(partnerId: string): Observable<any> {
    return this.apiService.get<any>(`transaction/${partnerId}`);
  }

  
  
   /**
   * Submits the contact form data to the backend.
   * @param formObject The contact form data.
   * @returns An observable of the submitted form data.
   */
  withdrawRequest(formObject: any): Observable<any> {
    return this.apiService.post<any>('transaction/withdraw-request', formObject);
  }



   /**
   * Submits the contact form data to the backend.
   * @param formObject The contact form data.
   * @returns An observable of the submitted form data.
   */
  payWithPaystack(email: string, amount: number, callback: (response: any) => void): void {
    const handler = (window as any).PaystackPop.setup({
      //key: 'pk_test_1d5627d8d06cb2c937cee6ce4b0ed56c7fe2159a', // Replace with your Paystack public key
      key: 'pk_live_ef4b274402e6786a901e106596f1904e3e08a713', // Replace with your Paystack public key
      email: email,
      amount: amount * 100, // Paystack expects the amount in kobo
      currency: 'NGN',
      ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a random reference number
      callback: (response: any) => {
        // Payment was successful
        callback(response);
      },
      onClose: () => {
        console.log('Payment closed');
      }
    });
    handler.openIframe();
  }
}
