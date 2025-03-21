import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../_common/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private apiService: ApiService) {}


  /**
   * Retrieves the current balance for a partner by ID.
   * @param id The partner's ID.
   * @returns An observable of the partner's current balance.
   */
  getCurrentBalance(id: string): Observable<number> {
    const endpoint = 'partners/balance'; // Endpoint relative to baseUrl
    let params = new HttpParams();
    params = params.append('id', id);

    return this.apiService.get<{ partner: { balance: number } }>(endpoint, params).pipe(
      map(response => {
        if (response && response.partner && typeof response.partner.balance === 'number') {
          return response.partner.balance;
        } else {
          throw new Error('Balance not found or invalid in response');
        }
      })
    );
  }
}