import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../_common/services/api.service';


export interface TestimonialInterface {
  name: string;
  location: string;
  message: string;
  avatar: string;
}

export interface PayoutsInterface {
  name: string;
  amount: string;
  time: string;
}
@Injectable()
export class IndexService {
  constructor(private apiService: ApiService) {}


    /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
     */
    getPlansCountForDasboard(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`dashboard/${partnerId}`);
    }

    /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
     */
    getProfitForDasboard(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`dashboard/partner-profit/${partnerId}`);
    }

    /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
     */
    getExpensesForDasboard(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`dashboard/partner-expenses/${partnerId}`);
    }

     /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
     */
     getProfitForAPeriodDasboard(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`dashboard/calculate-profit/${partnerId}`);
    }

    /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
    */
     getRandomTestimonials(): Observable<any> {
      return this.apiService.get<any>(`dashboard/random-testimonials`);
    }

     /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
    */
     getRecentPayout(): Observable<any> {
      return this.apiService.get<any>(`dashboard/recent-payouts`);
    }

     /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
    */
     getDailyProfits(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`profit/daily-profit/${partnerId}`);
    }

     /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
    */
     getWeeklyProfits(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`profit/weekly-profit/${partnerId}`);
    }

    
}