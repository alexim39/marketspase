// balance.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountBalanceService {
  private balanceUpdatedSource = new Subject<void>();
  balanceUpdated$ = this.balanceUpdatedSource.asObservable();

  notifyBalanceUpdated() {
    this.balanceUpdatedSource.next();
  }
}