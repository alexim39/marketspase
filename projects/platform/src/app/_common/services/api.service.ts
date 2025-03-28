import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
 * The base URL for the API endpoints.
 */
 //private readonly baseUrl = 'https://marketspase-96hm2qxb.b4a.run/';
 private readonly baseUrl = 'http://localhost:3000'; // For local testing

 /**
 * Handles HTTP errors by logging and re-throwing them.
 * @param error The HttpErrorResponse.
 * @returns An Observable that emits the error.
 */
  private handleError(error: HttpErrorResponse): Observable<never> {
  console.error('Service: An error occurred:', error);
  return throwError(() => error); // Using factory function for lazy error creation.
  }

  /**
 * Constructor.
 * @param http The HttpClient for making HTTP requests.
 */
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params, headers }).pipe(
          retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
          catchError(this.handleError)
    )
  }

  post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers }).pipe(
        retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
        catchError(this.handleError)
      );
  }

  put<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers }).pipe(
        retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params, headers }).pipe(
        retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
        catchError(this.handleError)
      );
  }

  patch<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  head<T>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.head<T>(`${this.baseUrl}/${endpoint}`, { params, headers }).pipe(
        retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
        catchError(this.handleError)
      );
  }
}
