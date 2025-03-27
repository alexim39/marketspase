import { Injectable } from '@angular/core';
import { PartnerInterface } from './partner.service';

@Injectable()
export class PaystackService {

  constructor() { }

  /**
   * Initiates the payment process using Paystack.
   * @param amount - The amount to be paid in Naira.
   * @param partner - The partner object containing email, name, and surname.
   * @param handlePaymentSuccess - The callback function to handle payment success.
   */
  initiatePayment(amount: number, partner: PartnerInterface, handlePaymentSuccess: (response: any, amount: number) => void): void {
    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid amount provided');
      return;
    }

    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_1d5627d8d06cb2c937cee6ce4b0ed56c7fe2159a', // Replace with your Paystack public key
      //key: 'pk_live_ef4b274402e6786a901e106596f1904e3e08a713', // Replace with your Paystack public key
      email: partner.email,
      amount: amount * 100, // Paystack accepts amount in kobo
      currency: 'NGN',
      ref: `SPASE-${Date.now()}`, // Unique reference
      metadata: {
        custom_fields: [
          { display_name: 'First Name', variable_name: 'first_name', value: partner.name },
          { display_name: 'Surname', variable_name: 'surname', value: partner.surname },
        ],
      },
      callback: (response: any) => handlePaymentSuccess(response, amount),
      onClose: () => console.log('Payment dialog closed'),
    });

    handler.openIframe();
  }
}