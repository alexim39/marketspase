import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


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
   /**
     * The base URL for the API endpoints.
     */
     private readonly apiUrl = 'https://marketspase-96hm2qxb.b4a.run/';
    //private readonly apiUrl = 'http://localhost:3000'; // For local testing
  
    /**
   * Handles HTTP errors by logging and re-throwing them.
   * @param error The HttpErrorResponse.
   * @returns An Observable that emits the error.
   */
    private handleError(error: HttpErrorResponse): Observable<never> {
      console.error('BookingService: An error occurred:', error);
      return throwError(() => error); // Using factory function for lazy error creation.
    }
  
    /**
     * Constructs the SurveyService.
     * @param http The HttpClient for making HTTP requests.
     */
    constructor(private http: HttpClient) {}

  
    
  /**
 * Submits the booking form data to the backend API.
 * @param formObject The booking data to be submitted.
 * @returns An Observable that emits the API response or an error.
 */
  submit(formObject: BookingFormData): Observable<BookingFormData> {
    //console.log('form record', formObject);

    const endpoint = `${this.apiUrl}/booking/submit`;

    return this.http.post<any>(endpoint, formObject).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );

  }

  
}