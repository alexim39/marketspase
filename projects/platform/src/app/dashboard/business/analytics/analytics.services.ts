import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../_common/services/api.service';

export interface AnalyticsInterface {
  totalCampaigns: number;
  activeCampaigns: number;
  totalLeads: number;
  totalPartners: number;
  activePartners: number;
  totalRevenue: number;
  planDistribution: Array<{ _id: string; count: number }>;
  // Add more fields as needed
  // For example, you might want to include the number of active campaigns, total leads, etc.
}


@Injectable()
export class AnalyticsService {
 constructor(private apiService: ApiService) {}
   

  /**
 * Get the form data to the backend.
 * @param formObject The form data.
 * @returns An observable of the submitted form data.
 */
  getBusinessAnalytics(partnerId: string): Observable<any> {
    return this.apiService.get<any>(`analytics/${partnerId}`);
  }

}
