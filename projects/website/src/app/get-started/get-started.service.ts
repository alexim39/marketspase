import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// get-started.interface.ts
export interface GetStartedFormData {
  ageRange: string;
  socialMedia: string[];
  onlinePurchaseSchedule: string;
  onlineBusinessTimeDedication: string;
  email: string;
  name: string;
  surname: string;
}

export interface SignUpFormData {
  email: string | null;
  confirmPassword: string | null;
  password: string | null;
}

/**
 * SurveyService handles communication with the backend API for survey submissions.
 * It encapsulates the logic for sending survey data and managing API interactions.
 */
@Injectable({
  providedIn: 'root', // Provides the service at the root level, making it a singleton
})
export class GetStartedService {
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
    console.error('SurveyService: An error occurred:', error);
    return throwError(() => error); // Using factory function for lazy error creation.
  }

  /**
   * Constructs the SurveyService.
   * @param http The HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Submits the survey form data to the backend API.
   * @param formObject The survey data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  submitSurvey(formObject: GetStartedFormData): Observable<any> {

    const endpoint = `${this.apiUrl}/get-started/survey`;

    return this.http.post<any>(endpoint, formObject).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );
  }


    /**
   * Submits the signup form data to the backend API.
   * @param formObject The signup data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
    signUp(formObject: SignUpFormData): Observable<any> {

      const endpoint = `${this.apiUrl}/get-started/signup`;
  
      return this.http.post<any>(endpoint, formObject).pipe(
        retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
        catchError(this.handleError)
      );
    }
  

}