import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../_common/services/api.service';


export interface BookingFormData {
  name: string;
  surname: string;
  phone: string;
  reason: string;
  description?: string;
  consultDate: Date;
  consultTime: Date;
  email: string;
  contactMethod: string;
  referral?: string;
  userDevice: string;
  username: string;
}

@Injectable()
export class BookingService {
  constructor(private apiService: ApiService) {}

  
    
  /**
 * Submits the booking form data to the backend API.
 * @param formObject The booking data to be submitted.
 * @returns An Observable that emits the API response or an error.
 */
  submit(formObject: BookingFormData): Observable<any> {
    return this.apiService.post<any>('booking/submit', formObject);
  }

  
}