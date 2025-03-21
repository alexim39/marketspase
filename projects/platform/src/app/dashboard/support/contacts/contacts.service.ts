import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../../../_common/services/api.service';

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
  constructor(private apiService: ApiService) {}
   
  /**
   * Submits the contact form data to the backend.
   * @param formObject The contact form data.
   * @returns An observable of the submitted form data.
   */
  submit(formObject: ContactFormData): Observable<ContactFormData> {
    return this.apiService.post<any>('contact/submit', formObject);
  }
  
}
