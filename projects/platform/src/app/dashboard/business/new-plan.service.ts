import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../_common/services/api.service';

export interface PlanInterface {
  partnerId: string;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  message: string;
  trans: string;
  createdAt?: Date;
}


@Injectable()
export class PlanService {
 constructor(private apiService: ApiService) {}
   
  /**
 * Submits the plan form data to the backend.
 * @param formObject The plan form data.
 * @returns An observable of the submitted form data.
 */
  purchase(formObject: PlanInterface): Observable<any> {
    return this.apiService.post<PlanInterface>('plan', formObject);
  }

   /**
   * Get the form data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
   getPlans(partnerId: string): Observable<any> {
    return this.apiService.get<any>(`plan/${partnerId}`);
  }

}
