import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface PartnerInterface {
  _id: string;
  status: boolean;
  name: string;
  surname: string;
  email: string;
  reservationCode: string;
  phone: string;
  password: string;
  username: string;
  bio?: string;
  address: string;
  dobDatePicker?: Date;
  balance?: number;
  role?: string;
  profileImage?: string;
  jobTitle?: string;
  educationBackground?: string;
  hobby?: string;
  skill?: string;
  createdAt?: Date;
  notification: boolean;
  darkMode: boolean;
}

@Injectable()
export class PartnerService {
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
      console.error('PartnerService: An error occurred:', error);
      return throwError(() => error); // Using factory function for lazy error creation.
    }
  
   /**
   * Constructs the PartnerService.
   * @param http The HttpClient for making HTTP requests.
   */
  
    constructor(private http: HttpClient) {}

  /**
   * Get partner data to the backend API.
   * @param formObject The signin data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  getPartner(): Observable<PartnerInterface> {
    const endpoint = `${this.apiUrl}/partners/partner`;

    return this.http.get<PartnerInterface>(endpoint, { withCredentials: true }).pipe(
      retry({ count: 1, delay: 0 }), // Retry once immediately upon failure
      catchError(this.handleError)
    );
  }

  private partnerSubject = new BehaviorSubject<any>(null); // Initial value can be anything

  getSharedPartnerData$ = this.partnerSubject.asObservable();

  updatePartnerService(data: PartnerInterface) {
    //console.log('login ',data)
    this.partnerSubject.next(data);
  }


}