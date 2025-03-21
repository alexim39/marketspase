import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
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
     console.error('ContactService: An error occurred:', error);
     return throwError(() => error); // Using factory function for lazy error creation.
   }
 
   /**
    * Constructs the SurveyService.
    * @param http The HttpClient for making HTTP requests.
    */
   constructor(private http: HttpClient) {}
   
  /**
   * Submits the contact form data to the backend.
   * @param formObject The contact form data.
   * @returns An observable of the submitted form data.
   */
  submit(formObject: ContactFormData): Observable<ContactFormData> {

    const endpoint = `${this.apiUrl}/contact/submit`;

    return this.http.post<any>(endpoint, formObject).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );

  }
}
