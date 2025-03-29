import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../_common/services/api.service';

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
@Injectable()
export class GetStartedService {
  constructor(private apiService: ApiService) {}

  /**
   * Submits the survey form data to the backend API.
   * @param formObject The survey data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  submitSurvey(formObject: GetStartedFormData): Observable<any> {
    return this.apiService.post<any>('get-started/survey', formObject, undefined, true);
  }


    /**
   * Submits the signup form data to the backend API.
   * @param formObject The signup data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
    signUp(formObject: SignUpFormData): Observable<any> {
      return this.apiService.post<any>('get-started/signup', formObject, undefined, true);
    }
  

}