import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../_common/services/api.service';

export interface ProfileInterface {
  id: string;
}

@Injectable()
export class SocialMediaSettingsService {
  constructor(private apiService: ApiService) {}

  /**
   * Submits the formObject data to the backend.
   * @param endpoint The API endpoint.
   * @param formObject The form data.
   * @returns An observable of the submitted form data.
   */
  private updateSocialMediaLink(
    endpoint: string,
    formObject: { url: string; partnerId: string }
  ): Observable<ProfileInterface> {
     //console.log('form record', formObject);
    return this.apiService.put<any>(`partners/${endpoint}`, formObject);
  }

  whatsappGroupLinkUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('whatsappgrouplink', formObject);
  }

  whatsappChatPageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('whatsappchatlink', formObject);
  }

  facebookPageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('facebookPage', formObject);
  }

  linkedinPageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('linkedinPage', formObject);
  }

  youtubePageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('youtubePage', formObject);
  }

  instagramPageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('instagramPage', formObject);
  }

  tiktokPageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('tiktokPage', formObject);
  }

  twitterPageUpdate(formObject: {
    url: string;
    partnerId: string;
  }): Observable<ProfileInterface> {
    return this.updateSocialMediaLink('twitterPage', formObject);
  }
}