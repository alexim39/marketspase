import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../_common/services/api.service';

export interface AdsInterface {
    message: string;
    data?: Array<{
      targetAudience: any;
      marketingObjectives: any;
      budget: any;
      adDuration: any;
      adFormat: any;
      _id: string;
      visits?: number;
      createdAt: Date;
      campaignName: string;
      leads: number;
    }>;      
}
  
@Injectable({
  providedIn: 'root'
})
export class AdsService {
  constructor(private apiService: ApiService) {}

  /**
   * Get all ads created by the user from the backend.
   * @param id The user id data.
   * @returns An observable of the submitted form data.
   */
  getCampaignCreatedBy(id: string): Observable<AdsInterface> {
    const endpoint = 'ads/createdBy'; // Endpoint relative to baseUrl

    let params = new HttpParams();
    params = params.append('id', id);

    return this.apiService.get<AdsInterface>(endpoint, params);
  }


  /**
   * Get all ads created by the user from the backend.
   * @param id The user id data.
   * @returns An observable of the submitted form data.
   */
  getCampaignById(id: string): Observable<AdsInterface> {
    const endpoint = 'ads'; // Endpoint relative to baseUrl

    let params = new HttpParams();
    params = params.append('id', id);

    return this.apiService.get<AdsInterface>(endpoint, params);
  }


  /**
   * Get all ads created by the user from the backend.
   * @param id The user id data.
   * @returns An observable of the submitted form data.
   */
  deleteAd(id: string): Observable<AdsInterface> {
    const endpoint = 'ads'; // Endpoint relative to baseUrl

    let params = new HttpParams();
    params = params.append('id', id);

    return this.apiService.delete<AdsInterface>(endpoint, params);
  }
   
}