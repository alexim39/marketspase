import { Injectable } from '@angular/core';
import { ApiService } from '../../../_common/services/api.service';
import { Observable } from 'rxjs';

export interface NotificationInterface {
  state: boolean; partnerId: string; 
}


@Injectable()
export class SettingsService {
  constructor(private apiService: ApiService) {}
  

  /**
   * Submits the notification form data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
  toggleNotification(formObject: NotificationInterface): Observable<any> {
    return this.apiService.post<any>('settings/notification', formObject);
  }

  /**
   * Submits the theme form data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
  toggleTheme(formObject: NotificationInterface): Observable<any> {
    return this.apiService.post<any>('settings/theme', formObject);
  }
    
  /**
   * Get the theme data to the backend.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
  getUserTheme(partnerId: string): Observable<any> {
    return this.apiService.get<any>(`settings/theme/${partnerId}`);
  }
    
}