import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PartnerInterface } from '../interface/partner.interface';

@Injectable({
  providedIn: 'root',
})
export class UsernameCheckService {
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
 * Submits the username form data to the backend API.
 * @param username The data to be submitted.
 * @returns An Observable that emits the API response or an error.
 */
  checkUsernameAvailability(username: string): Observable<PartnerInterface> {

    const endpoint = `${this.apiUrl}/partners/check-username/${username}`;

    return this.http.get<PartnerInterface>(endpoint).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );
  }
}
