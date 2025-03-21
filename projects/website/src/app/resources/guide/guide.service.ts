import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface DownloadFormData {
  name: string;
  surname: string;
  email: string;
}

@Injectable()
export class GuideDownloadService {
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
     console.error('GuideDownloadService: An error occurred:', error);
     return throwError(() => error); // Using factory function for lazy error creation.
   }
 
   /**
    * Constructs the SurveyService.
    * @param http The HttpClient for making HTTP requests.
    */
   constructor(private http: HttpClient) {}

    /**
   * Submits the guide form data to the backend API.
   * @param formObject The guide data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  submit(formObject: DownloadFormData): Observable<DownloadFormData> {

    const endpoint = `${this.apiUrl}/contact/guide-download`;

    return this.http.post<any>(endpoint, formObject).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );

  }

  
}