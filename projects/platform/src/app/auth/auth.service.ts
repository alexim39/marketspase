import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface SignInInterface {
  email: string;
  password: string;
}


@Injectable()
export class AuthService {
  /**
   * The base URL for the API endpoints.
   */
  // private readonly apiUrl = 'https://diamondprojectapi-y6u04o8b.b4a.run/';
  private readonly apiUrl = 'http://localhost:3000'; // For local testing

  /**
 * Handles HTTP errors by logging and re-throwing them.
 * @param error The HttpErrorResponse.
 * @returns An Observable that emits the error.
 */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('SurveyService: An error occurred:', error);
    return throwError(() => error); // Using factory function for lazy error creation.
  }

  /**
   * Constructs the SurveyService.
   * @param http The HttpClient for making HTTP requests.
   */

  constructor(private http: HttpClient) {}

  /**
   * Submits the partner signin data to the backend API.
   * @param formObject The signin data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  signIn(formObject: SignInInterface): Observable<any> {
    //console.log('form record', formObject);

    const endpoint = `${this.apiUrl}/partners/signin`;

    return this.http.post<any>(endpoint, formObject, { withCredentials: true }).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );

  }

  /**
   * Submits the partner sign out data to the backend API.
   * @param formObject The sign out data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  signOut(formObject: {}): Observable<any> {

    const endpoint = `${this.apiUrl}/partners/signout`;

    return this.http.post<any>(endpoint, formObject, { withCredentials: true }).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );

  }

  
}