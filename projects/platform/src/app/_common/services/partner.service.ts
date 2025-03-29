import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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