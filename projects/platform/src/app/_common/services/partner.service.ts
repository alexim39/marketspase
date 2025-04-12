import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { ApiService } from './api.service';

export interface PartnerInterface {
  _id: string;
  status: boolean;
  name: string;
  surname: string;
  email: string;
  reservationCode: string;
  phone: string;
  password: string;
  username: string;
  bio?: string;
  address: string;
  dobDatePicker?: Date;
  balance?: number;
  role?: string;
  profileImage?: string;
  jobTitle?: string;
  educationBackground?: string;
  hobby?: string;
  skill?: string;
  createdAt?: Date;
  notification: boolean;
  darkMode: boolean;
  incomeTarget: {
    targetAmount: number;
    period: string;
  },
  socialMedia: {
    whatsappGroupLink: string;  
    whatsappChatLink: string;
    facebookPage: string;
    linkedinPage: string;
    youtubePage: string;
    instagramPage: string;
    tiktokPage: string;
    twitterPage: string;
  },
  testimonial?: {
    message: string;
    country: string;
    state: string;
  },
  savedAccounts?: Array<{
    _id: string;   
    bank: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
  }>
}

@Injectable()
export class PartnerService {
  constructor(private apiService: ApiService) {}


  /**
   * Get partner data to the backend API.
   * @returns An Observable that emits the API response or an error.
   */
  getPartner(): Observable<any> {
    return this.apiService.get<PartnerInterface>(`auth`, undefined, undefined, true);
  }

  private partnerSubject = new BehaviorSubject<PartnerInterface | null>(null);

  getSharedPartnerData$ = this.partnerSubject.asObservable();

  updatePartnerService(data: PartnerInterface) {
    this.partnerSubject.next(data);
  }
}