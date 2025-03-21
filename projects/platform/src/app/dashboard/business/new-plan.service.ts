import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../_common/services/api.service';

export interface NewPlasnData {
  partnerId: string;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  message: string;
  trans: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewPlanService {
 constructor(private apiService: ApiService) {}
   
  /**
 * Submits the plan form data to the backend.
 * @param formObject The plan form data.
 * @returns An observable of the submitted form data.
 */
  submit(formObject: NewPlasnData): Observable<NewPlasnData> {
    return this.apiService.post<any>('plan', formObject);
  }
}
