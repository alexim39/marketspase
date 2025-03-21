import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { ApiService } from '../../../_common/services/api.service';

export interface CreateAdsInterface {
  targetAudience: any;
  marketingObjectives: any;
  budget: any;
  adDuration: any;
  adFormat: any;
}
  

@Injectable()
export class CreateCampaignService {

  constructor(private apiService: ApiService) {}

  /**
   * Submits the facebook ads form data to the backend.
   * @param campaignData The form data.
   * @returns An observable of the submitted form data.
   */
  facebook(campaignData: CreateAdsInterface): Observable<any> {
    return this.apiService.post<CreateAdsInterface>('ads/facebook', campaignData);
  }
  
  /**
   * Submits the google ads form data to the backend.
   * @param campaignData The form data.
   * @returns An observable of the submitted form data.
   */
  google(campaignData: CreateAdsInterface): Observable<any> {
    return this.apiService.post<CreateAdsInterface>('ads/google', campaignData);
  }

  /**
   * Submits the youtube ads form data to the backend.
   * @param campaignData The form data.
   * @returns An observable of the submitted form data.
   */
  youtube(campaignData: CreateAdsInterface): Observable<any> {
    return this.apiService.post<CreateAdsInterface>('ads/youtube', campaignData);
  }

  /**
   * Submits the linkedin ads form data to the backend.
   * @param campaignData The form data.
   * @returns An observable of the submitted form data.
   */
  linkedin(campaignData: CreateAdsInterface): Observable<any> {
    return this.apiService.post<CreateAdsInterface>('ads/linkedin', campaignData);
  }

  /**
   * Submits the tiktok ads form data to the backend.
   * @param campaignData The form data.
   * @returns An observable of the submitted form data.
   */
  tiktok(campaignData: CreateAdsInterface): Observable<any> {
    return this.apiService.post<CreateAdsInterface>('ads/tiktok', campaignData);
  }

   
}