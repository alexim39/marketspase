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

@Injectable()
export class PaymentService {
  
  constructor(private apiService: ApiService) {}
  
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
}
