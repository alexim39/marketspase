import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface emailSubscriptionInterface {
  email: string;
}

@Injectable()
export class FooterService {
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
        console.error('FooterService: An error occurred:', error);
        return throwError(() => error); // Using factory function for lazy error creation.
      }
    
      /**
       * Constructs the SurveyService.
       * @param http The HttpClient for making HTTP requests.
       */
      constructor(private http: HttpClient) {}


   /**
 * Submits the booking form data to the backend API.
 * @param formObject The email subscription data to be submitted.
 * @returns An Observable that emits the API response or an error.
 */
  submit(formObject: emailSubscriptionInterface): Observable<emailSubscriptionInterface> {
    //console.log('form record', emailObject);

    const endpoint = `${this.apiUrl}/emailSubscription/subscribe`;

    return this.http.post<any>(endpoint, formObject).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );

  }

  
}