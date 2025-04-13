import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../_common/services/api.service';
import { HttpParams } from '@angular/common/http';

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

// saved-account.model.ts
export interface SavedAccountInterface {
  _id: string;
  bank: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

@Injectable()
export class PaymentService {
  
  constructor(private apiService: ApiService) {}
  
   /**
   * Submits the  form data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
   getTransactions(partnerId: string): Observable<any> {
    return this.apiService.get<any>(`transaction/${partnerId}`);
  }
  
  /**
   * Submits the form data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
  withdrawRequest(formObject: any): Observable<any> {
    //console.log('withdrawRequest', formObject);
    return this.apiService.post<any>('transaction/withdraw-request', formObject);
  }

  
   /**
   * Submits the form data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
   removedSavedAcount( accountId: string, partnerId: string,): Observable<any> {
    return this.apiService.delete<any>(`transaction/saved-accounts/${partnerId}/${accountId}`);
  }
}
