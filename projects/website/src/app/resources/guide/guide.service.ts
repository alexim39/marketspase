import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../_common/services/api.service';

export interface DownloadFormData {
  name: string;
  surname: string;
  email: string;
}

@Injectable()
export class GuideDownloadService {
  constructor(private apiService: ApiService) {}

    /**
   * Submits the guide form data to the backend API.
   * @param formObject The guide data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
  submit(formObject: DownloadFormData): Observable<DownloadFormData> {
    return this.apiService.post<any>('/contact/guide-download', formObject);
  }

  
}