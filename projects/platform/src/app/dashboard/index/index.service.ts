import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../_common/services/api.service';

@Injectable()
export class IndexService {
  constructor(private apiService: ApiService) {}


    /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
     */
    getPlanDetailForDasboard(partnerId: string): Observable<any> {
      return this.apiService.get<any>(`plan/dashboard/${partnerId}`);
    }

    /**
     * Get the form data to the backend.
     * @param formObject The form data.
     * @returns An observable of the submitted form data.
     */
    //  getAdsDetail(partnerId: string): Observable<any> {
    //   return this.apiService.get<any>(`plan/${partnerId}`);
    // }
}